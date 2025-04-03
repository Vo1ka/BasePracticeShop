import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import './../components/Main/ProductCard/productcard.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addToCart } from '../store/slices/cartSlice';
import Footer from '../components/Footer/Footer';

const ProductPage = () => {
  const theme = useSelector((state:RootState)=>state.theme.mode);

  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector((state: RootState) => 
    state.products.items.find(item => item.id === Number(id))
  );
  if (!product) return <div>Товар не найден</div>;
  return (
    <>
      <Header showSearch={false}/>
      <div className="product-card">
            <div className={`product-image-container ${theme === 'dark' ? 'dark' : ''}`}>
                <img src={product.thumbnail} alt={product.title} className='product-name'/>
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
      <Footer></Footer>
    </>
  );
};

export default ProductPage;