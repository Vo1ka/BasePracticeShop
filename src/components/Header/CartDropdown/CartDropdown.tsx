import './cartDropdown.css'
import { FaShoppingCart } from "react-icons/fa";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { FaRegPlusSquare } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import { removeFromCart, updateQuantity } from '../../../store/slices/cartSlice';



const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const theme = useSelector((state:RootState) => state.theme.mode);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const addQuantity = (itemId: number, currentQuantity: number) =>{
    return (e: React.MouseEvent) => { // Обработчик клика
    e.stopPropagation(); // Предотвращаем всплытие события
    dispatch(updateQuantity({
      id: itemId,
      quantity: currentQuantity + 1
    }));
    }
  }
  const removeItem = (itemId:number) =>{
    return (e:React.MouseEvent) =>{
      e.stopPropagation();
      dispatch(removeFromCart(itemId))
    }
  }

    return(
        <div className="cart-container">
        <button 
        className="cart-button"
        onClick={toggleDropdown}
        aria-label="Корзина"
        >
          <FaShoppingCart style={theme === "light"? {color: 'black'} : {color: 'white'}}/>
          {/* <span style={theme === "light"? {color: 'black'} : {color: 'white'}}></span> */}
        </button>
        { isOpen && (
          <div className={`cart-dropdown ${theme==='dark' ? ".dark" : ''}`}>
            {cartItems.length === 0 ? (
              <p className='empty-cart'>Корзина пуста</p>
            ): (
              <>
              <ul className='cart-items'>
                {cartItems.map((item)=>(
                  <li
                   key={item.id}
                   className={`cart-item ${theme==='dark' ? 'dark': ''}`}
                  >
                    <span>{item.title}</span>
                    <span>
                      {item.quantity} * {item.price} p
                    </span>
                    
                    <FaRegPlusSquare 
                    style={{cursor:'pointer'}} 
                    onClick={addQuantity(item.id, item.quantity)}/>
                    <IoTrashBinOutline style={{cursor:'pointer'}}
                    onClick={removeItem(item.id)}
                    />
                    
                  </li>
                ))}

              </ul>
              <div className='cart-total'>
                Итого: {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}р
              </div>
              </>

            )
            }
            </div>
        )}
      </div>
    )
}

export default CartDropdown;