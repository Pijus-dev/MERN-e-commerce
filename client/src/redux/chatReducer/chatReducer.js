import { chatActionTypes } from "./chatActionTypes";

export const chatReducer = (state = { messages: [] }, action) => {
  let { messages } = state;
  switch (action.type) {
    case chatActionTypes.INPUT_SUCCESS:
      messages = [...messages, { message: action.payload, type: "user" }];
      return {
        ...state,
        messages,
      };
    case chatActionTypes.INPUT_FAIL:
      return {
        ...state,
      };
    case chatActionTypes.SESSION_SUCCESS:
      localStorage.setItem("session", action.payload);
      return state;
    case chatActionTypes.SESSION_FAIL:
      return {
        ...state,
      };
    case chatActionTypes.MESSAGE_SUCCESS:
      messages = [...messages, { message: action.payload, type: "bot" }];
      return {
        ...state,
        messages, 
      };
    case chatActionTypes.MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
