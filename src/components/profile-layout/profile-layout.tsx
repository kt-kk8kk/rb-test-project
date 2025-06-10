import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-layout.module.css';
import { useDispatch } from 'react-redux';
import { logout } from '@services/slices/user-slice';
import { ROUTES } from '@utils/routes';
import { AppDispatch } from '@services/store';

export const ProfileLayout = (): React.JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await dispatch(logout()).unwrap();
			navigate(ROUTES.LOGIN);
		} catch (error) {
			console.error('Ошибка при выходе:', error);
		}
	};

	return (
		<section className={styles.profile_wrap}>
			<nav className={styles.profile_menu}>
				<ul className={styles.profile_list}>
					<li
						className={`${styles.profile_item} text_type_main-medium`}>
						<NavLink
							to={ROUTES.PROFILE}
							end
							className={({ isActive }) =>
								`${styles.link} ${isActive ? styles.link_active : ''}`
							}>
							Профиль
						</NavLink>
					</li>
					<li
						className={`${styles.profile_item} text_type_main-medium`}>
						<NavLink
							to={ROUTES.PROFILE_ORDERS}
							className={({ isActive }) =>
								`${styles.link} ${isActive ? styles.link_active : ''}`
							}>
							История заказов
						</NavLink>
					</li>
					<li
						className={`${styles.profile_item} text_type_main-medium`}>
						<Button
							extraClass={styles.profile_logout}
							htmlType='button'
							type='secondary'
							size='large'
							onClick={handleLogout}>
							Выйти
						</Button>
					</li>
				</ul>
			</nav>

			<section className={styles.profile_body}>
				<Outlet />
			</section>
		</section>
	);
};
