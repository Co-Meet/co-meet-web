import React, {useState, useCallback, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {useMutation} from 'react-query';
import Cookies from 'universal-cookie';
import {Form, Input, Button} from 'antd';
import {LoginContext} from '../../contexts/LoginContext';
import {login} from '../../api/member';
import {LoginRequestData} from '../../types/dto/member';

const cookies = new Cookies();

function Login() {
  const {setIsLogin} = useContext(LoginContext);
  const history = useHistory();
  const mutationLogin = useMutation((loginRequestData: LoginRequestData) =>
    login(loginRequestData),
  );

  const [loginRequestData, setLoginRequestData] = useState({nickname: ''});
  const [errorMsg, setErrorMsg] = useState('');

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setLoginRequestData({...loginRequestData, [e.target.name]: e.target.value});
    },
    [loginRequestData],
  );

  const setToken = useCallback((data: any): void => {
    const accessToken = data.accessToken;
    cookies.set('access_token', accessToken, {});
  }, []);

  const handleLogin = useCallback((): void => {
    mutationLogin
      .mutateAsync(loginRequestData)
      .then(res => {
        if (res) {
          setIsLogin(true);
          setToken(res);
          history.push('/main');
        }
      })
      .catch(() => {
        setErrorMsg('로그인에 실패했습니다');
      });
  }, [mutationLogin, setIsLogin, setToken, loginRequestData]);

  return (
    <div>
      <Form onFinish={handleLogin} autoComplete="off">
        <Form.Item
          label="닉네임"
          name="nickname"
          rules={[
            {required: true, message: '닉네임을 입력해주세요'},
            {
              type: 'string',
              message: '닉네임을 입력해주세요.',
            },
          ]}
        >
          <Input
            name="nickname"
            value={loginRequestData.nickname}
            onChange={handleOnChange}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <p>{errorMsg}</p>
          <div>
            <Button
              type="link"
              size="large"
              onClick={() => {
                history.push('/join');
              }}
              disabled={mutationLogin.isLoading}
            >
              회원가입
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              disabled={mutationLogin.isLoading}
            >
              로그인
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
