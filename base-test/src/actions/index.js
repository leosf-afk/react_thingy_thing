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

