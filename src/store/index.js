import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import apiMiddleware from "../middleware/api";

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));
// const store = createStore(rootReducer, applyMiddleware(withExtraArgument(api)));
// window.store = store;
export default store;
