import { userActionTypes } from "./userActionTypes";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case userActionTypes.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case userActionTypes.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case userActionTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
