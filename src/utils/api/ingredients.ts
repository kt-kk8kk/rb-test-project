import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils/types';
import { API_URL } from '@utils/constants';

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async (_, thunkAPI) => {
		try {
			const res = await fetch(`${API_URL}/ingredients`);
			const data = await res.json();

			if (!res.ok) {
				return thunkAPI.rejectWithValue(
					data.message || 'Ошибка загрузки ингредиентов'
				);
			}

			return data.data as TIngredient[];
		} catch (error) {
			return thunkAPI.rejectWithValue(
				'Сетевая ошибка при загрузке ингредиентов'
			);
		}
	}
);
