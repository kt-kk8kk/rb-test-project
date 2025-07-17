export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	FORGOT_PASSWORD: '/forgot-password',
	RESET_PASSWORD: '/reset-password',
	INGREDIENT: '/ingredients/:ingredientId',
	PROFILE: '/profile',
	PROFILE_ORDERS: '/profile/orders',
	PROFILE_ORDER: '/profile/orders/:id',
	FEED: '/feed',
	FEED_ORDER: '/feed/:id',
} as const;
