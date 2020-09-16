import {GET_MATCHES,ADD_MATCHES} from "./types";
import api from "../services/api";

export const addMatch = ({ equipos }) => async (dispatch) => {
    const res = await api.post('matches/add', { equipos });

    dispatch({
        type: ADD_MATCHES,
        payload: res.data.data,
    });
};

export const getMatches = () => async (dispatch) => {
    const res = await api.get("matches");
  
    dispatch({
      type: GET_MATCHES,
      payload: {
        isFetching: false,
        videos: res.data.data,
      },
    });
  };