export async function createOrder(
	ingredients: string[]
): Promise<{ order: { number: number } }> {
	const response = await fetch(
		'https://norma.nomoreparties.space/api/orders',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ingredients }),
		}
	);

	if (!response.ok) {
		const errorData = await response.json().catch(() => null);
		throw new Error(errorData?.message || 'Ошибка при создании заказа');
	}

	const data = await response.json();

	if (!data.success) {
		throw new Error('Создание заказа неуспешно');
	}

	return data;
}
