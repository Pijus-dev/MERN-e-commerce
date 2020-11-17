import {
  productActionTypes,
  productDetailsActionTypes,
  productActionDeleteTypes,
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

const listProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: productActionTypes.PRODUCT_LIST_REQUEST,
    });
    const { data } = await axios.get(`/api/products`);
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
export { listProducts, listProductDetails, listProductsBySex };
