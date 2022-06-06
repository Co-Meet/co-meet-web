import React from 'react';
import ReactDOM from 'react-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import {LoginProvider} from './contexts/LoginContext';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <LoginProvider>
        <App />
      </LoginProvider>
    </Router>
  </QueryClientProvider>,
  document.getElementById('app'),
);
