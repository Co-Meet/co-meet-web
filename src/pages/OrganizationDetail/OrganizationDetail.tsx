import React, {useCallback, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Col, Row} from 'antd';
import {Member} from '../../types/dto/member';
import {useQuery} from 'react-query';
import {getCommit} from '../../api/commit';
import Modal from '../../components/OrganizationDetail/Modal';

function OrganizationDetail() {
  const {state} = useLocation();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const data: any = state;
  const organizationId = data.state.id;
  const memberList = data.state.members;
  let commitList: any = [];

  const handleMemberCommitInfo = useCallback(() => {
    commitList = memberList.map((member: Member) => {
      const {data} = useQuery(['organizations'], () => getCommit(member.id));
      return {nickname: member.nickname, commits: data?.commits};
    });
  }, []);

  const renderOrganizationInfo = useCallback(() => {
    return (
      <Row gutter={[16, 16]} style={{marginTop: '30px'}}>
        {handleMemberCommitInfo()}
        {commitList.map((commit: any, idx: number) => (
          <Col key={commit.nickname} xs={24} md={12} lg={8}>
            <div>
              <div>{commit.nickname}</div>
              <div>{commit.commits}</div>
            </div>
          </Col>
        ))}
      </Row>
    );
  }, []);

  return (
    <div>
      <h2 style={{fontWeight: 'bold'}}>오거니제이션 정보 보기</h2>
      {isOpenModal && <Modal onClickToggleModal={onClickToggleModal}>{organizationId}</Modal>}
      <button onClick={onClickToggleModal}>Open Modal</button>
      {renderOrganizationInfo()}
    </div>
  );
}

export default OrganizationDetail;
