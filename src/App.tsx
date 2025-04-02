import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './Pages/HomePage';
import { ProductPage } from './Pages/ProductPage';
import { CartPage } from './Pages/CartPage';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/useTypedRedux';
import { fetchProducts } from './store/slices/productsSlice';

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts()); // Запрос на получение товаров
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
