import React from "react";

export default (state, action) => {
  switch (action.type) {
    case "ADD_ITEM_IN_CART":
      return {
        ...state,
        cart: [action.payload, ...state.cart],
      };
    case "REMOVE_ITEM_IN_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "ADD_ITEM_IN_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case "REMOVE_ITEM_IN_ORDER":
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order.orderId !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
