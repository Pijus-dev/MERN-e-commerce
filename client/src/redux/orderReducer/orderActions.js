import {
  orderActionTypes,
  orderActionDetailsTypes,
  orderActionPayTypes,
} from "./orderActionTypes";

import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderActionTypes.ORDER_CREATE_REQUEST,
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

    const { data } = await axios.post("/api/orders", order, config);

    dispatch({
      type: orderActionTypes.ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: orderActionTypes.ORDER_CREATE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderActionDetailsTypes.ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${orderId}`, config);

    dispatch({
      type: orderActionDetailsTypes.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: orderActionDetailsTypes.ORDER_DETAILS_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: orderActionPayTypes.ORDER_PAY_REQUEST,
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
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );
    dispatch({
      type: orderActionPayTypes.ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: orderActionPayTypes.ORDER_PAY_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const stripePayOrder = (orderId, price, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: orderActionPayTypes.ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    console.log(paymentResult);

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // };
    const { data } = await axios({
      method: "put",
      url: `/api/orders/${orderId}/stripe-payment`,
      data: {
        token: paymentResult,
        amount: Math.round(price * 100),
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: orderActionPayTypes.ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: orderActionPayTypes.ORDER_PAY_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
