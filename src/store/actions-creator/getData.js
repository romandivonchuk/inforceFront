
import service from '../../service/service';

export const fetchData = () => {
  return async (dispatch) => {
    try {
      dispatch({type: 'FETCH_DATA'});
      const data = await service.getAllProducts();
      dispatch({type: 'FETCH_DATA_SUCCESS', payload: data});
    } catch (error) {
      dispatch({type: 'FETCH_DATA_ERROR'});
    }
  }
}