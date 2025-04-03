import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useAppDispatch } from './hooks/useTypedRedux';
import { fetchProducts } from './store/slices/productsSlice';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import './App.css';
import { ProtectedRoute } from './components/ProtectedRoutes/ProtectedRoute/ProtectedRoute';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import { AdminLayout } from './Pages/AdminPage/AdminLayout';
import AdminProductsPage from './Pages/AdminPage/AdminProductsPage';

// Ленивая загрузка страниц
const HomePage = lazy(() => import('./Pages/HomePage')
  .then(module => 
    new Promise<{ default: React.ComponentType }>(resolve => 
      setTimeout(() => resolve({ default: module.default }), 1000) // добавляем задержку чтобы увидеть LoadingSpinner
  )
)
);
const ProductPage = lazy(() => import('./Pages/ProductPage'));
const CartPage = lazy(() => import('./Pages/CartPage'));
const AboutPage = lazy(()=> import('./Pages/AboutPage'));
const PolicyPage = lazy(() => import ('./Pages/PolicyPage'))
const ContactsPage = lazy(() => import('./Pages/ContactsPage'));
const TermsPage = lazy(() => import('./Pages/TermsPage'));
const PageNotFound = lazy(()=> import ('./Pages/PageNotFound'));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Публичные пути */}
          <Route path="/" element={<HomePage />} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/policy' element={<PolicyPage />}/>
          <Route path='/contacts' element={<ContactsPage />} />
          <Route path='/terms' element={<TermsPage />}></Route>
          <Route path ="*" element={<PageNotFound />} />
          {/* Приватные пути */}

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Админ роуты */}
           <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="users" element={''} />
            </Route>
          </Route>  
          

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;