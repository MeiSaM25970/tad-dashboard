import { LOGIN, LOGOUT } from "./actions";
export function loginReducer(state = [], action) {
  switch (action.type) {
    case LOGIN:
      return [...state, action.payload];
    case LOGOUT:
      return [...state, action.payload];
    default:
      return state;
  }
}
