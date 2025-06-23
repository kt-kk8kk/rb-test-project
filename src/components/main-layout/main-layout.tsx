import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './main-layout.module.css';
import { AppHeader } from '@components/app-header/app-header';
import { ROUTES } from '@utils/routes';

export const MainLayout = (): React.JSX.Element => {
	const location = useLocation();

	const renderHeaderContent = () => {
		if (location.pathname === ROUTES.HOME) {
			return (
				<h1
					className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
					Соберите бургер
				</h1>
			);
		}
		return null;
	};

	return (
		<div className={styles.app}>
			<AppHeader />

			{renderHeaderContent()}

			<main className={`${styles.main} pl-5 pr-5`}>
				<Outlet />
			</main>
		</div>
	);
};
