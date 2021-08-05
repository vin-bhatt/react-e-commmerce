import {
    DISPLAY_ITEMS,
    ERROR,
    LOADING,
  } from '../ActionTypes';
  
  const initialProductState = {
    loading: false,
    products: [],
    error: null,
    query: '',
  };
  
  const productsReducer = (state = initialProductState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case LOADING:
        return { ...state, loading: true, error: null };
      case DISPLAY_ITEMS:
        return {
          ...state,
          loading: false,
          products: payload,
        };
      case ERROR:
        return {
          ...state,
          loading: false,
          products: [],
          error: payload,
        };
      default:
        return state;
    }
  };
  
  export default productsReducer;
  