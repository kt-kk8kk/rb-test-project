import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils/types';
import { request } from '@utils/request';

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async (_, thunkAPI) => {
		try {
			const data = await request<{ data: TIngredient[] }>('/ingredients');
			return data.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				(error as Error).message ||
					'Сетевая ошибка при загрузке ингредиентов'
			);
		}
	}
);
