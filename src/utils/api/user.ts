import { fetchWithRefresh } from './fetch-with-refresh';
import { API_URL } from '../constants';

interface TUser {
	email: string;
	name: string;
}

interface TUpdateUserData {
	email?: string;
	name?: string;
	password?: string;
}

export async function getUser(): Promise<{ success: boolean; user: TUser }> {
	return fetchWithRefresh(`${API_URL}/auth/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
	});
}

export async function updateUser(
	data: TUpdateUserData
): Promise<{ success: boolean; user: TUser }> {
	return fetchWithRefresh(`${API_URL}/auth/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
		},
		body: JSON.stringify(data),
	});
}
