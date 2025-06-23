import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forgotPassword as forgotPasswordApi } from '@utils/api/forgot-password';
import { resetPassword as resetPasswordApi } from '@utils/api/reset-password';

interface ForgotPasswordState {
	isLoading: boolean;
	error: string | null;
	success: boolean;
}

const initialState: ForgotPasswordState = {
	isLoading: false,
	error: null,
	success: false,
};

export const forgotPassword = createAsyncThunk(
	'forgotPassword/send',
	async (email: string, { rejectWithValue }) => {
		try {
			const response = await forgotPasswordApi({ email });
			return response.success;
		} catch (error: unknown) {
			let message = 'Ошибка восстановления пароля';
			if (error instanceof Error) {
				message = error.message;
			}

			return rejectWithValue(message);
		}
	}
);

export const resetPassword = createAsyncThunk(
	'forgotPassword/resetPassword',
	async (data: { password: string; token: string }, { rejectWithValue }) => {
		try {
			const response = await resetPasswordApi(data);
			return response;
		} catch (error: unknown) {
			let message = 'Ошибка сброса пароля';

			if (error instanceof Error) {
				message = error.message;
			}

			return rejectWithValue(message);
		}
	}
);

const forgotPasswordSlice = createSlice({
	name: 'forgotPassword',
	initialState,
	reducers: {
		resetForgotPasswordState(state) {
			state.error = null;
			state.success = false;
			state.isLoading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(forgotPassword.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(forgotPassword.fulfilled, (state) => {
				state.isLoading = false;
				state.success = true;
			})
			.addCase(forgotPassword.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(resetPassword.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(resetPassword.fulfilled, (state) => {
				state.isLoading = false;
				state.success = true;
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { resetForgotPasswordState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
