import {
  userActionLoginTypes,
  userActionRegisterTypes,
  userActionDetailsTypes,
  userActionUpdateTypes,
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

const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userActionDetailsTypes.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userActionDetailsTypes.USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case userActionDetailsTypes.USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionUpdateTypes.USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userActionUpdateTypes.USER_UPDATE_SUCCESS:
      return {
        success: true,
        loading: false,
        userInfo: action.payload,
      };
    case userActionUpdateTypes.USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case userActionUpdateTypes.USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
};
