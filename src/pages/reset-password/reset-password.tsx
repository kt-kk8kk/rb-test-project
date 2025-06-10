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
import { Navigate, useNavigate } from 'react-router-dom';
import { resetPassword } from '@services/slices/forgot-password-slice';
import { getCanResetPassword } from '@services/slices/user-slice';
import type { RootState, AppDispatch } from '@services/store';

export const ResetPasswordPage = (): React.JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const { isLoading, error, success } = useSelector(
		(state: RootState) => state.forgotPassword
	);

	const canResetPassword = useSelector(getCanResetPassword);

	const [code, setCode] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const codeRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!canResetPassword) {
			navigate(ROUTES.FORGOT_PASSWORD);
		}
	}, [canResetPassword, navigate]);

	useEffect(() => {
		if (success) {
			navigate(ROUTES.LOGIN);
		}
	}, [success, navigate]);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
		setTimeout(() => passwordRef.current?.focus(), 0);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(resetPassword({ password, token: code }));
	};

	if (!canResetPassword) {
		return <Navigate to={ROUTES.FORGOT_PASSWORD} replace />;
	}

	return (
		<FormContainer title='Восстановление пароля' onSubmit={handleSubmit}>
			<Input
				type={showPassword ? 'text' : 'password'}
				placeholder={'Введите новый пароль'}
				name={'password'}
				value={password || ''}
				onChange={(e) => setPassword(e.target.value)}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
				extraClass='mb-6'
				ref={passwordRef}
				icon={showPassword ? 'HideIcon' : 'ShowIcon'}
				onIconClick={togglePasswordVisibility}
			/>
			<Input
				type={'text'}
				placeholder={'Введите код из письма'}
				name={'code'}
				value={code || ''}
				onChange={(e) => setCode(e.target.value)}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
				extraClass='mb-6'
				ref={codeRef}
			/>
			<FormActions>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					disabled={isLoading}>
					{isLoading ? 'Сохранение...' : 'Сохранить'}
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
