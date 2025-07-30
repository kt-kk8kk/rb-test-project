import { describe, it, expect } from 'vitest';
import reducer from './feed-slice';
import { feedWsActions } from '../actions/feed';
import type { TOrder } from '@utils/types';

describe('feedSlice basic reducer', () => {
	const initial = reducer(undefined, { type: 'UNKNOWN' });
	const sampleOrders: TOrder[] = [
		{
			_id: 'o1',
			number: 1,
			status: 'done',
			ingredients: [],
			createdAt: '',
			updatedAt: '',
			name: 'A',
		},
	];

	it('returns initial state for unknown action', () => {
		expect(reducer(undefined, { type: 'UNKNOWN' })).toEqual(initial);
	});

	it('onOpen clears error and sets wsConnected=true, loading=true', () => {
		const prev = { ...initial, error: 'err', loading: false };
		const next = reducer(prev, feedWsActions.onOpen());
		expect(next.wsConnected).toBe(true);
		expect(next.loading).toBe(true);
		expect(next.error).toBeNull();
	});

	it('onError sets error and stops loading', () => {
		const prev = { ...initial, loading: true, wsConnected: true };
		const next = reducer(prev, feedWsActions.onError('any'));
		expect(next.error).toBe('WebSocket error');
		expect(next.loading).toBe(false);
		expect(next.wsConnected).toBe(true);
	});

	it('onMessage updates orders, total, totalToday and stops loading', () => {
		const payload = {
			success: true,
			orders: sampleOrders,
			total: 5,
			totalToday: 3,
		};
		const prev = { ...initial, loading: true };
		const next = reducer(prev, feedWsActions.onMessage(payload));
		expect(next.orders).toEqual(payload.orders);
		expect(next.total).toBe(5);
		expect(next.totalToday).toBe(3);
		expect(next.loading).toBe(false);
	});
});
