import { describe, it, expect } from 'vitest';
import reducer from './ingredients-slice';
import { fetchIngredients } from '@utils/api/ingredients';
import type { TIngredient } from '@utils/types';

const sampleItems: TIngredient[] = [
	{
		_id: 'i1',
		name: 'One',
		type: 'main',
		proteins: 1,
		fat: 1,
		carbohydrates: 1,
		calories: 1,
		price: 10,
		image: '',
		image_large: '',
		image_mobile: '',
		__v: 0,
	},
	{
		_id: 'i2',
		name: 'Two',
		type: 'bun',
		proteins: 2,
		fat: 2,
		carbohydrates: 2,
		calories: 2,
		price: 20,
		image: '',
		image_large: '',
		image_mobile: '',
		__v: 0,
	},
];

describe('ingredientsSlice basic reducer', () => {
	const initial = reducer(undefined, { type: 'UNKNOWN' });

	it('returns initial state for unknown action', () => {
		expect(reducer(undefined, { type: 'ANY' })).toEqual(initial);
	});

	it('handles pending: sets loading and clears error', () => {
		const next = reducer(initial, fetchIngredients.pending('', undefined));
		expect(next.loading).toBe(true);
		expect(next.error).toBeNull();
	});

	it('handles fulfilled: populates items and byId, stops loading', () => {
		const prev = { ...initial, loading: true };
		const next = reducer(
			prev,
			fetchIngredients.fulfilled(sampleItems, '', undefined)
		);
		expect(next.loading).toBe(false);
		expect(next.items).toEqual(sampleItems);
		expect(Object.keys(next.byId)).toHaveLength(sampleItems.length);
	});

	it('handles rejected: stops loading and sets error', () => {
		const prev = { ...initial, loading: true };
		const action = { type: fetchIngredients.rejected.type, payload: 'err' };
		const next = reducer(prev, action);
		expect(next.loading).toBe(false);
		expect(next.error).toBe('err');
	});
});
