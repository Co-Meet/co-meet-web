import React, {useState, createContext} from 'react';

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

  return <LoginContext.Provider value={{isLogin, setIsLogin}}>{children}</LoginContext.Provider>;
};

export {LoginContext, LoginProvider};
