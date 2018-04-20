import { combineReducers } from "redux";
// import { reducer as reduxForm } from "redux-form";
import postsReducer from "./postsReducer";

export default combineReducers({
  posts: postsReducer
});
