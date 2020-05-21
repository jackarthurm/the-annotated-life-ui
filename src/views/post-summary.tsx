import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { IPost } from '../models/models';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

dayjs.extend(relativeTime);

const DATE_INVALID: string = '';

interface IProps {
  post: IPost;
}

export function PostSummaryView(props: IProps) {
  const { post } = props;

  let published: Dayjs = dayjs(post.pubDate);
  let publishedFromNow: string;

  if (published.isValid()) {
    publishedFromNow = published.fromNow();
  } else {
    publishedFromNow = DATE_INVALID;
  }

  return (
    <PostSummary>
      <PostSummaryHeader>
        <Link to={`/posts/${post.uuid}/`}>
          <PostSummaryTitle>{post.title}</PostSummaryTitle>
        </Link>
        <PostSummaryDate>{publishedFromNow}</PostSummaryDate>
      </PostSummaryHeader>
      <PostSummaryBody>{post.body}</PostSummaryBody>
      <PostSummaryFooter>{post.footer}</PostSummaryFooter>
    </PostSummary>
  );
}

const PostSummary = styled.div`
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

const PostSummaryHeader = styled.div`
  font-family: 'Alegreya SC', serif;
`;

const PostSummaryBody = styled.p`
  font-family: 'Alegreya', serif;
  padding-bottom: auto;
`;

const PostSummaryDate = styled.p`
  font-size: small;
  margin-top: 0;
`;

const PostSummaryFooter = styled.div`
  vertical-align: bottom;
  font-family: 'Alegreya SC', serif;
  font-size: small;
  margin-top: auto;
`;

const PostSummaryTitle = styled.h2`
  font-weight: 400;
  margin-bottom: 0;
`;
