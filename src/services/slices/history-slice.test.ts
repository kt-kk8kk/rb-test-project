import { describe, it, expect } from 'vitest';
import reducer from './history-slice';
import { historyWsActions } from '../actions/history';
import type { TOrder } from '@utils/types';

describe('historySlice basic reducer', () => {
	const initial = reducer(undefined, { type: 'UNKNOWN' });
	const sampleOrder: TOrder = {
		_id: 'o1',
		number: 100,
		status: 'done',
		ingredients: [],
		createdAt: '',
		updatedAt: '',
		name: 'Test Order',
	};

	it('returns initial state for unknown action', () => {
		expect(reducer(undefined, { type: 'ANY' })).toEqual(initial);
	});

	it('onOpen sets wsConnected=true, clears error, stops loading', () => {
		const prev = { ...initial, loading: true, error: 'err' };
		const next = reducer(prev, historyWsActions.onOpen());
		expect(next.wsConnected).toBe(true);
		expect(next.loading).toBe(false);
		expect(next.error).toBeNull();
	});

	it('onError stops loading and sets error message', () => {
		const prev = { ...initial, loading: true, wsConnected: true };
		const next = reducer(prev, historyWsActions.onError('ignore'));
		expect(next.loading).toBe(false);
		expect(next.error).toBe('WebSocket error');
		expect(next.wsConnected).toBe(true);
	});

	it('onMessage updates orders, total, totalToday and stops loading', () => {
		const payload = {
			success: true,
			orders: [sampleOrder],
			total: 5,
			totalToday: 2,
		};
		const prev = { ...initial, loading: true };
		const next = reducer(prev, historyWsActions.onMessage(payload));
		expect(next.orders).toEqual(payload.orders);
		expect(next.total).toBe(5);
		expect(next.totalToday).toBe(2);
		expect(next.loading).toBe(false);
	});
});
