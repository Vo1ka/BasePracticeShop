import { useState, useEffect, useCallback, useMemo } from 'react';
import { ProductList } from './ProductList/ProductList';
import { Pagination } from './Pagination/Pagination';
import './main.css';
import { useGetPaginatedProductsQuery, useGetProductsQuery } from '../../store/slices/apiSlice';
import { useDebounce } from '../../hooks/useDebounce';

interface MainProps{
    searchQuery: string;
}

export const Main = ({searchQuery}:MainProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    
    const debouncedSearch = useDebounce(searchQuery, 500);
    // Для пагинации
    const { data: paginatedResponse, isLoading: isPaginationLoading } = useGetPaginatedProductsQuery(
        { page: currentPage, limit: productsPerPage },
        { skip: !!searchQuery.trim() } // Пропускаем при поиске
    );
    
    // Для поиска - получаем все товары один раз
    const { data: allProducts = [], isLoading: isAllLoading } = useGetProductsQuery(undefined, {
        skip: !debouncedSearch.trim() // Загружаем только при поиске
    });
    
    // Определяем какие данные использовать
    const { productsToShow, totalItems } = useMemo(() => {
        if (searchQuery.trim()) {
            const filtered = allProducts.filter(product => 
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return {
                productsToShow: filtered.slice(
                    (currentPage - 1) * productsPerPage, 
                    currentPage * productsPerPage
                ),
                totalItems: filtered.length
            };
        } else {
            return {
                productsToShow: paginatedResponse?.products || [],
                totalItems: paginatedResponse?.total || 0
            };
        }
    }, [searchQuery, allProducts, currentPage, productsPerPage, paginatedResponse]);
    
    const totalPages = Math.ceil(totalItems / productsPerPage);
    const isLoading = searchQuery.trim() ? isAllLoading : isPaginationLoading;
    
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
                status={isLoading ? 'loading' : 'success'} 
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