import React, {PropsWithChildren, useCallback, useState} from 'react';
import styled from 'styled-components';
import {useMutation} from 'react-query';
import {Button, Form, Input} from 'antd';
import {CreateOrganizationRequestData} from '../../types/dto/organization';
import {createOrganization} from '../../api/organization';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({onClickToggleModal, children}: PropsWithChildren<ModalDefaultType>) {
  const mutationCreateOrganization = useMutation(
    (createOrganizationRequestData: CreateOrganizationRequestData) =>
      createOrganization(createOrganizationRequestData),
  );
  const [createOrganizationRequestData, setCreateOrganizationRequestData] = useState({name: ''});
  const [errorMsg, setErrorMsg] = useState('');
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setCreateOrganizationRequestData({
        ...createOrganizationRequestData,
        [e.target.name]: e.target.value,
      });
    },
    [createOrganizationRequestData],
  );

  const handleAddMember = useCallback((): void => {
    mutationCreateOrganization
      .mutateAsync(createOrganizationRequestData)
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
  }, [mutationCreateOrganization, createOrganizationRequestData]);

  return (
    <ModalContainer>
      <button>x</button>
      <DialogBox>
        <Form onFinish={handleAddMember} autoComplete="off">
          <Form.Item
            label="이름"
            name="name"
            rules={[
              {required: true, message: '이름을 입력해주세요'},
              {
                type: 'string',
                message: '이름을 입력해주세요',
              },
            ]}
          >
            <Input
              name="name"
              value={createOrganizationRequestData.name}
              onChange={handleOnChange}
              size="large"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            disabled={mutationCreateOrganization.isLoading}
          >
            오거니제이션 생성
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
