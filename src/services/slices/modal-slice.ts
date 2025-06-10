import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TModalType = 'order' | null;

type TModalState = {
	openModalType: TModalType;
};

const initialState: TModalState = {
	openModalType: null,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<TModalType>) => {
			state.openModalType = action.payload;
		},
		closeModal: (state) => {
			state.openModalType = null;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
