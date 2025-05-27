import React, { useRef } from 'react';
import styles from './draggable-ingredient.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop, DropTargetMonitor, XYCoord } from 'react-dnd';
import { useDispatch } from 'react-redux';
import {
	removeIngredient,
	moveIngredient,
} from '@/services/slices/burger-constructor-slice';
import { TConstructorIngredient } from '@utils/types.ts';

type DraggableIngredientProps = {
	ingredient: TConstructorIngredient;
	index: number;
};

type DragItem = {
	index: number;
};

export const DraggableIngredient: React.FC<DraggableIngredientProps> = ({
	ingredient,
	index,
}) => {
	const dispatch = useDispatch();
	const ref = useRef<HTMLLIElement>(null);

	const [{ isDragging }, drag] = useDrag({
		type: 'constructorIngredient',
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop<DragItem, void, unknown>({
		accept: 'constructorIngredient',
		hover(item, monitor: DropTargetMonitor) {
			if (!ref.current) return;
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) return;

			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			if (!clientOffset) return;
			const hoverClientY =
				(clientOffset as XYCoord).y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

			dispatch(
				moveIngredient({ fromIndex: dragIndex, toIndex: hoverIndex })
			);

			item.index = hoverIndex;
		},
	});

	drag(drop(ref));

	return (
		<li
			ref={ref}
			style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
			className={styles.filling_item}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={() => dispatch(removeIngredient(ingredient.uuid))}
			/>
		</li>
	);
};
