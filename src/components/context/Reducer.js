export const cartReducer = (state, action) => {
  // console.log("current_state",state);
  // console.log("action",action);
  
  
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id), //change the expression c.id
      };
    default:
      return state;
  }
};
