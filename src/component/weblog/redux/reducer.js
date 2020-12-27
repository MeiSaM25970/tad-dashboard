import { REMOVE_ITEMS } from "./actions";
export function removeItemsReducer(state = [], action) {
  switch (action.type) {
    case REMOVE_ITEMS:
      return [...state, action.payload];

    default:
      return state;
  }
}
