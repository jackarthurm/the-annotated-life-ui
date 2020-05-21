import React from 'react';
import { TitleView } from './title';
import styled from 'styled-components';
import { PostSummaryListView } from './post-summary-list';

export function MainView() {
  return (
    <Main>
      <TitleView />
      <PostSummaryListView />
    </Main>
  );
}

const Main = styled.div`
  text-align: center;
  margin: 1%;
`;
