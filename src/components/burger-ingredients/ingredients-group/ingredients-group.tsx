import React, { ReactNode } from 'react';
import styles from './ingredients-group.module.css';

type TIngredientsGroupProps = {
	children: ReactNode;
};

export const IngredientsGroup = ({
	children,
}: TIngredientsGroupProps): React.JSX.Element => {
	return (
		<ul className={`${styles.ingredients_group} pl-4 pr-4`}>{children}</ul>
	);
};
