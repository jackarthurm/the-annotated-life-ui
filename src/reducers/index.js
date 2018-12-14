import { combineReducers } from 'redux';

import * as types from '../actions/actionTypes';


const initialState = {
  error: false,
  isLoading: false,
  page: 1,
  visiblePosts: []
};

function postsReducer(state = initialState,
                      action = null) {

  switch(action.type) {

    case types.RECV_ERROR:

      return Object.assign(
        {}, 
        state, 
        {
          error: true,
          isLoading: false
        }
      );

		case types.RECV_DATA:
      // console.log('recv_data');
			return Object.assign(
        {}, 
        state, 
        {
          error: false,
          isLoading: false, 
          visiblePosts: action.data
        }
      );

		case types.REQ_DATA:
			return Object.assign(
        {}, 
        state, 
        {
          error: false,
          isLoading: true
        }
      );

    default:
      return state;
  }
}

const rootReducer = combineReducers({
	posts: postsReducer
});

export default rootReducer;
