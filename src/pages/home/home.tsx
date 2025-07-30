import React from 'react';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { Preloader } from '@components/preloader/preloader';
import { useAppSelector } from '@hooks/use-redux-hooks';
import type { RootState } from '@services/root-reducer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const HomePage = (): React.JSX.Element => {
	const ingredients = useAppSelector(
		(state: RootState) => state.ingredients.items
	);
	const isLoading = useAppSelector(
		(state: RootState) => state.ingredients.loading
	);
	const error = useAppSelector((state: RootState) => state.ingredients.error);

	if (error) return <div>{error}</div>;
	if (isLoading || !ingredients.length) return <Preloader />;

	return (
		<DndProvider backend={HTML5Backend}>
			<BurgerIngredients />
			<BurgerConstructor />
		</DndProvider>
	);
};
