import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import { feedWsActions } from './actions/feed';
import { historyWsActions } from './actions/history';

const feedMiddleware = socketMiddleware(feedWsActions);
const historyMiddleware = socketMiddleware(historyWsActions, true);

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(feedMiddleware, historyMiddleware),
	devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
