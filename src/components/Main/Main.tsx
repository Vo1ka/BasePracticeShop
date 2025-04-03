import { useState, useEffect, useCallback, useMemo } from 'react';
import { ProductList } from './ProductList/ProductList';
import { Pagination } from './Pagination/Pagination';
import './main.css';
import { useGetProductsQuery } from '../../store/slices/apiSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedRedux';
import selectDisplayProducts from '../../store/slices/selectors/selectors';
import { initializeProducts } from '../../store/slices/productsSlice';

interface MainProps{
    searchQuery: string;
}

export const Main = ({searchQuery}:MainProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const debouncedSearch = useDebounce(searchQuery, 500);
    const dispatch = useAppDispatch();
  
    // 1. Получаем данные с сервера
    const { data: apiResponse, isLoading: isApiLoading } = useGetProductsQuery({
      limit: 180,
      skip: 0
    });
  
    // 2. Инициализируем продукты при загрузке
    useEffect(() => {
      if (apiResponse?.products) {
        dispatch(initializeProducts(apiResponse.products));
      }
    }, [apiResponse, dispatch]);
  
    // 3. Получаем объединенные продукты (основные + изменения из админки)
    const allProducts = useAppSelector(selectDisplayProducts);
  
    // 4. Фильтрация и пагинация
    const { productsToShow, totalItems } = useMemo(() => {
      const filtered = debouncedSearch.trim()
        ? allProducts.filter(product => 
            product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
        : allProducts;
  
      return {
        productsToShow: filtered.slice(
          (currentPage - 1) * productsPerPage,
          currentPage * productsPerPage
        ),
        totalItems: filtered.length
      };
    }, [allProducts, debouncedSearch, currentPage, productsPerPage]);
  
    const totalPages = Math.ceil(totalItems / productsPerPage);
  
    const handlePageChange = useCallback((page: number) => {
      setCurrentPage(page);
    }, []);
  
    useEffect(() => {
      setCurrentPage(1);
    }, [debouncedSearch]);
  

        return(
        <main className="main-content">
            <ProductList 
                products={productsToShow} 
                status={ isApiLoading  ? 'loading' : 'success'} 
                error={null} 
            />
            
            {totalPages > 1 && (
                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                />
            )}

        </main>
      )
}