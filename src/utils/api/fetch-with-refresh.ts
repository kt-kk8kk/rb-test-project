import { refreshToken } from './refresh-token';
import { checkResponse } from '../check-response';

export async function fetchWithRefresh<T>(
	url: string,
	options: RequestInit
): Promise<T> {
	try {
		const res = await fetch(url, options);
		return await checkResponse<T>(res);
	} catch (err: unknown) {
		if (err instanceof Error && err.message === 'jwt expired') {
			const refreshData = await refreshToken();

			if (!options.headers) {
				options.headers = {};
			}

			if (options.headers instanceof Headers) {
				options.headers.set(
					'Authorization',
					`Bearer ${refreshData.accessToken}`
				);
			} else {
				(options.headers as Record<string, string>)['Authorization'] =
					`Bearer ${refreshData.accessToken}`;
			}

			const res = await fetch(url, options);
			return await checkResponse<T>(res);
		} else {
			return Promise.reject(err);
		}
	}
}
