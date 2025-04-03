import { Link } from "react-router-dom"
import './footer.css'

const Footer = () => {
    return (
        <footer>
            <ul>
                <li>© 2025 BasePractice, Shop.</li>
                <li><Link to={'/about'}>О нас</Link></li>
                <li><Link to={'/policy'}>Политика конфиденциальности</Link></li>
                <li><Link to={'/contacts'}>Контакты</Link></li>
                <li><Link to={'/terms'}>Правила</Link></li>        
            </ul>
        </footer>
    )
}

export default Footer;