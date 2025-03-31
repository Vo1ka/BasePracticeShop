import CartDropdown from "./CartDropdown/CartDropdown";
import SearchInput from "./SearchInput/SearchInput"
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import './header.css'
import { FaUserCircle } from 'react-icons/fa';
import {logout} from './../../store/slices/authSlice'
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./../../hooks/useTypedRedux";
import AuthModal from "./Modal/AuthModal";

interface HeaderProps {
    onSearchChange: (query: string) => void;
}

const Header = ({onSearchChange}:HeaderProps) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
    const {user, status} = useAppSelector((state)=>state.auth);
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
            <img src="" alt="Logo" className="logo"/>
            <SearchInput onSearchChange={onSearchChange}/>
            <ThemeToggle />
            <CartDropdown />
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