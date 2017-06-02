import * as types from './actionTypes';
import axios from 'axios';

function requestData() {
  console.log('dispatched');
	return {type: types.REQ_DATA}
};

function receiveData(json) {
	return{
		type: types.RECV_DATA,
		data: json.posts
	}
};

function receiveError(json) {
	return {
		type: types.RECV_ERROR,
		data: json
	}
};


function getJson(url) {

  console.log('called');

  return dispatch => {

    dispatch(requestData());

    return axios.get(url, 
                     {responseType: 'json'})
                .then(res => {
                  dispatch(receiveData(res.data));
                })
                .catch(res => {
                  dispatch(receiveError(res.data));
                });
  }
}

export { getJson };
