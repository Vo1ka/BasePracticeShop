import { useState } from 'react';
import './authModal.css';
import { useAppDispatch } from '../../../hooks/useTypedRedux';
import { login } from '../../../store/slices/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface AuthModalProps{
    onClose: ()=>void;

}

const AuthModal = ( {onClose}:AuthModalProps)=>{

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useAppDispatch();
    const theme = useSelector((state:RootState) => state.theme.mode);
    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault();
        dispatch(login({email, password}))
        .unwrap()
        .then(()=>onClose());
    }

    return(
    <div className="modal-overlay">
      <div className={`auth-modal ${theme === 'dark' ? 'dark-modal' : ''}`}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Вход в аккаунт</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            required
          />
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
    )

}


export default AuthModal;