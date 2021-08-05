import { combineReducers } from 'redux';
import cartReducer from './Cart';
import productsReducer from './Products';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
});

export default rootReducer;