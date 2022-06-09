import React, {useContext, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {
  HOME_PAGE,
  JOIN_PAGE,
  LOGIN_PAGE,
  MAIN_PAGE,
  NOT_FOUND_PAGE,
  ORGANIZATION_DETAIL_PAGE,
} from './consts/route';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Join from './pages/Join/Join';
import Main from './pages/Main/Main';
import {LoginContext} from './contexts/LoginContext';
import {QueryClient, QueryClientProvider} from 'react-query';
import OrganizationDetail from './pages/OrganizationDetail/OrganizationDetail';

const queryClient = new QueryClient();

const App = () => {
  const {isLogin} = useContext(LoginContext);

  return (
    <QueryClientProvider client={queryClient}>
      {isLogin ? <Redirect to={MAIN_PAGE} /> : <Redirect to={HOME_PAGE} />}
      <Switch>
        <Route exact path={HOME_PAGE} component={Home} />
        <Route path={LOGIN_PAGE} component={Login} />
        <Route path={JOIN_PAGE} component={Join} />
        <Route path={MAIN_PAGE} component={Main} />
        <Route path={ORGANIZATION_DETAIL_PAGE} component={OrganizationDetail} />
        <Redirect to={NOT_FOUND_PAGE} />
      </Switch>
    </QueryClientProvider>
  );
};

export default App;
