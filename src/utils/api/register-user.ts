import { request } from '@utils/request';

interface TRegisterRequest {
	email: string;
	password: string;
	name: string;
}

interface TRegisterResponse {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
	accessToken: string;
	refreshToken: string;
}

export async function registerUser(
	data: TRegisterRequest
): Promise<TRegisterResponse> {
	return request<TRegisterResponse>('/auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
}
