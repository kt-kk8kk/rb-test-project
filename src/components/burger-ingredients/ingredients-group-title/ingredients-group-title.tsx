import React from 'react';

type TProps = {
	title: string;
};

export const IngredientsGroupTitle = ({ title }: TProps): React.JSX.Element => {
	return <h2 className={'text text_type_main-medium mb-6'}>{title}</h2>;
};
