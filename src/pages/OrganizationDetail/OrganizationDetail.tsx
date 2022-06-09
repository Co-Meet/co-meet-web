import React, {useCallback} from 'react';
import {useLocation} from 'react-router-dom';
import {Col, Row} from 'antd';
import {Member} from '../../types/dto/member';
import {useQuery} from 'react-query';
import {getCommit} from '../../api/commit';

function OrganizationDetail() {
  const {state} = useLocation();
  const data: any = state;
  const memberList = data.state.members;
  let commitList: any = [];

  const handleMemberCommitInfo = useCallback(() => {
    commitList = memberList.map((member: Member) => {
      const {status, data} = useQuery(['organizations'], () => getCommit(member.id));
      return {nickname: member.nickname, commits: data?.commits};
    });
  }, []);

  const renderByStatus = useCallback(() => {
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
      {renderByStatus()}
    </div>
  );
}

export default OrganizationDetail;
