import { describe, it, expect } from 'vitest';
import reducer, {
	register,
	login,
	fetchUser,
	logoutLocal,
	setUser,
} from './user-slice';

const initial = reducer(undefined, { type: 'UNKNOWN_ACTION' });

describe('userSlice (core scenarios)', () => {
	it('returns initial state for unknown action', () => {
		expect(reducer(undefined, { type: 'ANY' })).toEqual(initial);
	});

	it('register.fulfilled sets user and clears loading', () => {
		const payload = {
			success: true,
			user: { email: 'a@b.com', name: 'Alice' },
			accessToken: 'tA',
			refreshToken: 'tR',
		};
		const state = reducer(
			{ ...initial, isLoading: true },
			register.fulfilled(payload, '', {
				email: '',
				password: '',
				name: '',
			})
		);
		expect(state.isLoading).toBe(false);
		expect(state.user).toEqual(payload.user);
	});

	it('login.rejected sets error and clears loading', () => {
		const err = 'Bad creds';
		const state = reducer(
			{ ...initial, isLoading: true },
			{ type: login.rejected.type, payload: err }
		);
		expect(state.isLoading).toBe(false);
		expect(state.error).toBe(err);
	});

	it('fetchUser.fulfilled sets user and isAuthChecked', () => {
		const payload = {
			success: true,
			user: { email: 'c@d.com', name: 'Carol' },
		};
		const state = reducer(
			{ ...initial, isLoading: true },
			fetchUser.fulfilled(payload, '')
		);
		expect(state.isLoading).toBe(false);
		expect(state.user).toEqual(payload.user);
		expect(state.isAuthChecked).toBe(true);
	});

	it('logoutLocal clears user and tokens', () => {
		const prev = {
			...initial,
			user: { email: 'x@x', name: 'X' },
			accessToken: 'tok',
			refreshToken: 'rtok',
			error: 'oops',
			isAuthChecked: true,
			canResetPassword: true,
		};
		const state = reducer(prev, logoutLocal());
		expect(state.user).toBeNull();
		expect(state.accessToken).toBeNull();
		expect(state.refreshToken).toBeNull();
		expect(state.error).toBeNull();
		expect(state.isAuthChecked).toBe(true);
		expect(state.canResetPassword).toBe(true);
	});

	it('setUser updates user synchronously', () => {
		const user = { email: 'u@u', name: 'U' };
		expect(reducer(initial, setUser(user)).user).toEqual(user);
	});
});
