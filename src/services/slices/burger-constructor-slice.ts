import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils/types';
import { v4 as uuidv4 } from 'uuid';

type TBurgerConstructorState = {
	bun: TIngredient | null;
	ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
	bun: null,
	ingredients: [],
};

export const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngredient: {
			reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
				if (action.payload.type === 'bun') {
					state.bun = action.payload;
				} else {
					state.ingredients.push(action.payload);
				}
			},
			prepare: (ingredient: TIngredient) => {
				return {
					payload: {
						...ingredient,
						uuid: uuidv4(),
					},
				};
			},
		},
		removeIngredient: (state, action: PayloadAction<string>) => {
			state.ingredients = state.ingredients.filter(
				(ingredient) => ingredient.uuid !== action.payload
			);
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
