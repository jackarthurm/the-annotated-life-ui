import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { MainView } from './views/main';
import { PostDetailView } from './views/post-detail';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/posts/:postID'>
          <PostDetailView />
        </Route>
        <Route exact path='/posts'>
          <MainView />
        </Route>
        <Route path='/'>
          <Redirect to='/posts/' />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
