import { describe, it, expect } from 'vitest';
import reducer, { createOrderThunk, clearOrder } from './order-slice';

const initial = reducer(undefined, { type: 'UNKNOWN_ACTION' });

describe('orderSlice reducer', () => {
	it('should return the initial state for an unknown action', () => {
		const state = reducer(undefined, { type: 'RANDOM_ACTION' });
		expect(state).toEqual(initial);
	});

	it('handles createOrderThunk.pending', () => {
		const state = reducer(initial, createOrderThunk.pending('', ['ing1']));
		expect(state.loading).toBe(true);
		expect(state.error).toBeNull();
	});

	it('should handle createOrderThunk.fulfilled', () => {
		const prev = { ...initial, loading: true, orderNumber: null };
		const orderNum = 456;
		const state = reducer(
			prev,
			createOrderThunk.fulfilled(orderNum, '', ['ing1', 'ing2'])
		);
		expect(state.loading).toBe(false);
		expect(state.orderNumber).toBe(orderNum);
		expect(state.error).toBe(prev.error);
	});

	it('handles createOrderThunk.rejected', () => {
		const errorMsg = 'Creation failed';
		const action = {
			type: createOrderThunk.rejected.type,
			payload: errorMsg,
		};
		const state = reducer(initial, action);
		expect(state.loading).toBe(false);
		expect(state.error).toBe(errorMsg);
	});

	it('should handle clearOrder action', () => {
		const prev = { loading: true, orderNumber: 101, error: 'err' };
		const state = reducer(prev, clearOrder());
		expect(state).toEqual(initial);
	});
});
