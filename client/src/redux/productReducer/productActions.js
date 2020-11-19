import {
  productActionTypes,
  productDetailsActionTypes,
  productActionDeleteTypes,
  productActionCreateTypes,
  productActionUpdateTypes,
  productActionReviewTypes,
} from "./productActionTypes";

import axios from "axios";

const listProductsBySex = (sex) => async (dispatch) => {
  try {
    dispatch({
      type: productActionTypes.PRODUCT_LIST_REQUEST,
    });
    const { data } = await axios.get(`/api/products/gender/${sex}`);
    dispatch({
      type: productActionTypes.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: productActionTypes.PRODUCT_LIST_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

const listProducts = (keyword = "") => async (dispatch) => {
  try {
    dispatch({
      type: productActionTypes.PRODUCT_LIST_REQUEST,
    });
    const { data } = await axios.get(`/api/products?keyword=${keyword}`);
    dispatch({
      type: productActionTypes.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: productActionTypes.PRODUCT_LIST_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: productDetailsActionTypes.PRODUCT_DETAILS_LIST_REQUEST,
    });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: productDetailsActionTypes.PRODUCT_DETAILS_LIST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: productDetailsActionTypes.PRODUCT_DETAILS_LIST_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: productActionDeleteTypes.PRODUCT_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: productActionDeleteTypes.PRODUCT_DELETE_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: productActionDeleteTypes.PRODUCT_DELETE_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: productActionCreateTypes.PRODUCT_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: productActionCreateTypes.PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: productActionCreateTypes.PRODUCT_CREATE_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: productActionUpdateTypes.PRODUCT_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: productActionUpdateTypes.PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: productActionUpdateTypes.PRODUCT_UPDATE_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const createProductReview = (productID, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: productActionReviewTypes.PRODUCT_REVIEW_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${productID}/reviews`, review, config);

    dispatch({
      type: productActionReviewTypes.PRODUCT_REVIEW_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: productActionReviewTypes.PRODUCT_REVIEW_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
export { listProducts, listProductDetails, listProductsBySex };
