import { request } from '@utils/request';

interface TLoginRequest {
	email: string;
	password: string;
}

interface TLoginResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: {
		email: string;
		name: string;
	};
}

export async function loginUser(data: TLoginRequest): Promise<TLoginResponse> {
	return request<TLoginResponse>('/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
}
