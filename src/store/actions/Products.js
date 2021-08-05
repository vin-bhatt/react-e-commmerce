import {
    DISPLAY_ITEMS,
    ERROR,
    LOADING,
  } from '../ActionTypes';
  
const url = 'https://fakestoreapi.com/products';

const fetchProducts = () => async (dispatch, getState) => {
  dispatch({ type: LOADING });
  try {
    const response = await fetch(url);
    const data = await response.json();
    dispatch({ type: DISPLAY_ITEMS, payload: data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error });
  }
};

const productsActions = { fetchProducts };

export default productsActions;