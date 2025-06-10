import React, { useRef, useState, useEffect } from 'react';
import styles from './profile.module.css';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import {
	getUser as getUserSelector,
	fetchUser,
	patchUser,
} from '@services/slices/user-slice';
import { AppDispatch } from '@services/store';
import { FormContainer } from '@components/form-container/form-container';

export const ProfilePage = (): React.JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector(getUserSelector);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [isEditing, setIsEditing] = useState({
		name: false,
		email: false,
		password: false,
	});
	const [isChanged, setIsChanged] = useState(false);

	const originalUser = useRef<{ name: string; email: string }>({
		name: '',
		email: '',
	});

	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const handleChange =
		(field: keyof typeof formData) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			setFormData((prev) => ({ ...prev, [field]: value }));

			if (field === 'password') {
				setIsEditing((prev) => ({
					...prev,
					[field]: value.length > 0,
				}));
			} else {
				setIsEditing((prev) => ({
					...prev,
					[field]: value !== originalUser.current[field],
				}));
			}
		};

	const handleIconClick = (field: keyof typeof formData) => {
		if (isEditing[field]) {
			const original =
				field === 'password' ? '' : originalUser.current[field];
			setFormData((prev) => ({ ...prev, [field]: original }));
			setIsEditing((prev) => ({ ...prev, [field]: false }));
		}
	};

	useEffect(() => {
		const changed =
			formData.name !== originalUser.current.name ||
			formData.email !== originalUser.current.email ||
			formData.password.trim() !== '';

		setIsChanged(changed);
	}, [formData]);

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			setFormData({ name: user.name, email: user.email, password: '' });
			originalUser.current = { name: user.name, email: user.email };
			setIsEditing({ name: false, email: false, password: false });
			setIsChanged(false);
		}
	}, [user]);

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();

		dispatch(
			patchUser({
				name: formData.name,
				email: formData.email,
				...(formData.password ? { password: formData.password } : {}),
			})
		)
			.unwrap()
			.then((res) => {
				originalUser.current = res.user;
				setFormData({
					name: res.user.name,
					email: res.user.email,
					password: '',
				});
				setIsEditing({ name: false, email: false, password: false });
				setIsChanged(false);
			})
			.catch((err) => console.error('Save failed:', err));
	};

	const handleCancel = () => {
		setFormData({
			name: originalUser.current.name,
			email: originalUser.current.email,
			password: '',
		});
		setIsEditing({ name: false, email: false, password: false });
		setIsChanged(false);
	};

	return (
		<FormContainer onSubmit={handleSave}>
			<Input
				type={'text'}
				placeholder={'Имя'}
				name={'name'}
				value={formData.name}
				onChange={handleChange('name')}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
				extraClass='mb-6'
				ref={nameRef}
				icon={isEditing.name ? 'CloseIcon' : 'EditIcon'}
				onIconClick={() => handleIconClick('name')}
			/>
			<Input
				type={'email'}
				placeholder={'Логин'}
				name={'email'}
				value={formData.email}
				onChange={handleChange('email')}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
				extraClass='mb-6'
				ref={emailRef}
				icon={isEditing.email ? 'CloseIcon' : 'EditIcon'}
				onIconClick={() => handleIconClick('email')}
			/>
			<Input
				type={'password'}
				placeholder={'Пароль'}
				name={'password'}
				value={formData.password}
				onChange={handleChange('password')}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
				extraClass='mb-6'
				ref={passwordRef}
				icon={isEditing.password ? 'CloseIcon' : 'EditIcon'}
				onIconClick={() => handleIconClick('password')}
			/>

			{isChanged && (
				<div className={styles.profile_btns}>
					<Button
						htmlType='button'
						type='secondary'
						size='large'
						onClick={handleCancel}>
						Отмена
					</Button>
					<Button htmlType='submit' type='primary' size='medium'>
						Сохранить
					</Button>
				</div>
			)}
		</FormContainer>
	);
};
