import { createStore } from "redux";
import { switchSideBarReducer } from "./reducer";
export const switchSidebarStore = createStore(switchSideBarReducer);
