import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {useQuery} from 'react-query';
import {getOrganizationOfMember} from '../../api/member';
import Loading from '../../components/Loading';
import {Col, Row} from 'antd';

function Main() {
  const history = useHistory();
  const {status, data} = useQuery(['organizations'], () => getOrganizationOfMember());

  const _handleHistory = useCallback(
    async (idx: any): Promise<void> => {
      const organizationList = data.organizationList[idx];
    },
    [data, history],
  );

  const renderByStatus = useCallback(() => {
    switch (status) {
      case 'loading':
        return <Loading />;
      case 'success':
        const organizationList = data.organizationList;
        const members = organizationList[0].members;
        console.log(members);
        return (
          <Row gutter={[16, 16]} style={{marginTop: '30px'}}>
            {organizationList.map((organization: any, idx: number) => (
              <Col key={organization.id} xs={24} md={12} lg={8}>
                <div onClick={() => _handleHistory(idx)} key={organization.id}>
                  <div>{organization.name}</div>
                  {organization.members.map((member: any, idx: number) => (
                    <div>{member.nickname}</div>
                  ))}
                </div>
              </Col>
            ))}
          </Row>
        );
    }
  }, [_handleHistory, data, status]);
  return (
    <div>
      <h2 style={{fontWeight: 'bold'}}>내가 속한 오거니제이션 보기</h2>
      {renderByStatus()}
    </div>
  );
}

export default Main;
