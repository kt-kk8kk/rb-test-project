import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TModalProps = {
	title?: string;
	children: ReactNode;
	onClose: () => void;
};

const modalRoot = document.getElementById('modal-root') as HTMLElement;

export const Modal = ({
	title,
	children,
	onClose,
}: TModalProps): React.JSX.Element => {
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};
		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [onClose]);

	const modalContent = (
		<div className={styles.modal_wrap}>
			<ModalOverlay onClick={onClose} />
			<div className={styles.modal}>
				<span className={styles.modal_closer}>
					<CloseIcon type='primary' onClick={onClose} />
				</span>
				{title && (
					<h2 className='text text_type_main-large'>{title}</h2>
				)}
				{children}
			</div>
		</div>
	);

	return createPortal(modalContent, modalRoot);
};
