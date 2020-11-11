import {
  userActionLoginTypes,
  userActionRegisterTypes,
} from "./userActionTypes";

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionLoginTypes.USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case userActionLoginTypes.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case userActionLoginTypes.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case userActionLoginTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionRegisterTypes.USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case userActionRegisterTypes.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case userActionRegisterTypes.USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case userActionRegisterTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export { userLoginReducer, userRegisterReducer };
