import groups from "./groups.jsx";
import historyReducer from "./historyReducer.jsx";
import headerContent from "./headerContent.jsx";
import cashAcceptorConnection from "./cashAcceptorConnection";
import { combineReducers } from "redux";

const index = combineReducers({
  groups, 
  historyReducer,
  headerContent,
  cashAcceptorConnection
});

export default index;
