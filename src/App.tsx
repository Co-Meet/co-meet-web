import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {HOME_PAGE, JOIN_PAGE, LOGIN_PAGE, NOT_FOUND_PAGE} from './consts/route';
import Home from './pages/Home/Home';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path={HOME_PAGE} component={Home} />
        <Route path={LOGIN_PAGE} component={Home} />
        <Route path={JOIN_PAGE} component={Home} />
        <Redirect to={NOT_FOUND_PAGE} />
      </Switch>
    </>
  );
};

export default App;
