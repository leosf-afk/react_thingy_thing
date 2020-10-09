import api from "../services/api";

export const agregarProducto = (data) => {
    return dispatch => {
      dispatch({
        type: "NUEVO_PRODUCTO",
        data: data.producto
      })
    }
  }
  
export const editarProducto = (data) => {
    return dispatch => {
      dispatch({
        type: "EDITAR_PRODUCTO",
        data: data.producto
      })
    }
  }
  
export const eliminarProducto = (id_producto) => {
    return dispatch => {
      dispatch({
        type: "ELIMINAR_PRODUCTO",
        id: id_producto
      })
    }
  }  

  export const getAllProductos = (dispatch) => {
    return async dispatch => {
        const res = await api.get("/productos")
        console.log("DATA", res.data)
      
        dispatch({
        type: "GET_ALL_PRODUCTOS",
        payload: {
          isFetching: false,
          data: res.data,
        },
      });
    }
  };
