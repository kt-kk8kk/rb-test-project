import styles from './ingredient-details.module.css';
import React from 'react';
import { IngredientDetails } from '@components/burger-ingredients/ingredient-details/ingredient-details';

export const IngredientDetailsPage = (): React.JSX.Element => {
	return (
		<div className={styles.wrap}>
			<h2 className='text text_type_main-large'>Детали ингредиента</h2>
			<IngredientDetails />
		</div>
	);
};
