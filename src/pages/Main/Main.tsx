import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {useMutation, useQuery} from 'react-query';
import {getMyOrganization} from '../../api/member';
import Loading from '../../components/Loading';
import {Col, Row} from 'antd';
import {Organization} from '../../types/dto/organization';
import {Member} from '../../types/dto/member';
import {removeMember} from '../../api/organization';

function Main() {
  const history = useHistory();
  const {status, data} = useQuery(['organizations'], () => getMyOrganization());

  const {mutate, isLoading, isError, error, isSuccess} = useMutation((id: number) =>
    removeMember(id),
  );

  const handleOrganizationInfo = useCallback(
    async (idx: any): Promise<void> => {
      const organizationList = data?.organizationList[idx];
      history.push('/organization-detail', {
        state: {
          id: organizationList?.id,
          members: organizationList?.members,
          name: organizationList?.name,
        },
      });
    },
    [data, history],
  );

  const renderByStatus = useCallback(() => {
    switch (status) {
      case 'loading':
        return <Loading />;
      case 'success':
        const organizationList = data.organizationList;
        return (
          <Row gutter={[16, 16]} style={{marginTop: '30px'}}>
            {organizationList.map((organization: Organization, idx: number) => (
              <Col key={organization.id} xs={24} md={12} lg={8}>
                <div>
                  <button
                    onClick={() => {
                      mutate(organization.id);
                    }}
                  >
                    x
                  </button>
                  <div onClick={() => handleOrganizationInfo(idx)} key={organization.id}>
                    <div>{organization.name}</div>
                    {organization.members.map((member: Member, idx: number) => (
                      <div>{member.nickname}</div>
                    ))}
                  </div>
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
