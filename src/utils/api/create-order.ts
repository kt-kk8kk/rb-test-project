import { request } from '@utils/request';

export async function createOrder(
	ingredients: string[]
): Promise<{ order: { number: number } }> {
	const accessToken = localStorage.getItem('accessToken');

	return request<{ order: { number: number } }>('/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: accessToken ? `Bearer ${accessToken}` : '',
		},
		body: JSON.stringify({ ingredients }),
	});
}
