import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import { RootState } from "../store/store";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import { updateQuantity, removeFromCart } from "../store/slices/cartSlice";
import './pages-css/cartPage.css';
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";

const CartPage = () => {

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const formatPrice = (price: number): string => {
      // Округляем до 2 знаков после запятой и убираем лишние нули
      const formatted = Math.round(price * 100) / 100;
      
      // Форматируем с разделителями тысяч и фиксированным количеством знаков после запятой
      return formatted.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    };

    const addQuantity = (itemId: number, currentQuantity: number) => {
      return (e: React.MouseEvent) => { 
        e.stopPropagation();
        dispatch(updateQuantity({
          id: itemId,
          quantity: currentQuantity + 1
        }));
      };
    };
    
    const removeItem = (itemId: number) => {
      return (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(removeFromCart(itemId));
      };
    };
  return (
    <>
      <Header showSearch={false}/>
      <main className="cart-page">
        {cartItems.length === 0 ?<div className="empty-cart-message">
        <h2>Корзина пуста</h2>
        <Link to="/" className="continue-shopping-button">
          Продолжить покупки
        </Link>
      </div> :
        (<div className="cart-content">
          <ul className="cart-items-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-info">
                  <span className="item-title">{item.title}</span>
                  <span className="item-price">
                    {item.quantity} × {item.price} ₽
                  </span>
                </div>
                <div className="item-actions">
                  <button 
                    onClick={addQuantity(item.id, item.quantity)}
                    className="quantity-button"
                    aria-label="Увеличить количество"
                  >
                    <FaRegPlusSquare />
                  </button>
                  <button
                    onClick={removeItem(item.id)}
                    className="remove-button"
                    aria-label="Удалить товар"
                  >
                    <IoTrashBinOutline />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <div className="total-amount">
              Итого: <span> {formatPrice(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0))} ₽</span>
            </div>
            <button className="checkout-button">
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </main>
    <Footer />
    </>
  );
};

export default CartPage;