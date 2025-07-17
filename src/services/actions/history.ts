import { createAction } from '@reduxjs/toolkit';
import type { TOrder } from '@utils/types';

export const historyConnect = createAction<string>('history/connect');
export const historyDisconnect = createAction('history/disconnect');
export const historyConnecting = createAction('history/connecting');
export const historyOpen = createAction('history/open');
export const historyClose = createAction('history/close');
export const historyError = createAction<string>('history/error');
export interface IHistoryMessagePayload {
	success: boolean;
	orders: TOrder[];
	total: number;
	totalToday: number;
}
export const historyMessage =
	createAction<IHistoryMessagePayload>('history/message');

export const historyWsActions = {
	connect: historyConnect,
	disconnect: historyDisconnect,
	onConnecting: historyConnecting,
	onOpen: historyOpen,
	onClose: historyClose,
	onError: historyError,
	onMessage: historyMessage,
};
