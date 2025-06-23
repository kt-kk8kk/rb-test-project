import React from 'react';
import { Link } from 'react-router-dom';
import styles from './form-hint.module.css';

type TFormHintProps = {
	text: string;
	linkText: string;
	linkTo: string;
};

export const FormHint = ({
	text,
	linkText,
	linkTo,
}: TFormHintProps): React.JSX.Element => {
	return (
		<div className={`${styles.form_hint} mb-4`}>
			<span className='text text_type_main-default text_color_inactive'>
				{text}
			</span>{' '}
			<Link className={styles.form_link} to={linkTo}>
				{linkText}
			</Link>
		</div>
	);
};
