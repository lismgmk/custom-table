import {  useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useTypedSelector = createSelectorHook<RootState>();
// const useAppSelector: <Selected extends unknown>(
//   selector: (state: RootState) => Selected,
//   equalityFn?: ((previous: Selected, next: Selected) => boolean) | undefined,
// ) => Selected;
