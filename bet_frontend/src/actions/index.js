import {GET_MATCHES,ADD_MATCHES} from "./types";
import api from "../services/api";

export const addMatch = ( equipos ) => async (dispatch) => {
  console.log("API post")
  console.log(equipos)
  const res = await api.post('/matches',  equipos);

    dispatch({
        type: ADD_MATCHES,
        payload: res.data,
    });
};

export const getMatches = () => async (dispatch) => {
    const res = await api.get("/matches");
    console.log(res)
    
    dispatch({
      type: GET_MATCHES,
      payload: {
        isFetching: false,
        matches: res.data,
      },
    });
  };