import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { feedWsActions } from '../actions/feed';
import { TOrder } from '@utils/types';

type TFeedState = {
	orders: TOrder[];
	total: number;
	totalToday: number;
	wsConnected: boolean;
	loading: boolean;
	error: string | null;
};

const initialState: TFeedState = {
	orders: [],
	total: 0,
	totalToday: 0,
	wsConnected: false,
	loading: false,
	error: null as string | null,
};

export const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(feedWsActions.onConnecting, (state) => {
				state.wsConnected = false;
				state.loading = true;
			})
			.addCase(feedWsActions.onOpen, (state) => {
				state.wsConnected = true;
				state.error = null;
				state.loading = true;
			})
			.addCase(feedWsActions.onClose, (state) => {
				state.wsConnected = false;
				state.loading = false;
			})
			.addCase(feedWsActions.onError, (state) => {
				state.error = 'WebSocket error';
				state.loading = false;
			})
			.addCase(
				feedWsActions.onMessage,
				(
					state,
					action: PayloadAction<{
						orders: TOrder[];
						total: number;
						totalToday: number;
					}>
				) => {
					state.orders = action.payload.orders;
					state.total = action.payload.total;
					state.totalToday = action.payload.totalToday;
					state.loading = false;
				}
			);
	},
});

export default feedSlice.reducer;
