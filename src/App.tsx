import React, {useContext, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {HOME_PAGE, JOIN_PAGE, LOGIN_PAGE, MAIN_PAGE, NOT_FOUND_PAGE} from './consts/route';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Join from './pages/Join/Join';
import Main from './pages/Main/Main';
import {LoginContext} from './contexts/LoginContext';
import Cookies from 'universal-cookie';
import {QueryClient, QueryClientProvider} from 'react-query';

const cookies = new Cookies();
const queryClient = new QueryClient();

const App = () => {
  const {isLogin, setIsLogin} = useContext(LoginContext);

  useEffect(() => {
    if (cookies.get('access_token')) {
      setIsLogin(true);
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route exact path={HOME_PAGE} component={isLogin === true ? Main : Home} />
        <Route path={LOGIN_PAGE} component={isLogin === true ? Login : Home} />
        <Route path={JOIN_PAGE} component={isLogin === true ? Join : Home} />
        <Route path={MAIN_PAGE} component={isLogin === true ? Main : Home} />
        <Redirect to={NOT_FOUND_PAGE} />
      </Switch>
    </QueryClientProvider>
  );
};

export default App;
