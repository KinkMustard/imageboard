import axios from "axios";
import { FETCH_POSTS } from "./types";

export const fetchPosts = () => async (dispatch) => {
  const res = await axios.get("/");

  dispatch({ type: FETCH_POSTS, payload: res.data });
};
