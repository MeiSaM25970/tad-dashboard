import { MINI_SIDEBAR } from "./actions";
export function switchSideBarReducer(state = [{ miniSidebar: false }], action) {
  switch (action.type) {
    case MINI_SIDEBAR:
      return [...state, action.payload];

    default:
      return state;
  }
}
