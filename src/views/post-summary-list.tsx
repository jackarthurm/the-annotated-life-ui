import React, { useState, useEffect } from 'react';
import { PostSummaryView } from './post-summary';
import { IPostSummary, IPostSummaryList } from '../models/models';
import { PostService } from '../services/posts-service';
import { LoadingView } from './loading';
import styled from 'styled-components';

export function PostSummaryListView() {
  const [posts, setPosts] = useState<Array<IPostSummary> | undefined>();

  useEffect(() => {
    (async function getPostList() {
      const p: IPostSummaryList = await PostService.getPostSummaryList();
      setPosts(p.posts);
    })();
  }, []);

  if (posts === undefined) {
    return <LoadingView />;
  }

  const postList = posts.map((post: IPostSummary) => (
    <Item key={post.uuid}>
      <PostSummaryView post={post} />
    </Item>
  ));

  return (
    <div className='PostSummaryList'>
      <List className='flex-container'>{postList}</List>
    </div>
  );
}

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const Item = styled.li`
  padding: 5px;
  width: 300px;
  height: 200px;
  padding: 1%;
`;
