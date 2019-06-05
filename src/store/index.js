import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import apiMiddleware from "../middleware/api";

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));
window.store = store;
export default store;
