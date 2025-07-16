import { createAction } from '@reduxjs/toolkit';
import type { TOrder } from '@utils/types';

export const feedConnect = createAction<string>('feed/connect');
export const feedDisconnect = createAction('feed/disconnect');
export const feedConnecting = createAction('feed/connecting');
export const feedOpen = createAction('feed/open');
export const feedClose = createAction('feed/close');
export const feedError = createAction('feed/error');

export interface IFeedMessagePayload {
	success: boolean;
	orders: TOrder[];
	total: number;
	totalToday: number;
}

export const feedMessage = createAction<IFeedMessagePayload>('feed/message');

export const feedWsActions = {
	connect: feedConnect,
	disconnect: feedDisconnect,
	onConnecting: feedConnecting,
	onOpen: feedOpen,
	onClose: feedClose,
	onError: createAction<string>('feed/error'),
	onMessage: feedMessage,
};
