import './cartDropdown.css'
import { FaShoppingCart } from "react-icons/fa";
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';




const CartDropdown = () => {
  const theme = useSelector((state:RootState) => state.theme.mode);
    return(
        <div className="cart-container">
        <button 
        className="cart-button"
        
        aria-label="Корзина"
        >
          <FaShoppingCart style={theme === "light"? {color: 'black'} : {color: 'white'}}/>
          {/* <span style={theme === "light"? {color: 'black'} : {color: 'white'}}></span> */}
        </button>
        {/* Код ниже был перенесен в CartPage.tsx, теперь при нажатии на корзину */}
         {/* Нас переносит на отдельную страницу с корзиной. */}
        {/* { isOpen && (
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
        )} */}
      </div>
    )
}

export default CartDropdown;