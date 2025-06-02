import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils/types';
import { fetchIngredients } from '@utils/api/ingredients';

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
