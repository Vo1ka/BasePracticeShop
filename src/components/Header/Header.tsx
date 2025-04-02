import CartDropdown from "./CartDropdown/CartDropdown";
import SearchInput from "./SearchInput/SearchInput"
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import './header.css'
import { FaUserCircle } from 'react-icons/fa';
import {logout} from './../../store/slices/authSlice'
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./../../hooks/useTypedRedux";
import AuthModal from "./Modal/AuthModal";
import { Link } from "react-router-dom";

type HeaderProps = {
    
    onSearchChange?: (query: string) => void;
    showSearch?: boolean;
  };

const Header = ({onSearchChange, showSearch = true}:HeaderProps) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
    const {user} = useAppSelector((state)=>state.auth);
    const dispatch = useAppDispatch();
    const handleAuthClick = () => {
        if (user) {
          dispatch(logout());
        } else {
          setIsAuthModalOpen(true);
        }
      };
    return (
        <header>
            <Link to="/" className="logo">Магазин</Link>
            {showSearch && (<SearchInput onSearchChange={onSearchChange}/>)}
            
            <ThemeToggle />
            <Link to="/cart">
                <CartDropdown />
            </Link>
            <div className="auth-section">
                <button onClick={handleAuthClick} className="auth-button">
                    <FaUserCircle size={24} />
                    {user && <span className="auth-username">{user.name}</span>}
                </button>
                {isAuthModalOpen && (
                <AuthModal onClose={() => setIsAuthModalOpen(false)} />
                )}
            </div>

        </header>
    )
}

export default Header;