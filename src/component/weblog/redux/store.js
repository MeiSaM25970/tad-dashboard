import { createStore } from "redux";
import { removeItemsReducer } from "./reducer";
export const itemsStore = createStore(removeItemsReducer);
