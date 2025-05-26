import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils/types';

type TBurgerConstructorState = {
	bun: TIngredient | null;
	ingredients: TIngredient[];
};

const initialState: TBurgerConstructorState = {
	bun: null,
	ingredients: [],
};

export const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngredient: (state, action: PayloadAction<TIngredient>) => {
			if (action.payload.type === 'bun') {
				state.bun = action.payload;
			} else {
				state.ingredients.push(action.payload);
			}
		},
		removeIngredient: (state, action: PayloadAction<number>) => {
			state.ingredients.splice(action.payload, 1);
		},
		moveIngredient: (
			state,
			action: PayloadAction<{ fromIndex: number; toIndex: number }>
		) => {
			const { fromIndex, toIndex } = action.payload;
			const [removed] = state.ingredients.splice(fromIndex, 1);
			state.ingredients.splice(toIndex, 0, removed);
		},
		clearConstructor: (state) => {
			state.bun = null;
			state.ingredients = [];
		},
	},
});

export const {
	addIngredient,
	removeIngredient,
	moveIngredient,
	clearConstructor,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
