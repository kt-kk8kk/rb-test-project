import { Middleware, MiddlewareAPI, Dispatch, Action } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';

export type TWsActions<R, S> = {
	connect: {
		match: (action: unknown) => action is Action & { payload: string };
	};
	disconnect: { match: (action: unknown) => action is Action };
	onConnecting?: () => Action;
	onOpen?: () => Action;
	onClose?: () => Action;
	onError: (payload: string) => Action & { payload: string };
	sendMessage?: {
		match: (action: unknown) => action is Action & { payload: S };
	};
	onMessage: (payload: R) => Action & { payload: R };
};

export const socketMiddleware = <R, S>(
	wsActions: TWsActions<R, S>,
	withToken = false
): Middleware<unknown, RootState> => {
	return (store: MiddlewareAPI<Dispatch<Action>, RootState>) => {
		let socket: WebSocket | null = null;

		const {
			connect,
			disconnect,
			onConnecting,
			onOpen,
			onClose,
			onError,
			sendMessage,
			onMessage,
		} = wsActions;

		return (next) => (action: unknown) => {
			const { dispatch, getState } = store;

			if (connect.match(action)) {
				const token = withToken
					? (getState().user.accessToken?.replace('Bearer ', '') ??
						'')
					: '';

				const url = withToken
					? `${action.payload}?token=${token}`
					: action.payload;

				socket = new WebSocket(url);

				if (onConnecting) dispatch(onConnecting());

				socket.onopen = () => {
					if (onOpen) dispatch(onOpen());
				};

				socket.onerror = () => {
					dispatch(onError('WebSocket error'));
				};

				socket.onmessage = (event) => {
					try {
						const data: R = JSON.parse(event.data);
						dispatch(onMessage(data));
					} catch (err) {
						dispatch(onError((err as Error).message));
					}
				};

				socket.onclose = () => {
					if (onClose) dispatch(onClose());
					socket = null;
				};

				return;
			}

			if (disconnect.match(action)) {
				socket?.close();
				socket = null;
				return;
			}

			if (sendMessage?.match(action)) {
				if (!socket) return next(action);
				socket.send(JSON.stringify(action.payload));
				return;
			}

			return next(action);
		};
	};
};
