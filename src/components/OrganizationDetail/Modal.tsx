import React, {PropsWithChildren, useCallback, useState} from 'react';
import styled from 'styled-components';
import {useMutation} from 'react-query';
import {Button, Form, Input} from 'antd';
import {AddMemberRequestData} from '../../types/dto/organization';
import {addMember} from '../../api/organization';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({onClickToggleModal, children}: PropsWithChildren<ModalDefaultType>) {
  const mutationAddMember = useMutation((addMemberRequestData: AddMemberRequestData) =>
    addMember(children, addMemberRequestData),
  );
  const [addMemberRequestData, setAddMemberRequestData] = useState({nickname: ''});
  const [errorMsg, setErrorMsg] = useState('');
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setAddMemberRequestData({...addMemberRequestData, [e.target.name]: e.target.value});
    },
    [addMemberRequestData],
  );

  const handleAddMember = useCallback((): void => {
    mutationAddMember
      .mutateAsync(addMemberRequestData)
      .then(res => {
        if (res) {
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }
      })
      .catch(() => {
        setErrorMsg('닉네임 조회에 실패했습니다');
      });
  }, [mutationAddMember, addMemberRequestData]);

  return (
    <ModalContainer>
      <button>x</button>
      <DialogBox>
        <Form onFinish={handleAddMember} autoComplete="off">
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
              value={addMemberRequestData.nickname}
              onChange={handleOnChange}
              size="large"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            disabled={mutationAddMember.isLoading}
          >
            로그인
          </Button>

          <p>{errorMsg}</p>

          <button
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();

              if (onClickToggleModal) {
                onClickToggleModal();
              }
            }}
          >
            x
          </button>
        </Form>
      </DialogBox>
      <Backdrop />
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

const DialogBox = styled.dialog`
  width: 800px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default Modal;
