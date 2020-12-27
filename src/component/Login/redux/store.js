import { createStore } from "redux";
import { loginReducer } from "./reducer";
export const loginUserStore = createStore(loginReducer);
