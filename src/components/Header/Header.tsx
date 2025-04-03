import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedRedux";
import { logout } from "../../store/slices/authSlice";
import SearchInput from "./SearchInput/SearchInput"
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import './header.css'
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import logo from './../../assets/logo.svg'
type HeaderProps = {
    
    onSearchChange?: (query: string) => void;
    showSearch?: boolean;
  };

const Header = ({onSearchChange, showSearch = true}:HeaderProps) => {
    const {user} = useAppSelector((state)=>state.auth);
    const dispatch = useAppDispatch();
    const handleLogout = () => {
      dispatch(logout());
      // Дополнительные действия при выходе (если нужны)
    };
    const theme = useSelector((state:RootState) => state.theme.mode);
    return (
        <header>
            <Link to="/" className="logo">
                <img src={logo} alt="" />
                <p>BasePractice Shop</p>
            </Link>
            {showSearch && (<SearchInput onSearchChange={onSearchChange}/>)}
            
            <ThemeToggle />
            <Link to="/cart">
                <FaShoppingCart style={theme === "light"? {color: 'black'} : {color: 'white'}}/>
            </Link>
            <div className="auth-section">
                  <Link to={'/login'}>
                      <FaUserCircle size={24}/>
                  </Link>
                    {user && <>
                    <span className="auth-username">{user.name}</span>
                    <p onClick={handleLogout} style={{cursor: 'pointer'}}>Выйти</p>
                    </>}
                
            </div>

        </header>
    )
}

export default Header;