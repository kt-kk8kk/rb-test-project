import React, { useEffect } from 'react';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { Preloader } from '@components/preloader/preloader';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@services/store';
import { fetchIngredients } from '@utils/api/ingredients';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const HomePage = (): React.JSX.Element => {
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
		<DndProvider backend={HTML5Backend}>
			<BurgerIngredients />
			<BurgerConstructor />
		</DndProvider>
	);
};
