import { API_URL } from '../constants';

export async function createOrder(
	ingredients: string[]
): Promise<{ order: { number: number } }> {
	try {
		const response = await fetch(`${API_URL}/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ingredients }),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data?.message || 'Ошибка при создании заказа');
		}

		if (!data.success) {
			throw new Error('Создание заказа неуспешно');
		}

		return data;
	} catch (error) {
		throw new Error(
			(error as Error).message || 'Неизвестная ошибка при создании заказа'
		);
	}
}
