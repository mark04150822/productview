import { 
  FETCH_PRODUCTS_START, 
  FETCH_PRODUCTS_SUCCESS, 
  FETCH_PRODUCTS_FAILURE
} from '../actions/productAction';

// 初始狀態
const initialState = {
  products: [],
  loading: false,
  error: null,
};

export default function productReducer(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_PRODUCTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
      
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };
      
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
    default:
      return state;
  }
}
