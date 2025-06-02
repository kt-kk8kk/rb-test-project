import React, { useEffect } from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { AppHeader } from '@components/app-header/app-header';
import { Preloader } from '@components/preloader/preloader';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../services/store'; // путь к store может отличаться
import { fetchIngredients } from '../../utils/api/ingredients';

export const App = (): React.JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();

	const ingredients = useSelector(
		(state: RootState) => state.ingredients.items
	);
	const isLoading = useSelector(
		(state: RootState) => state.ingredients.loading
	);
	const error = useSelector((state: RootState) => state.ingredients.error);

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	if (error) return <div>{error}</div>;
	if (isLoading || !ingredients.length) return <Preloader />;

	return (
		<div className={styles.app}>
			<AppHeader />
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				<BurgerIngredients />
				<BurgerConstructor />
			</main>
		</div>
	);
};
