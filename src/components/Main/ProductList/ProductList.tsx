import { useSelector } from 'react-redux';
import { RootState } from './../../../store/store';
import { ProductCard } from '../ProductCard/ProductCard';
import './productlist.css';
import { Product } from '../../../types/type';

interface ProductListProps {
    products: Product[]; // Передаём уже отфильтрованные и пагинированные товары
    status: "loading" | "error" | "success";
    error: string | undefined | null;
}


export const ProductList = ({products, status, error} : ProductListProps ) =>{
    const theme = useSelector((state: RootState) => state.theme.mode);
    
    if (status === 'loading') return <div className="loading">Загрузка...</div>;
    if (status === 'error') return <div className="error">Ошибка: {error}</div>;
    if (products.length === 0) return <div>Товары не найдены</div>;

    return (
        <div className={`product-list ${theme}`}>
            {products.map((item)=> (
                <ProductCard key={item.id} product={item} />
            ))}
        </div>
    )
}