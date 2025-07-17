import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { historyWsActions } from '../actions/history';
import type { TOrder } from '@utils/types';

interface THistoryState {
	orders: TOrder[];
	total: number;
	totalToday: number;
	loading: boolean;
	wsConnected: boolean;
	error: string | null;
}

const initialState: THistoryState = {
	orders: [],
	total: 0,
	totalToday: 0,
	loading: false,
	wsConnected: false,
	error: null,
};

export const historySlice = createSlice({
	name: 'history',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(historyWsActions.onConnecting, (state) => {
				state.loading = true;
				state.wsConnected = false;
			})
			.addCase(historyWsActions.onOpen, (state) => {
				state.loading = false;
				state.wsConnected = true;
				state.error = null;
			})
			.addCase(historyWsActions.onClose, (state) => {
				state.wsConnected = false;
			})
			.addCase(historyWsActions.onError, (state) => {
				state.loading = false;
				state.error = 'WebSocket error';
			})
			.addCase(
				historyWsActions.onMessage,
				(
					state,
					action: PayloadAction<{
						orders: TOrder[];
						total: number;
						totalToday: number;
					}>
				) => {
					state.loading = false;
					state.orders = action.payload.orders;
					state.total = action.payload.total;
					state.totalToday = action.payload.totalToday;
				}
			);
	},
});

export default historySlice.reducer;
