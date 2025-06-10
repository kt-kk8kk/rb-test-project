import styles from './not-found-404.module.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ROUTES } from '@utils/routes';

export const NotFound404 = (): React.JSX.Element => {
	const navigate = useNavigate();

	const handleNavigateToHome = () => {
		navigate(ROUTES.HOME);
	};

	return (
		<main className={styles.not_found}>
			<div className={styles.not_found_inner}>
				<h1 className={'text text_type_digits-large'}>404</h1>
				<p className={'text_type_main-large'}>Не туда попали</p>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={handleNavigateToHome}>
					Вернуться на Главную
				</Button>
			</div>
		</main>
	);
};
