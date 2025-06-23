import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { registerUser } from '@utils/api/register-user';
import { loginUser } from '@utils/api/login-user';
import { logoutUser } from '@utils/api/logout-user';
import { getUser as getUserApi, updateUser } from '@utils/api/user';
import { RootState } from '@services/store';

interface TUser {
	email: string;
	name: string;
}

interface TRegisterRequest {
	email: string;
	password: string;
	name: string;
}

interface TLoginRequest {
	email: string;
	password: string;
}

interface TUserState {
	user: TUser | null;
	accessToken: string | null;
	refreshToken: string | null;
	isLoading: boolean;
	error: string | null;
	isAuthChecked: boolean;
	canResetPassword: boolean;
}

const initialState: TUserState = {
	user: null,
	accessToken: localStorage.getItem('accessToken'),
	refreshToken: localStorage.getItem('refreshToken'),
	isLoading: false,
	error: null,
	isAuthChecked: false,
	canResetPassword: false,
};

export const register = createAsyncThunk(
	'user/register',
	async (data: TRegisterRequest, { rejectWithValue }) => {
		try {
			const response = await registerUser(data);
			localStorage.setItem(
				'accessToken',
				response.accessToken.replace('Bearer ', '')
			);
			localStorage.setItem('refreshToken', response.refreshToken);
			return response;
		} catch (error: unknown) {
			let message = 'Ошибка регистрации';
			if (error instanceof Error) {
				message = error.message;
			}
			return rejectWithValue(message);
		}
	}
);

export const login = createAsyncThunk(
	'user/login',
	async (data: TLoginRequest, { rejectWithValue }) => {
		try {
			const response = await loginUser(data);
			localStorage.setItem(
				'accessToken',
				response.accessToken.replace('Bearer ', '')
			);
			localStorage.setItem('refreshToken', response.refreshToken);
			return response;
		} catch (error: unknown) {
			let message = 'Ошибка входа';
			if (error instanceof Error) {
				message = error.message;
			}
			return rejectWithValue(message);
		}
	}
);

export const logout = createAsyncThunk(
	'user/logout',
	async (_, { getState, rejectWithValue }) => {
		try {
			const state = getState() as RootState;
			const refreshToken = state.user.refreshToken;
			if (!refreshToken) throw new Error('No refreshToken found');
			const response = await logoutUser(refreshToken);
			return response;
		} catch (error: unknown) {
			let message = 'Ошибка выхода';
			if (error instanceof Error) {
				message = error.message;
			}
			return rejectWithValue(message);
		}
	}
);

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (_, { rejectWithValue }) => {
		try {
			const response = await getUserApi();
			return response;
		} catch (error: unknown) {
			let message = 'Ошибка получения данных пользователя';
			if (error instanceof Error) {
				message = error.message;
			}
			return rejectWithValue(message);
		}
	}
);

export const patchUser = createAsyncThunk(
	'user/patchUser',
	async (
		data: { email?: string; name?: string; password?: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await updateUser(data);
			return response;
		} catch (error: unknown) {
			let message = 'Ошибка обновления данных пользователя';
			if (error instanceof Error) {
				message = error.message;
			}
			return rejectWithValue(message);
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutLocal(state) {
			state.user = null;
			state.accessToken = null;
			state.refreshToken = null;
			state.error = null;
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		},
		setUser: (
			state,
			action: PayloadAction<{ name: string; email: string }>
		) => {
			state.user = action.payload;
		},
		setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
			state.isAuthChecked = action.payload;
		},
		setCanResetPassword: (state, action: PayloadAction<boolean>) => {
			state.canResetPassword = action.payload;
		},
		resetError(state) {
			state.error = null;
		},
	},
	selectors: {
		getIsAuthChecked: (state) => state.isAuthChecked,
		getUser: (state) => state.user,
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(
				register.fulfilled,
				(
					state,
					action: PayloadAction<{
						user: TUser;
						accessToken: string;
						refreshToken: string;
					}>
				) => {
					state.isLoading = false;
					state.user = action.payload.user;
					state.accessToken = action.payload.accessToken;
					state.refreshToken = action.payload.refreshToken;
				}
			)
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(
				login.fulfilled,
				(
					state,
					action: PayloadAction<{
						user: TUser;
						accessToken: string;
						refreshToken: string;
					}>
				) => {
					state.isLoading = false;
					state.user = action.payload.user;
					state.accessToken = action.payload.accessToken;
					state.refreshToken = action.payload.refreshToken;
				}
			)
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(logout.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
				state.accessToken = null;
				state.refreshToken = null;
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(fetchUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(
				fetchUser.fulfilled,
				(
					state,
					action: PayloadAction<{ success: boolean; user: TUser }>
				) => {
					state.isLoading = false;
					state.user = action.payload.user;
					state.isAuthChecked = true;
				}
			)
			.addCase(fetchUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
				state.isAuthChecked = true;
			})
			.addCase(patchUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(
				patchUser.fulfilled,
				(
					state,
					action: PayloadAction<{ success: boolean; user: TUser }>
				) => {
					state.isLoading = false;
					state.user = action.payload.user;
				}
			)
			.addCase(patchUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const {
	logoutLocal,
	setUser,
	setIsAuthChecked,
	setCanResetPassword,
	resetError,
} = userSlice.actions;
export default userSlice.reducer;
export const getIsAuthChecked = (state: { user: TUserState }) =>
	state.user.isAuthChecked;
export const getUser = (state: { user: TUserState }) => state.user.user;

export const getCanResetPassword = (state: RootState) =>
	state.user.canResetPassword;
