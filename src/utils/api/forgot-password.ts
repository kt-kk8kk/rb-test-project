import { request } from '@utils/request';

interface TForgotPasswordRequest {
	email: string;
}

interface TForgotPasswordResponse {
	success: boolean;
	message: string;
}

export async function forgotPassword(
	data: TForgotPasswordRequest
): Promise<TForgotPasswordResponse> {
	return request<TForgotPasswordResponse>('/password-reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
}
