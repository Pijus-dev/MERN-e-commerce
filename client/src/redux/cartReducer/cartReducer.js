import { cartActionTypes } from "./cartActionTypes";

const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case cartActionTypes.ADD_ITEM_TO_CART:
      const itemToAdd = action.payload;

      const existItem = state.cartItems.find(
        (item) => item.product === itemToAdd.product
      );

      if (existItem && existItem.sizes === itemToAdd.sizes) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === existItem.product ? itemToAdd : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, itemToAdd],
        };
      }
    case cartActionTypes.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    case cartActionTypes.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case cartActionTypes.SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case cartActionTypes.RESET_PAYMENT_METHOD:
      return {
        paymentMethod: "",
      };
    default:
      return state;
  }
};

export default cartReducer;
