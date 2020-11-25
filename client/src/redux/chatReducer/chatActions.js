import { chatActionTypes } from "./chatActionTypes";
import axios from "axios";

export const userMessage = (message) => async (dispatch) => {
  try {
    dispatch({
      type: chatActionTypes.INPUT_SUCCESS,
      payload: message,
    });
  } catch (error) {
    dispatch({
      type: chatActionTypes.INPUT_FAIL,
    });
  }
};

export const createSession = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/watson/session");
    dispatch({
      type: chatActionTypes.SESSION_SUCCESS,
      payload: data["session_id"],
    });
    const res = await axios.post(
      "/api/watson/message",
      {},
      {
        headers: {
          session_id: data["session_id"],
        },
      }
    );
    dispatch({
      type: chatActionTypes.MESSAGE_SUCCESS,
      payload: res.data.output.generic[0].text,
    });
  } catch (error) {
    dispatch({
      type: chatActionTypes.SESSION_FAIL,
    });
  }
};

export const sendMessage = (message) => async (dispatch) => {
  try {
    const body = {
      input: message,
    };
    const { data } = await axios.post("/api/watson/message", body);
    dispatch({
      type: chatActionTypes.MESSAGE_SUCCESS,
      payload: data.output.generic[0].text,
    });
  } catch (e) {
    dispatch({
      type: chatActionTypes.MESSAGE_FAIL,
      payload: e.message,
    });
  }
};
