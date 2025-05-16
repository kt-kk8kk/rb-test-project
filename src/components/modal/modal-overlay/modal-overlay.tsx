import React from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
	onClick: () => void;
};

export const ModalOverlay = ({
	onClick,
}: TModalOverlayProps): React.JSX.Element => {
	return <button className={styles.modal_overlay} onClick={onClick}></button>;
};
