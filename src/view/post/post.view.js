import './post.view.css';

import React from 'react';
import moment from 'moment/moment';


const DATE_FORMAT = "dddd, MMMM Do YYYY, h:mm a";
const DATE_INVALID = ''


function PostView(props) {

  const {title, body, pub_date} = props.post;

  let published = moment(pub_date);

  if (published.isValid()) {
    published = published.fromNow();
  }
  else {
    published = DATE_INVALID
  }

  return (
    <div className="Post">
      <div className='Post-header'>
        <h2 className="Post-title">{title}</h2>
        <p className="Post-date">{published}</p>
      </div>
      <div className='Post-body'>
        <p className="Post-snippet">{body}</p>
      </div>
      <div className='Post-footer'>
        <p>Footer?</p>
      </div>
    </div>
  );
}

export default PostView;