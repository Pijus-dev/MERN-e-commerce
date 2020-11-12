import axios from "axios";
import { cartActionTypes } from "./cartActionTypes";

export const addToCart = (id, qty, sizes) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: cartActionTypes.ADD_ITEM_TO_CART,
    payload: {
      product: data._id,
      size: data.size,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      sex: data.sex,
      qty,
      sizes,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: cartActionTypes.REMOVE_ITEM_FROM_CART,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: cartActionTypes.SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: cartActionTypes.SAVE_PAYMENT_METHOD,
    payload: data,
  });
};
