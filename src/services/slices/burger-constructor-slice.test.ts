import { describe, it, expect, vi } from 'vitest';
import reducer, {
	addIngredient,
	clearConstructor,
} from './burger-constructor-slice';
import type { TIngredient } from '@utils/types';

vi.mock('uuid', () => ({ v4: () => 'uuid' }));

describe('burgerConstructorSlice (basic)', () => {
	const initial = reducer(undefined, { type: 'UNKNOWN_ACTION' });

	const bun: TIngredient = {
		_id: 'bun1',
		name: 'Classic Bun',
		type: 'bun',
		proteins: 10,
		fat: 5,
		carbohydrates: 20,
		calories: 200,
		price: 100,
		image: '/images/bun.png',
		image_large: '/images/bun-large.png',
		image_mobile: '/images/bun-mobile.png',
		__v: 0,
	};

	const filling: TIngredient = {
		_id: 'main1',
		name: 'Beef Patty',
		type: 'main',
		proteins: 20,
		fat: 10,
		carbohydrates: 5,
		calories: 150,
		price: 200,
		image: '/images/main.png',
		image_large: '/images/main-large.png',
		image_mobile: '/images/main-mobile.png',
		__v: 0,
	};

	it('returns initial state for unknown action', () => {
		const state = reducer(undefined, { type: 'SOME_UNKNOWN' });
		expect(state).toEqual(initial);
	});

	it('addIngredient: bun replaces only bun field', () => {
		const next = reducer(initial, addIngredient(bun));
		expect(next.bun).toEqual({ ...bun, uuid: 'uuid' });
		expect(next.ingredients).toEqual(initial.ingredients);
	});

	it('addIngredient: filling appends to ingredients only', () => {
		const next = reducer(initial, addIngredient(filling));
		expect(next.ingredients).toEqual([{ ...filling, uuid: 'uuid' }]);
		expect(next.bun).toBeNull();
	});

	it('clearConstructor resets state to initial', () => {
		const populated = {
			bun: { ...bun, uuid: 'uuid' },
			ingredients: [{ ...filling, uuid: 'uuid' }],
		};
		const next = reducer(populated, clearConstructor());
		expect(next).toEqual(initial);
	});
});
