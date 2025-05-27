import React from 'react';
import styles from './constructor-placeholder.module.css';

type TConstructorPlaceholderProps = {
	type: string;
	className?: string;
	'data-position'?: 'top' | 'bottom';
};

export const ConstructorPlaceholder = ({
	type,
	className,
	'data-position': position,
}: TConstructorPlaceholderProps): React.JSX.Element => {
	const positionClass =
		position === 'top'
			? styles.top_placeholder
			: position === 'bottom'
				? styles.bottom_placeholder
				: '';

	return (
		<div
			className={`${styles.constructor_placeholder} ${positionClass} ${className || ''}`.trim()}
			data-position={position}>
			<p className='text text_type_main-default'>Выберите {type}</p>
		</div>
	);
};
