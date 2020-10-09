const initialState = {
  isFetching: true, 
  data: []
}
  
  const productReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'NUEVO_PRODUCTO':
        return [...state, action.data]
      case 'ELIMINAR_PRODUCTO':
        return state
      case 'EDITAR_PRODUCTO':
          return action.payload
      case 'GET_ALL_PRODUCTOS':
          return action.payload
      default: 
        return state
    }
  }

  export default productReducer;