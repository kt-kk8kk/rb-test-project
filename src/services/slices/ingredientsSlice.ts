import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils/types';
import { API_URL } from '@utils/constants';

type TIngredientsState = {
	items: TIngredient[];
	loading: boolean;
	error: string | null;
};

const initialState: TIngredientsState = {
	items: [],
	loading: false,
	error: null,
};

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async (_, thunkAPI) => {
		const res = await fetch(`${API_URL}/ingredients`);
		const data = await res.json();
		if (!res.ok) {
			return thunkAPI.rejectWithValue(
				data.message || 'Ошибка загрузки ингредиентов'
			);
		}
		return data.data as TIngredient[];
	}
);

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default ingredientsSlice.reducer;
