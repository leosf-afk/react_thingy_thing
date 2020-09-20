import {
  GET_MATCHES,
  ADD_MATCHES,
  GENERATE_TICKET,
  GET_TICKETS
} from "./types";
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

export const generateTicket = ( data ) => async (dispatch) => {
  console.log("API post")
  console.log(data)
  const res = await api.post('/tickets/generate',  data).catch(e => console.log(e));
  console.log(res)
  
  if(res){
    dispatch({
       type: GENERATE_TICKET,
        payload: res.data,
    });
  }
};

export const getTickets = () => async (dispatch) => {
    const res = await api.get("/tickets");
    console.log(res)
    
    dispatch({
      type: GET_TICKETS,
      payload: {
        isFetching: false,
        matches: res.data,
      },
    });
  };