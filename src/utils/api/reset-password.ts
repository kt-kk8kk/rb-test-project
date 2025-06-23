import { request } from '@utils/request';

interface TResetPasswordRequest {
	password: string;
	token: string;
}

interface TResetPasswordResponse {
	success: boolean;
	message: string;
}

export async function resetPassword(
	data: TResetPasswordRequest
): Promise<TResetPasswordResponse> {
	return request<TResetPasswordResponse>('/password-reset/reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
}
