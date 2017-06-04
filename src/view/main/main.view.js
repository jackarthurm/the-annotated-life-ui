import './main.view.css';

import React from 'react';

import PostListView from '../post-list/post-list.view';
import TitleView from '../title/title.view';


function MainView(props) {

  const { posts } = props;

  return (
    <div className="MainView">
      <TitleView className="Main-View-title" />
      <PostListView className="MainView-post-list" 
                    posts={posts} />
    </div>
  );
}

export default MainView;