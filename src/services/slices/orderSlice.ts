import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder } from '../../utils/api/createOrder'; // путь к файлу, где положишь createOrder

type TOrderState = {
	orderNumber: number | null;
	loading: boolean;
	error: string | null;
};

const initialState: TOrderState = {
	orderNumber: null,
	loading: false,
	error: null,
};

export const createOrderThunk = createAsyncThunk(
	'order/createOrder',
	async (ingredients: string[], { rejectWithValue }) => {
		try {
			const response = await createOrder(ingredients);
			return response.order.number;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Unknown error occurred');
		}
	}
);

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		clearOrder: (state) => {
			state.orderNumber = null;
			state.error = null;
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrderThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createOrderThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.orderNumber = action.payload;
			})
			.addCase(createOrderThunk.rejected, (state, action) => {
				state.loading = false;
				state.error =
					(action.payload as string) || 'Ошибка создания заказа';
			});
	},
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
