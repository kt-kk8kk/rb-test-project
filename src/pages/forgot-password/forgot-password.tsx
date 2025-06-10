import React, { useRef, useState, useEffect } from 'react';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormContainer } from '@components/form-container/form-container';
import { FormHint } from '@components/form-container/form-hint/form-hint';
import { FormActions } from '@components/form-container/form-actions/form-actions';
import { ErrorMessage } from '@components/error-message/error-message';
import { ROUTES } from '@utils/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCanResetPassword } from '@services/slices/user-slice';
import {
	forgotPassword,
	resetForgotPasswordState,
} from '@services/slices/forgot-password-slice';
import type { RootState, AppDispatch } from '@services/store';

export const ForgotPasswordPage = (): React.JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const { isLoading, error, success } = useSelector(
		(state: RootState) => state.forgotPassword
	);

	const [email, setEmail] = useState('');
	const emailRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		dispatch(setCanResetPassword(false));
	}, [dispatch]);

	useEffect(() => {
		if (success) {
			dispatch(setCanResetPassword(true));
			navigate(ROUTES.RESET_PASSWORD);
		}
		return () => {
			dispatch(resetForgotPasswordState());
		};
	}, [success, dispatch, navigate]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(forgotPassword(email));
	};

	return (
		<FormContainer title='Восстановление пароля' onSubmit={handleSubmit}>
			<Input
				type={'email'}
				placeholder={'Укажите e-mail'}
				name={'email'}
				value={email || ''}
				onChange={(e) => setEmail(e.target.value)}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
				extraClass='mb-6'
				ref={emailRef}
			/>
			<FormActions>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					disabled={isLoading}>
					{isLoading ? 'Отправка...' : 'Восстановить'}
				</Button>
				{error && <ErrorMessage error={error} />}
			</FormActions>
			<FormHint
				text='Вспомнили пароль?'
				linkText='Войти'
				linkTo={ROUTES.LOGIN}
			/>
		</FormContainer>
	);
};
