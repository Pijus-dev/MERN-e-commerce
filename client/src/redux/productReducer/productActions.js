import productActionTypes from "./productActionTypes";

import axios from "axios";

const listProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: productActionTypes.PRODUCT_LIST_REQUEST,
    });
    const { data } = await axios.get("/api/products");
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
export default listProducts;
