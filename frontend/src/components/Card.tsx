import { Product } from '../types/product-type';
import SharedSelectionsContext from '../shared/SharedSelectionsContext';
import { useContext } from 'react';

const Card = (product: Product | any) => {
  const { updateSharedSelectionsContext } = useContext(SharedSelectionsContext);

  return (
    <>
      <div className='card-inside'>
        <div className='form-check'>
          <input
            className='form-check-input delete-checkbox'
            type='checkbox'
            value={product.sku}
            onClick={(e) => {
              updateSharedSelectionsContext(
                product.sku,
                (e.target as HTMLInputElement).checked
              );
            }}
          />
        </div>
        <div className='card-details'>
          <p className='card-text'>{product.sku}</p>
          <p className='card-text'>{product.name}</p>
          <p className='card-text'>{product.price.toFixed(2)} $</p>
          {product.productType === 'DVD' ? (
            <p className='card-text'>Size: {product.features}</p>
          ) : (
            ''
          )}
          {product.productType === 'Furniture' ? (
            <p className='card-text'>Dimensions: {product.features}</p>
          ) : (
            ''
          )}
          {product.productType === 'Book' ? (
            <p className='card-text'>Weight: {product.features}</p>
          ) : (
            ''
          )}
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Card;
