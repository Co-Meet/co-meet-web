import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {useQuery} from 'react-query';
import {getMyOrganization} from '../../api/member';
import Loading from '../../components/Loading';
import {Col, Row} from 'antd';
import {Organization} from '../../types/dto/organization';
import {Member} from '../../types/dto/member';

function Main() {
  const history = useHistory();
  const {status, data} = useQuery(['organizations'], () => getMyOrganization());

  const handleOrganizationInfo = useCallback(
    async (idx: any): Promise<void> => {
      const organizationList = data?.organizationList[idx];
    },
    /**
         TODO : 오거니제이션 상세정보 보여주는 페이지
         */
    [data, history],
  );

  const renderByStatus = useCallback(() => {
    switch (status) {
      case 'loading':
        return <Loading />;
      case 'success':
        const organizationList = data.organizationList;
        const members = organizationList[0].members;
        return (
          <Row gutter={[16, 16]} style={{marginTop: '30px'}}>
            {organizationList.map((organization: Organization, idx: number) => (
              <Col key={organization.id} xs={24} md={12} lg={8}>
                <div onClick={() => handleOrganizationInfo(idx)} key={organization.id}>
                  <div>{organization.name}</div>
                  {organization.members.map((member: Member, idx: number) => (
                    <div>{member.nickname}</div>
                  ))}
                </div>
              </Col>
            ))}
          </Row>
        );
    }
  }, [handleOrganizationInfo, data, status]);
  return (
    <div>
      <h2 style={{fontWeight: 'bold'}}>내가 속한 오거니제이션 보기</h2>
      {renderByStatus()}
    </div>
  );
}

export default Main;
