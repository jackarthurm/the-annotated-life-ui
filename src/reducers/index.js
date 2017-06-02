import { combineReducers } from 'redux';

import * as types from '../actions/actionTypes';


const initialState = {
  isLoading: false,
  page: 1,
  visiblePosts: [],
  error: false
};

function postsReducer(state = initialState,
                      action = null) {

  switch(action.type) {

    case types.RECV_ERROR:

      return Object.assign({}, 
                           state, 
                           {isLoading: false,
                            error: true}
      );

		case types.RECV_DATA:
      console.log('recv_data');
			return Object.assign({}, 
                           state, 
                           {isLoading: false, 
                            visiblePosts: action.data, 
                            error: false}
      );

		case types.REQ_DATA:
			return Object.assign({}, 
                           state, 
                           {isLoading: true, 
                            error: false}
      );

    default:
      return state;
  }
}

const rootReducer = combineReducers({
	posts: postsReducer
});

export default rootReducer;