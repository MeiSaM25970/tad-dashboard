import { createStore } from "redux";
import { removeProductReducer } from "./reducer";
export const productStore = createStore(removeProductReducer);
