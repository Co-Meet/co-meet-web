import React, {useState, useCallback, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {useMutation} from 'react-query';
import Cookies from 'universal-cookie';
import {Nickname} from '../../types/member';
import {Form, Input, Button} from 'antd';
import {LoginContext} from '../../contexts/LoginContext';
import {login} from '../../api/member';

const cookies = new Cookies();

function Login() {
  const {setIsLogin} = useContext(LoginContext);
  const history = useHistory();
  const mutationLogin = useMutation((user: Nickname) => login(user));

  const [member, setMember] = useState({nickname: '', githubId: ''});
  const [errorMsg, setErrorMsg] = useState('');

  const _handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setMember({...member, [e.target.name]: e.target.value});
    },
    [member],
  );

  const setToken = useCallback((data: any): void => {
    const accessToken = data.accessToken;
    cookies.set('access_token', accessToken, {});
  }, []);

  const _handleSubmit = useCallback((): void => {
    mutationLogin
      .mutateAsync(member)
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
  }, [mutationLogin, setIsLogin, setToken, member]);

  return (
    <div>
      <Form onFinish={_handleSubmit} autoComplete="off">
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
          <Input name="nickname" value={member.nickname} onChange={_handleChange} size="large" />
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
