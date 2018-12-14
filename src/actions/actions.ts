import * as types from './actionTypes';
import axios from 'axios';


function requestData() {
  // console.log('dispatched');
	return {type: types.REQ_DATA}
};

function receiveData(json) {
	return {
    data: json.posts,
		type: types.RECV_DATA
	}
};

function receiveError(json) {
	return {
    data: json,
		type: types.RECV_ERROR
	}
};


function getJson(url) {

  // console.log('called');

  return dispatch => {

    dispatch(requestData());

    return axios.get(
      url, 
      {responseType: 'json'}
    ).then(res => {

      dispatch(receiveData(res.data));
    }).catch(res => {

      dispatch(receiveError(res.data));
    });
  }
}

export { getJson };
