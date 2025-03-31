import './productcard.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './../../../store/slices/cartSlice';
import { Product } from '../../../types/type';
import { RootState } from '../../../store/store';


export const ProductCard = ({product}:{product: Product}) =>{
    const theme = useSelector((state:RootState)=>state.theme.mode);
    const dispatch = useDispatch();
    return(
        <div className="product-card">
            <div className={`product-image-container ${theme === 'dark' ? 'dark' : ''}`}>
            <img src={product.image} alt={product.title} className='product-name'/>
            <div className={`product-info ${theme === 'dark' ? 'dark' : ''}`}>
                <h3 className='product-title'>{product.title}</h3>
                <p className='product-price'>{product.price} р</p>
                <button 
                className='add-to-cart-button'
                onClick={() => dispatch(addToCart({...product, quantity: 1}))}
                >В корзину</button>
            </div>
            
            </div>
        </div>
    )
}

