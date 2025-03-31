import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ApiError {
  message: string;
  statusCode?: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null
};

const fakeAuthAPI = async (credentials: { email: string; password: string }) => {
  return new Promise<{ user: User; token: string }>((resolve, reject) => {
    setTimeout(() => {
      if (credentials.password.length >= 6) {
        resolve({
          user: {
            id: '1',
            name: 'Тестовый Пользователь',
            email: credentials.email
          },
          token: 'fake-jwt-token'
        });
      } else {
        reject({ message: 'Пароль должен содержать минимум 6 символов', statusCode: 400 } as ApiError);
      }
    }, 1000);
  });
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await fakeAuthAPI(credentials);
    } catch (error) {
      return rejectWithValue((error as ApiError).message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;