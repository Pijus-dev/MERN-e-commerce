import {
  userActionLoginTypes,
  userActionRegisterTypes,
  userActionDetailsTypes,
  userActionUpdateTypes,
  userActionListTypes,
  userActionDeleteTypes,
  userActionEditTypes,
} from "./userActionTypes";
import { orderActionMyOrderTypes } from "../orderReducer/orderActionTypes";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userActionLoginTypes.USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      {
        email,
        password,
        config,
      },
      config
    );
    dispatch({
      type: userActionLoginTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (e) {
    dispatch({
      type: userActionLoginTypes.USER_LOGIN_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userActionRegisterTypes.USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users",
      {
        name,
        email,
        password,
      },
      config
    );

    dispatch({
      type: userActionRegisterTypes.USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: userActionLoginTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (e) {
    dispatch({
      type: userActionRegisterTypes.USER_REGISTER_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userActionDetailsTypes.USER_DETAILS_REQUEST,
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
    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: userActionDetailsTypes.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: userActionDetailsTypes.USER_DETAILS_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userActionUpdateTypes.USER_UPDATE_REQUEST,
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
    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: userActionUpdateTypes.USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: userActionUpdateTypes.USER_UPDATE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: userActionLoginTypes.USER_LOGOUT,
  });
  dispatch({
    type: userActionDetailsTypes.USER_DETAILS_RESET,
  });
  dispatch({
    type: orderActionMyOrderTypes.ORDER_LIST_MY_RESET,
  });
  dispatch({
    type: userActionListTypes.USER_LIST_RESET,
  });
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: userActionListTypes.USER_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: userActionListTypes.USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: userActionListTypes.USER_LIST_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userActionDeleteTypes.USER_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: userActionDeleteTypes.USER_DELETE_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: userActionDeleteTypes.USER_DELETE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const editUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userActionEditTypes.USER_EDIT_REQUEST,
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
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({
      type: userActionEditTypes.USER_EDIT_SUCCESS,
    });
    dispatch({
      type: userActionDetailsTypes.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: userActionEditTypes.USER_EDIT_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
