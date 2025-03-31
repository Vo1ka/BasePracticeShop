import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from '../../../store/slices/themeSlice';
import { RootState } from "../../../store/store";
import { useEffect } from "react";
import './themeToggle.css'
import { GoSun } from "react-icons/go";
import { FaRegMoon } from "react-icons/fa";

const ThemeToggle = () => {
    const theme = useSelector((state:RootState)=> state.theme.mode);
    const dispatch = useDispatch();
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
      }, [theme]);
    const handleToggle =() =>{
        dispatch(toggleTheme());
    }
    return(
        <div className="theme-toggle">
            { theme === 'light' ? <GoSun onClick={handleToggle} />
             :<FaRegMoon onClick={handleToggle}/>}
            
            

        </div>
    )
}

export default ThemeToggle;