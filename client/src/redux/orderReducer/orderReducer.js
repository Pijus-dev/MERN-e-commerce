import {
  orderActionTypes,
  orderActionDetailsTypes,
  orderActionPayTypes,
  orderActionMyOrderTypes,
  orderActionGetTypes,
  orderActionDeliverTypes,
} from "./orderActionTypes";

const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case orderActionTypes.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case orderActionTypes.ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case orderActionDetailsTypes.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderActionDetailsTypes.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case orderActionDetailsTypes.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case orderActionPayTypes.ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case orderActionPayTypes.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case orderActionPayTypes.ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderActionPayTypes.ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};
const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderActionMyOrderTypes.ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case orderActionMyOrderTypes.ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case orderActionMyOrderTypes.ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case orderActionMyOrderTypes.ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

const ordersListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderActionGetTypes.ORDER_GET_REQUEST:
      return {
        loading: true,
      };
    case orderActionGetTypes.ORDER_GET_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case orderActionGetTypes.ORDER_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case orderActionMyOrderTypes.ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case orderActionDeliverTypes.ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case orderActionDeliverTypes.ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case orderActionDeliverTypes.ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderActionDeliverTypes.ORDER_DELIVER_RESET:
      return {};

    default:
      return state;
  }
};
export {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  ordersListReducer,
  orderDeliverReducer,
};
