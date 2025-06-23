export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	FORGOT_PASSWORD: '/forgot-password',
	RESET_PASSWORD: '/reset-password',
	INGREDIENT: '/ingredients/:ingredientId',
	PROFILE: '/profile',
	PROFILE_ORDERS: 'orders', // relative path inside /profile
} as const;
