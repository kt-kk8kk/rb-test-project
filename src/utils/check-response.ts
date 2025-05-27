export async function checkResponse<T>(res: Response): Promise<T> {
	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData?.message || 'Ошибка на сервере');
	}
	return res.json() as Promise<T>;
}
