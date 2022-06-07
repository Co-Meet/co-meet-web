import React, {useState, createContext, useEffect} from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

interface LoginProps {
  children: JSX.Element;
}

const LoginContext = createContext({
  isLogin: false,
  setIsLogin: (login: boolean) => {
    return;
  },
});

const LoginProvider: React.FC<LoginProps> = ({children}) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (cookies.get('access_token')) {
      setIsLogin(true);
    }
  });

  return <LoginContext.Provider value={{isLogin, setIsLogin}}>{children}</LoginContext.Provider>;
};

export {LoginContext, LoginProvider};
