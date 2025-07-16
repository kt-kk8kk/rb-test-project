import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@services/root-reducer';
import type { AppDispatch } from '@services/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
