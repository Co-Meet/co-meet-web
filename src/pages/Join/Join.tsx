import React, {useState, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {useMutation} from 'react-query';
import {Form, Input, Button, notification} from 'antd';
import {checkGithubId, checkNickname, join} from '../../api/member';
import {JoinRequestData} from '../../types/dto/member';

function Join() {
  const history = useHistory();
  const mutationCheckNickname = useMutation((email: string) => checkNickname(email));
  const mutationCheckGithubId = useMutation((githubId: string) => checkGithubId(githubId));
  const mutationJoin = useMutation((joinRequestData: JoinRequestData) => join(joinRequestData));

  const [joinRequestData, setJoinRequestData] = useState({nickname: '', githubId: ''});
  const [errorMsg, setErrorMessage] = useState('');
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);
  const [isCheckedGithubId, setIsCheckedGithubId] = useState(false);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setJoinRequestData({...joinRequestData, [e.target.name]: e.target.value});
    },
    [joinRequestData],
  );

  const handleCheckNickname = useCallback((): void => {
    if (!joinRequestData.nickname) {
      notification.open({
        message: '닉네임을 입력해주세요',
      });
    } else {
      mutationCheckNickname
        .mutateAsync(joinRequestData.nickname)
        .then(() => {
          notification.open({
            message: '닉네임 인증이 완료되었습니다',
          });
          setIsCheckedNickname(true);
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
  }, [mutationCheckNickname, joinRequestData.nickname]);

  const handleCheckGithubId = useCallback((): void => {
    if (!joinRequestData.githubId) {
      notification.open({
        message: '깃허브 아이디를 입력해주세요',
      });
    } else {
      mutationCheckGithubId
        .mutateAsync(joinRequestData.githubId)
        .then(() => {
          notification.open({
            message: '깃허브 아이디 인증이 완료되었습니다',
          });
          setIsCheckedGithubId(true);
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
  }, [mutationCheckNickname, joinRequestData.githubId]);

  const handleJoin = useCallback((): void => {
    if (isCheckedNickname && isCheckedGithubId) {
      mutationJoin
        .mutateAsync(joinRequestData)
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
    } else {
      setErrorMessage('인증을 완료해주세요');
    }
  }, [isCheckedNickname, isCheckedGithubId, mutationJoin, history, joinRequestData]);

  return (
    <div>
      <Form onFinish={handleJoin} autoComplete="off">
        <Button
          type="link"
          onClick={handleCheckNickname}
          disabled={mutationCheckNickname.isLoading}
        >
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
          <Input
            name="nickname"
            value={joinRequestData.nickname}
            onChange={handleOnChange}
            size="large"
          />
        </Form.Item>
        <Button
          type="link"
          onClick={handleCheckGithubId}
          disabled={mutationCheckGithubId.isLoading}
        >
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
          <Input
            name="githubId"
            value={joinRequestData.githubId}
            onChange={handleOnChange}
            size="large"
          />
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
