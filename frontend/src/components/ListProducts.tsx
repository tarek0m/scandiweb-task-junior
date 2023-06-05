import axios from 'axios';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { Product } from '../types/product-type';
import Card from './Card';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import SharedDataContext from '../shared/SharedDataContext';
import SharedSelectionsContext from '../shared/SharedSelectionsContext';
import { ADDRESS } from '../services/api-address';

const ListProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { updateSharedData } = useContext(SharedDataContext);

  const [selectedIds, setSelectedIds] = useState([] as Array<string[]> | any);
  const updateSharedSelectionsContext = (
    data: SetStateAction<Array<string[]>>,
    check: boolean
  ) => {
    if (check) {
      setSelectedIds([...selectedIds, data]);
    } else {
      setSelectedIds(
        selectedIds.filter(
          (selectedIds: SetStateAction<string[][]>) => selectedIds !== data
        )
      );
    }
  };

  function openHiddenTab(url: string) {
    const newTab = window.open(url, '_blank');
      newTab?.blur();

  setTimeout(() => {
    newTab?.close();
  }, 50);
  }

  useEffect(() => {
    axios.get<Product[]>(`${ADDRESS}/public/home`).then((response) => {
      setProducts(response.data);
    });
  }, []);

  const deleteProducts = () => {
    axios
      .delete(`${ADDRESS}/public/home/deleteProducts/${selectedIds}`)
      .then((response) => {
        setProducts(response.data);
        setSelectedIds([]);
      })
      .catch(() => {
        openHiddenTab(`${ADDRESS}/public/home/deleteProducts/${selectedIds}`);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  const handleAdd = () => {
    navigate('/addProduct');
    updateSharedData(products.map((product) => product.sku).toString());
  };

  return (
    <>
      <nav className='nav-container mb-5'>
        <Header title='Product List' />
        <div>
          <button
            type='button'
            className='btn btn-outline-dark m-1'
            onClick={handleAdd}
          >
            ADD
          </button>
          <button
            type='button'
            className='btn btn-outline-dark m-1'
            onClick={deleteProducts}
            id='delete-product-btn'
          >
            MASS DELETE
          </button>
        </div>
      </nav>

      <SharedSelectionsContext.Provider
        value={{ selectedIds, updateSharedSelectionsContext }}
      >
        <div className='card-container'>
          {Array.isArray(products) ? (
            products.map((product) => <Card key={product.sku} {...product} />)
          ) : (
            <h1>There are no products</h1>
          )}
        </div>
      </SharedSelectionsContext.Provider>
    </>
  );
};

export default ListProducts;
