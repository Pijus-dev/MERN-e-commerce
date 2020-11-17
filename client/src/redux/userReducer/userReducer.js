import {
  userActionLoginTypes,
  userActionRegisterTypes,
  userActionDetailsTypes,
  userActionUpdateTypes,
  userActionListTypes,
  userActionDeleteTypes
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
    case userActionDetailsTypes.USER_DETAILS_RESET:
      return { user: {} };
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

const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userActionListTypes.USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case userActionListTypes.USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case userActionListTypes.USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case userActionListTypes.USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

const userDeleteReducer = (state = { }, action) => {
  switch (action.type) {
    case userActionDeleteTypes.USER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case userActionDeleteTypes.USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case userActionDeleteTypes.USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer
};
