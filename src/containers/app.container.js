import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadingView from '../view/loading/loading.view';
import MainView from '../view/main/main.view';
import { getJson } from '../actions/actions';

import { Route } from 'react-router-dom'


function mapStateToProps(state) {
  return {
    isLoading: state.posts.isLoading,
    visiblePosts: state.posts.visiblePosts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: url => dispatch(getJson(url))
  };
}

class AppContainer extends Component {

  componentDidMount() {

    this.props.fetchPosts('http://localhost:8000/posts/');
  }

  render() {

    const { isLoading, visiblePosts } = this.props;

    return (
      <div className="AppContainer">
        <Route path="/">
          {isLoading ? <LoadingView /> : <MainView posts={visiblePosts} />}
        </Route>
      </div>
    );
  }
}

export default connect(mapStateToProps, 
                       mapDispatchToProps)(AppContainer);