import { combineReducers } from "redux";

import parkSearchInfoReducer from "./ParkSearchInfo/ParkSearchInfo.slice";
import parkDetailsReducer from "./ParkDetails/ParkDetails.slice";
import userReducer from "./User/User.slice";

const rootReducer = combineReducers({
  parkSearchInfo: parkSearchInfoReducer,
  parkDetails: parkDetailsReducer,
  user: userReducer,
});

export default rootReducer;
