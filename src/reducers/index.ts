import { combineReducers } from 'redux';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  productState: productReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
