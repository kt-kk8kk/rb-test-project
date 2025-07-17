export const API_URL = 'https://norma.nomoreparties.space/api';

export const FEED_WS_URL = 'wss://norma.nomoreparties.space/orders/all';

export const HISTORY_WS_URL = 'wss://norma.nomoreparties.space/orders';

export const ORDER_STATUS_TEXT: Record<'done' | 'pending' | 'created', string> =
	{
		done: 'Выполнен',
		pending: 'Готовится',
		created: 'Создан',
	};
