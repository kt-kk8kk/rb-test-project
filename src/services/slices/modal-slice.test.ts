import { describe, it, expect } from 'vitest';
import reducer, { openModal, closeModal } from './modal-slice';
import type { TModalType } from './modal-slice';

describe('modalSlice reducer', () => {
	const initial = reducer(undefined, { type: 'UNKNOWN_ACTION' });

	it('should return the initial state for an unknown action', () => {
		const state = reducer(undefined, { type: 'RANDOM_ACTION' });
		expect(state).toEqual(initial);
	});

	it('should handle openModal action with valid modal type', () => {
		const state = reducer(initial, openModal('order'));
		expect(state.openModalType).toBe('order');
	});

	it('should handle openModal action with null', () => {
		const prev = { ...initial, openModalType: 'order' as TModalType };
		const state = reducer(prev, openModal(null));
		expect(state.openModalType).toBeNull();
	});

	it('should handle closeModal action', () => {
		const prev = { ...initial, openModalType: 'order' as TModalType };
		const state = reducer(prev, closeModal());
		expect(state.openModalType).toBeNull();
	});
});
