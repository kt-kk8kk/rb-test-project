import { request } from '@utils/request';

interface TLogoutResponse {
	success: boolean;
	message: string;
}

export async function logoutUser(
	refreshToken: string
): Promise<TLogoutResponse> {
	return request<TLogoutResponse>('/auth/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: refreshToken }),
	});
}
