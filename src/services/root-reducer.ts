import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice';
import burgerConstructorReducer from './slices/burger-constructor-slice';
import modalReducer from './slices/modal-slice';
import orderReducer from './slices/order-slice';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	order: orderReducer,
	modal: modalReducer,
});
