
import service from '../../service/service';

const deleteData = (id) => {
  return async (dispatch) => {
    try {
      const data = await service.deleteById(id);
      dispatch({type: 'RELOAD', payload: true});
    } catch (error) {
      dispatch({type: 'FETCH_DATA_ERROR'});
    }
  }
}
export default deleteData;