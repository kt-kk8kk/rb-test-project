import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice';
import burgerConstructorReducer from './slices/burger-constructor-slice';
import modalReducer from './slices/modal-slice';
import orderReducer from './slices/order-slice';
import userReducer from './slices/user-slice';
import forgotPasswordReducer from './slices/forgot-password-slice';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	order: orderReducer,
	modal: modalReducer,
	user: userReducer,
	forgotPassword: forgotPasswordReducer,
});
