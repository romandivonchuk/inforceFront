
const initialState = {
  loading: true,
  data: [],
  error: false,
  showModalNewItem: false,
  reload: true
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      return {...state,  loading: true}
    case 'FETCH_DATA_SUCCESS':
      return {...state, loading: false, data: action.payload}
    case 'FETCH_DATA_ERROR':
      return {...state, loading: false, error: action.payload }
    case 'SHOW_MODAL':
      return {...state, showModalNewItem: !state.showModalNewItem }
    case 'RELOAD':
      return {...state, reload: action.payload }
    case 'DELETE_COMMENTS':
      return {...state, data: [...state.data.map(item => {
        if (item._id === action.payload.productId) {
          const idx = item.comments.findIndex(({id}) => id === action.payload.idComment)
          const newItem = {...item, comments: [...item.comments.slice(0,idx), ...item.comments.slice(idx+1)]}
          return newItem
        }
        return item
      })]}
    default:
      return state
  }
}