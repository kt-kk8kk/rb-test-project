import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils/types';

type TModalState = {
	ingredient: TIngredient | null;
};

const initialState: TModalState = {
	ingredient: null,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<TIngredient>) => {
			state.ingredient = action.payload;
		},
		closeModal: (state) => {
			state.ingredient = null;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
