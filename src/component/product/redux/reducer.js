import { ADD_PRODUCT, EDIT_PRODUCT, REMOVE_PRODUCT } from "./actions";
export function removeProductReducer(state = [], action) {
  switch (action.type) {
    case REMOVE_PRODUCT:
      return [...state, action.payload];
    case ADD_PRODUCT:
      return [...state, action.payload];
    case EDIT_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
}
