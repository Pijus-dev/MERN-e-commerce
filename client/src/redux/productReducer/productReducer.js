import {
  productActionTypes,
  productDetailsActionTypes,
  productActionDeleteTypes,
  productActionCreateTypes,
  productActionUpdateTypes,
  productActionReviewTypes,
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

const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case productActionDeleteTypes.PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case productActionDeleteTypes.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case productActionDeleteTypes.PRODUCT_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case productActionCreateTypes.PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case productActionCreateTypes.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case productActionCreateTypes.PRODUCT_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    case productActionCreateTypes.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productActionUpdateTypes.PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case productActionUpdateTypes.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case productActionUpdateTypes.PRODUCT_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    case productActionUpdateTypes.PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case productActionReviewTypes.PRODUCT_REVIEW_REQUEST:
      return { loading: true };
    case productActionReviewTypes.PRODUCT_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case productActionReviewTypes.PRODUCT_REVIEW_FAILURE:
      return { loading: false, error: action.payload };
    case productActionReviewTypes.PRODUCT_REVIEW_RESET:
      return { product: {} };
    default:
      return state;
  }
};
export {
  productReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
};
