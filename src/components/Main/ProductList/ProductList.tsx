import { useSelector } from 'react-redux';
import { RootState } from './../../../store/store';
import { ProductCard } from '../ProductCard/ProductCard';
import './productList.css';
import { Product } from '../../../types/type';

interface ProductListProps {
    products: Product[];
  }

export const ProductList = ({ products }: ProductListProps) =>{
    const theme = useSelector((state: RootState) => state.theme.mode);

    return (
        <div className={`product-list ${theme}`}>
            {products.map((product)=> (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}