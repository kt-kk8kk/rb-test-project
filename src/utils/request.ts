import { API_URL } from './constants';
import { checkResponse } from './check-response';

type TRequestOptions = RequestInit;

export async function request<T>(
	endpoint: string,
	options?: TRequestOptions
): Promise<T> {
	const res = await fetch(`${API_URL}${endpoint}`, options);
	return checkResponse<T>(res);
}
