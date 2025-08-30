import api from '../utils/axios';

// Action Types
export const FETCH_PRODUCTS_START = "FETCH_PRODUCTS_START";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

// 取得商品資料
export const getProducts = () => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: FETCH_PRODUCTS_START });
    
    api.get('/products')
      .then((response) => {
        dispatch({ 
          type: FETCH_PRODUCTS_SUCCESS, 
          payload: response.data 
        });
      })
      .catch((error) => {
        dispatch({ 
          type: FETCH_PRODUCTS_FAILURE, 
          payload: error.response?.data?.message || error.message || '取得商品資料失敗' 
        });
      });
  };
};
