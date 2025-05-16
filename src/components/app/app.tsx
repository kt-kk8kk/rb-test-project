import React, { useEffect, useState } from 'react';
import { API_URL } from '@utils/constants';
import { TIngredient } from '@utils/types';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor';
import { AppHeader } from '@components/app-header/app-header';
import { Preloader } from '@components/preloader/preloader';

export const App = (): React.JSX.Element => {
	const [ingredients, setIngredients] = useState<TIngredient[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch(`${API_URL}/ingredients`)
			.then((res) => {
				if (!res.ok) throw new Error('Ошибка при получении ингредиентов');
				return res.json();
			})
			.then((data) => setIngredients(data.data))
			.catch((err) => {
				console.error('Fetch error:', err);
				setError('Не удалось загрузить ингредиенты');
			});
	}, []);

	if (error) return <div>{error}</div>;
	if (!ingredients.length) return <Preloader />;

	return (
		<div className={styles.app}>
			<AppHeader />
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				<BurgerIngredients ingredients={ingredients} />
				<BurgerConstructor ingredients={ingredients} />
			</main>
		</div>
	);
};

export default App;
