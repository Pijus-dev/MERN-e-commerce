import productActionTypes from "./productActionTypes";

const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productActionTypes.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case productActionTypes.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case productActionTypes.PRODUCT_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export default productReducer;
