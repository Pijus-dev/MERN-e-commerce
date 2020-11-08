import {
  productActionTypes,
  productDetailsActionTypes,
} from "./productActionTypes";

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

const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case productDetailsActionTypes.PRODUCT_DETAILS_LIST_REQUEST:
      return { loading: true, ...state };
    case productDetailsActionTypes.PRODUCT_DETAILS_LIST_SUCCESS:
      return { loading: false, product: action.payload };
    case productDetailsActionTypes.PRODUCT_DETAILS_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export {  productReducer, productDetailsReducer };
