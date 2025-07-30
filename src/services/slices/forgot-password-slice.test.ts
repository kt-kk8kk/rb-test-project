import { describe, it, expect } from 'vitest';
import reducer, {
	forgotPassword,
	resetPassword,
	resetForgotPasswordState,
} from './forgot-password-slice';

const initial = reducer(undefined, { type: 'UNKNOWN' });

describe('forgotPasswordSlice basic reducer', () => {
	it('returns initial state for unknown action', () => {
		expect(reducer(undefined, { type: 'ANY' })).toEqual(initial);
	});

	it('forgotPassword pending sets isLoading=true and clears error', () => {
		const prev = { ...initial, error: 'err', success: true };
		const next = reducer(prev, forgotPassword.pending('', 'email'));
		expect(next.isLoading).toBe(true);
		expect(next.error).toBeNull();
		expect(next.success).toBe(prev.success);
	});

	it('forgotPassword fulfilled sets success=true and stops loading', () => {
		const prev = { ...initial, isLoading: true };
		const next = reducer(prev, forgotPassword.fulfilled(true, '', 'email'));
		expect(next.isLoading).toBe(false);
		expect(next.success).toBe(true);
	});

	it('forgotPassword rejected sets error and stops loading', () => {
		const prev = { ...initial, isLoading: true };
		const action = { type: forgotPassword.rejected.type, payload: 'err' };
		const next = reducer(prev, action);
		expect(next.isLoading).toBe(false);
		expect(next.error).toBe('err');
	});

	it('resetPassword pending and fulfilled work similarly', () => {
		const p1 = reducer(
			initial,
			resetPassword.pending('', { password: '', token: '' })
		);
		expect(p1.isLoading).toBe(true);
		const p2 = reducer(
			{ ...initial, isLoading: true },
			resetPassword.fulfilled({ success: true, message: '' }, '', {
				password: '',
				token: '',
			})
		);
		expect(p2.isLoading).toBe(false);
		expect(p2.success).toBe(true);
	});

	it('resetForgotPasswordState resets to initial', () => {
		const modified = {
			...initial,
			isLoading: true,
			error: 'e',
			success: true,
		};
		const next = reducer(modified, resetForgotPasswordState());
		expect(next).toEqual(initial);
	});
});
