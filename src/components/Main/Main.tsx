import { useState, useEffect, useMemo } from 'react';
import { ProductList } from './ProductList/ProductList';
import { Pagination } from './Pagination/Pagination';
import { useDispatch } from 'react-redux';
import './main.css';
import { AppDispatch } from '../../store/store';
import { setProducts } from '../../store/slices/productsSlice';

interface MainProps{
    searchQuery: string;
}



export const Main = ({searchQuery}:MainProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    
    const mockProducts = Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        title: `Товар ${i + 1}`,
        price: Math.floor(Math.random() * 5000) + 500,
        image: `https://source.unsplash.com/random/300x300/?product,shopping,${i}`
      }));
      // Загрузка товаров
      useEffect(() => {
        dispatch(setProducts(mockProducts));
      }, [dispatch, mockProducts]);

        //Фильтрация
        const filteredProducts = useMemo(() => {
            if (!searchQuery.trim()) return mockProducts; // Если ввода не было - просто возвращаем список товаров
            return mockProducts.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) //если был ввод - фильтруем значение
                //по названию товаров
            );
        }, [mockProducts, searchQuery]);

        const totalPages = Math.ceil(filteredProducts.length / productsPerPage); // = 3 страницы (24/8)
        const paginatedProducts = useMemo(() => {
            const startIndex = (currentPage - 1) * productsPerPage;
            return filteredProducts.slice(startIndex, startIndex + productsPerPage);
        }, [filteredProducts, currentPage, productsPerPage]);

        useEffect(() => {
            setCurrentPage(1);
        }, [searchQuery]);

        return(
        <main className="main-content">
            <ProductList products={paginatedProducts} />
            
            {totalPages > 1 && (
                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                />
            )}

        </main>
      )
}