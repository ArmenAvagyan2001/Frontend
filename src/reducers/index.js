import { combineReducers } from "redux";
import  itemsReducers  from "./site_reducers"

export default combineReducers({
    items: itemsReducers,
})