import ListProducts from './components/ListProducts';
import Footer from './components/Footer';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import SharedDataContext from './shared/SharedDataContext';
import { SetStateAction, useState } from 'react';

function App() {
  const [sharedData, setSharedData] = useState('');

  const updateSharedData = (data: SetStateAction<string>) => {
    setSharedData(data);
  };

  return (
    <>
      <SharedDataContext.Provider value={{ sharedData, updateSharedData }}>
        <div className='container'>
          <BrowserRouter>
            <Link to='/'></Link>
            <Link to='/addProduct'></Link>
            <Routes>
              <Route path='/' element={<ListProducts />} />
              <Route path='/addProduct' element={<AddProduct />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      </SharedDataContext.Provider>
    </>
  );
}

export default App;
