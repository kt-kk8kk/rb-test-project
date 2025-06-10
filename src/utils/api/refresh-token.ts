import { request } from '@utils/request';

export const refreshToken = (): Promise<{
	success: boolean;
	accessToken: string;
	refreshToken: string;
}> => {
	const refreshTokenFromStorage = localStorage.getItem('refreshToken');
	if (!refreshTokenFromStorage) {
		return Promise.reject(new Error('Refresh token отсутствует'));
	}

	return request<{
		success: boolean;
		accessToken: string;
		refreshToken: string;
	}>('/auth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: refreshTokenFromStorage,
		}),
	}).then((refreshData) => {
		if (!refreshData.success) {
			return Promise.reject(new Error('Не удалось обновить токен'));
		}

		localStorage.setItem(
			'accessToken',
			refreshData.accessToken.replace('Bearer ', '')
		);
		localStorage.setItem('refreshToken', refreshData.refreshToken);
		return refreshData;
	});
};
