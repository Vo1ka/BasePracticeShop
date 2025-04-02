import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import { RootState } from "../store/store";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import { updateQuantity, removeFromCart } from "../store/slices/cartSlice";
import './.././/components/Header/CartDropdown/cartDropdown.css';

export const CartPage = () => {

    const cartItems = useSelector((state: RootState) => state.cart.items);
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
  return (
    <>
      <Header showSearch={false}/>
      <main>
        {cartItems.length === 0 ? <h2 className="empty-cart">Корзина пуста</h2> :
        (
          <>
            <ul className='cart-items'>
              {cartItems.map((item)=>(
                <li
                  key={item.id}
                  className={`cart-item`}
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
        )}
      </main>
    </>
  );
};