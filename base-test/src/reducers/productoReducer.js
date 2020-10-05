const initialState = [
    {
      id: "asdf1",
      descripcion: 'producto 1',
    },
    {
      id: "asdf2",
      descripcion: 'producto 2',
    },
    {
      id: "asdf3",
      descripcion: 'producto 3',
    },
    {
      id: "asdf4",
      descripcion: 'producto 4',
    }
  ]
  
  const productReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'NUEVO_PRODUCTO':
        return [...state, action.data]
      case 'ELIMINAR_PRODUCTO':
        return state
      case 'EDITAR_PRODUCTO':
        return state
      default: 
        return state
    }
  }

  export default productReducer;