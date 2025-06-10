import React, { useEffect } from 'react';
import styles from './ingredient-details.module.css';
import { Preloader } from '@components/preloader/preloader';
import { ErrorMessage } from '@components/error-message/error-message';
import { TIngredient } from '@utils/types.ts';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@services/store';
import { fetchIngredients } from '@utils/api/ingredients';

type IngredientDetailsProps = {
	ingredient?: TIngredient;
};

export const IngredientDetails = ({
	ingredient: propIngredient,
}: IngredientDetailsProps): React.JSX.Element | null => {
	const dispatch = useDispatch<AppDispatch>();

	const { ingredientId } = useParams<{ ingredientId: string }>();

	const { items, loading, error } = useSelector(
		(state: RootState) => state.ingredients
	);

	useEffect(() => {
		if (items.length === 0) {
			dispatch(fetchIngredients());
		}
	}, [dispatch, items.length]);

	const ingredient =
		propIngredient || items.find((item) => item._id === ingredientId);

	if (loading) {
		return <Preloader />;
	}

	if (error) {
		return <ErrorMessage error={error} />;
	}

	if (!ingredient) {
		return (
			<p className='text text_type_main-medium'>Ингредиент не найден</p>
		);
	}

	return (
		<div className={styles.ingredient_details}>
			<div className={`${styles.img_wrap} mb-4`}>
				<img
					className={styles.img}
					src={ingredient.image_large}
					width='480'
					height='240'
					alt={ingredient.name}
				/>
			</div>
			<h4 className={'text text_type_main-medium mb-8'}>
				{ingredient.name}
			</h4>
			<ul
				className={`${styles.ingredient_nutrition} text text_color_inactive mb-5`}>
				<li>
					<span className={`${styles.nutrition_title} mb-2`}>
						Калории,ккал
					</span>
					<span className={'text_type_digits-default'}>
						{ingredient.calories}
					</span>
				</li>
				<li>
					<span className={`${styles.nutrition_title} mb-2`}>
						Белки,г
					</span>
					<span className={'text_type_digits-default'}>
						{ingredient.proteins}
					</span>
				</li>
				<li>
					<span className={`${styles.nutrition_title} mb-2`}>
						Жиры,г
					</span>
					<span className={'text_type_digits-default'}>
						{ingredient.fat}
					</span>
				</li>
				<li>
					<span className={`${styles.nutrition_title} mb-2`}>
						Углеводы,г
					</span>
					<span className={'text_type_digits-default'}>
						{ingredient.carbohydrates}
					</span>
				</li>
			</ul>
		</div>
	);
};
