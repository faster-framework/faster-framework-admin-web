import { Redirect, Route } from 'umi';
import React from 'react';
import Permission from '../Permission';

const AuthorizedRoute = ({ component: Component, render, authority, redirectPath, ...rest }) => (
  <Permission
    authority={authority}
    noMatch={
      <Route
        {...rest}
        render={() => (
          <Redirect
            to={{
              pathname: redirectPath,
            }}
          />
        )}
      />
    }
  >
    <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
  </Permission>
);

export default AuthorizedRoute;
