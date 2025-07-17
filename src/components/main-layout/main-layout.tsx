import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './main-layout.module.css';
import { AppHeader } from '@components/app-header/app-header';
import { ROUTES } from '@utils/routes';

export const MainLayout = (): React.JSX.Element => {
	const location = useLocation();

	const titles: Record<string, string> = {
		[ROUTES.HOME]: 'Соберите бургер',
		[ROUTES.FEED]: 'Лента заказов',
	};

	const headerTitle = titles[location.pathname];

	return (
		<div className={styles.app}>
			<AppHeader />

			{headerTitle && (
				<h1
					className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
					{headerTitle}
				</h1>
			)}

			<main className={`${styles.main} pl-5 pr-5`}>
				<Outlet />
			</main>
		</div>
	);
};
