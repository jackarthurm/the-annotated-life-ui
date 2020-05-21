import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PostService } from '../services/posts-service';
import { useParams } from 'react-router-dom';
import { IPost } from '../models/models';
import dayjs, { Dayjs } from 'dayjs';
import { LoadingView } from './loading';

export function PostDetailView() {
  const { postID } = useParams();
  const [post, setPost] = useState<IPost | undefined>();

  useEffect(() => {
    (async function getPostDetail() {
      const post: IPost = await PostService.getPostDetail(postID);
      setPost(post);
    })();
  }, [postID]);

  if (post === undefined) {
    return <LoadingView />;
  }

  let published: Dayjs = dayjs(post.pubDate);
  let publishedFromNow: string;

  if (published.isValid()) {
    publishedFromNow = published.fromNow();
  } else {
    publishedFromNow = '';
  }

  return (
    <PostDetail>
      <PostDetailHeader>
        <PostDetailTitle>{post.title}</PostDetailTitle>
        <PostDetailDate>{publishedFromNow}</PostDetailDate>
      </PostDetailHeader>
      <PostDetailBody>
        <p>{post.body}</p>
      </PostDetailBody>
      <PostDetailFooter>
        <p>{post.footer}</p>
      </PostDetailFooter>
    </PostDetail>
  );
}

const PostDetail = styled.div`
  width: 100%;
  height: 100%;
  border-bottom-style: hidden;
  border-top-style: hidden;
  border-left-style: solid;
  border-right-style: solid;
  border-color: #35322a;
  border-width: 2px;
  border-radius: 3%;
  padding: 0.1%;
`;

const PostDetailHeader = styled.div`
  font-family: 'Alegreya SC', serif;
`;

const PostDetailBody = styled.p`
  font-family: 'Alegreya', serif;
  padding-bottom: auto;
`;

const PostDetailDate = styled.p`
  font-size: small;
  margin-top: 0;
`;

const PostDetailFooter = styled.div`
  vertical-align: bottom;
  font-family: 'Alegreya SC', serif;
  font-size: small;
  margin-top: auto;
`;

const PostDetailTitle = styled.h2`
  font-weight: 400;
  margin-bottom: 0;
`;
