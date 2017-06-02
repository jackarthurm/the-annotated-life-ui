import React from 'react';
import logo from '../../logo.svg';
import './post-list.view.css';

import PostView from '../post/post.view';


function PostListView(props) {

  const { posts } = props;

  const postList = posts.map(

    post => <li key={post.uuid}><PostView post={post}/></li>
  );

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to The Annotated Life</h2>
      </div>
      <ul>
        {postList}
      </ul>
    </div>
  );
}

export default PostListView;
