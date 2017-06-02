import React from 'react';

function PostView(props) {

  const post = props.post;

  return (
    <div className="Post">
      <h1 className="Post-title">{post.title}</h1>
      <p className="Post-body">{post.body}</p>
    </div>
  );
}

export default PostView;