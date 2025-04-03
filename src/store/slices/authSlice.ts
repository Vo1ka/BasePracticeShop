import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRole, isUserRole } from './../../types/auth';


interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string |  null
}
// Проверка при загрузке из localStorage

const loadInitialUser = (): User | null => {
  const userJson = localStorage.getItem('authUser');
  if (!userJson) return null;
  
  try {
    const user = JSON.parse(userJson);
    return user && user.role && isUserRole(user.role) ? user : null;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: loadInitialUser(),
  isAuthenticated: !!localStorage.getItem('authToken'),
  isLoading: false,
  error: null
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, role = 'user' }: { email: string; password: string, role?: UserRole }, { rejectWithValue }) => {
    try {
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (password.length < 6) {
        throw new Error('Пароль должен содержать минимум 6 символов');
      }
      return {
        user: {
          id: Date.now().toString(),
          name: email.split('@')[0],
          email,
          role 
        },
        token: 'fake-token'
      };
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Auth error');
    }
  }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ 
      email: string; 
      password: string;
      role?: UserRole; // Для прямого входа с ролью
    }>) => {
      const { email, password, role = 'user' } = action.payload;
      
      if (password.length < 6) {
        state.error = 'Пароль должен содержать минимум 6 символов';
        return;
      }

      const user: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role // Сохраняем роль
      };

      state.user = user;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('authToken', 'fake-token');
      localStorage.setItem('authUser', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      if (state.user) {
        state.user = action.payload;
        localStorage.setItem('authUser', JSON.stringify(action.payload));
      }
    },
    promoteToAdmin: (state) => {
      if (state.user) {
        state.user.role = 'admin';
        localStorage.setItem('authUser', JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) =>{
    builder
    .addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('authUser', JSON.stringify(action.payload.user));
    })
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginUser.rejected, (state, action) =>{
      state.error = action.payload as string;
    })
  }
});

export const { login, logout,clearError, promoteToAdmin, updateUser } = authSlice.actions;
export default authSlice.reducer;