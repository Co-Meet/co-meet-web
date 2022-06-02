import React, {useState, useCallback, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {useMutation} from 'react-query';
import {Member} from '../../types/member';
import {Form, Input, Button, notification} from 'antd';
import {checkGithubId, checkNickname, join} from '../../api/member';

function Join() {
  const history = useHistory();
  const mutationCheckNickname = useMutation((email: string) => checkNickname(email));
  const mutationCheckGithubId = useMutation((githubId: string) => checkGithubId(githubId));
  const mutationJoin = useMutation((user: Member) => join(user));

  const [user, setUser] = useState({nickname: '', githubId: ''});
  const [errorMsg, setErrorMessage] = useState('');
  const [canJoin, setCanJoin] = useState(false);

  const _handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setUser({...user, [e.target.name]: e.target.value});
    },
    [user],
  );

  const _checkNickname = useCallback((): void => {
    if (!user.nickname) {
      notification.open({
        message: '닉네임을 입력해주세요',
      });
    } else {
      mutationCheckNickname
        .mutateAsync(user.nickname)
        .then(() => {
          notification.open({
            message: '닉네임 인증이 완료되었습니다',
          });
          setCanJoin(true);
        })
        .catch(err => {
          if (err.message.includes('404')) {
            notification.open({
              message: '이미 존재하는 닉네임 입니다',
            });
          } else {
            notification.open({
              message: '예기치 못한 서버 에러가 발생했습니다.',
            });
          }
        });
    }
  }, [mutationCheckNickname, user.nickname]);

  const _checkGithubId = useCallback((): void => {
    if (!user.githubId) {
      notification.open({
        message: '깃허브 아이디를 입력해주세요',
      });
    } else {
      mutationCheckGithubId
        .mutateAsync(user.githubId)
        .then(() => {
          notification.open({
            message: '깃허브 아이디 인증이 완료되었습니다',
          });
          setCanJoin(true);
        })
        .catch(err => {
          if (err.message.includes('404')) {
            notification.open({
              message: '존재하지 않는 깃허브 아이디입니다.',
            });
          } else {
            notification.open({
              message: '예기치 않은 서버에러가 발생했습니다.',
            });
          }
        });
    }
  }, [mutationCheckNickname, user.githubId]);

  const _handleSubmit = useCallback((): void => {
    if (canJoin) {
      mutationJoin
        .mutateAsync(user)
        .then(() => {
          notification.open({
            message: '회원가입에 성공했습니다',
            description: '로그인을 진행해주세요',
          });
          history.push('/login');
        })
        .catch(() => {
          notification.open({
            message: '회원가입에 실패했습니다',
            description: '다시 시도해주세요',
          });
        });
    } else if (!canJoin) {
      setErrorMessage('인증을 완료해주세요');
    }
  }, [canJoin, mutationJoin, history, user]);

  return (
    <div>
      <Form onFinish={_handleSubmit} autoComplete="off">
        <Button type="link" onClick={_checkNickname} disabled={mutationCheckNickname.isLoading}>
          닉네임 중복 확인
        </Button>
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
          <Input name="nickname" value={user.nickname} onChange={_handleChange} size="large" />
        </Form.Item>
        <Button type="link" onClick={_checkGithubId} disabled={mutationCheckGithubId.isLoading}>
          깃허브 아이디 존재 확인
        </Button>
        <Form.Item
          label="깃허브 아이디"
          name="githubId"
          rules={[
            {required: true, message: '깃허브 아이디를 입력해주세요'},
            {
              type: 'string',
              message: '깃허브 아이디을 입력해주세요.',
            },
          ]}
        >
          <Input name="githubId" value={user.githubId} onChange={_handleChange} size="large" />
        </Form.Item>
        <p>{errorMsg}</p>
        <Form.Item>
          <div>
            <Button
              type="link"
              size="large"
              onClick={() => history.push('/login')}
              disabled={mutationJoin.isLoading}
            >
              로그인하기
            </Button>
            <Button type="primary" htmlType="submit" size="large" disabled={mutationJoin.isLoading}>
              회원가입
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Join;
