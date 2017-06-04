import './post-list.view.css';

import React from 'react';

import PostView from '../post/post.view';


function PostListView(props) {

  const { posts } = props;

  const postList = posts.map(

    post => <li key={post.uuid} 
                className="PostListView-item flex-item">
              <PostView post={post} />
            </li>
  );

  return (
    <div className="PostListView">
      <ul className="PostListView-list flex-container">
        {postList}
      </ul>
    </div>
  );
}

export default PostListView;
