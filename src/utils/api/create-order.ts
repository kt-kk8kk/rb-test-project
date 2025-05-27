import { request } from '@utils/request';

export async function createOrder(
	ingredients: string[]
): Promise<{ order: { number: number } }> {
	return request<{ order: { number: number } }>('/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ingredients }),
	});
}
