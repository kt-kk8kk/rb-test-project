import React from 'react';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { Preloader } from '@components/preloader/preloader';
import { useSelector } from 'react-redux';
import type { RootState } from '@services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const HomePage = (): React.JSX.Element => {
	const ingredients = useSelector(
		(state: RootState) => state.ingredients.items
	);
	const isLoading = useSelector(
		(state: RootState) => state.ingredients.loading
	);
	const error = useSelector((state: RootState) => state.ingredients.error);

	if (error) return <div>{error}</div>;
	if (isLoading || !ingredients.length) return <Preloader />;

	return (
		<DndProvider backend={HTML5Backend}>
			<BurgerIngredients />
			<BurgerConstructor />
		</DndProvider>
	);
};
