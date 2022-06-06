import api from './core';

export const createOrganization = (createOrganization: any): Promise<any> =>
  api.post({
    url: '/organizations',
    data: createOrganization,
  });

export const getOrganization = (id: any): Promise<any> =>
  api.get({
    url: `/organizations/${id}`,
  });

export const addMemberToOrganization = (id: any, addMemberToOrganization: any): Promise<any> =>
  api.patch({
    url: '/organizations/${id}',
    data: addMemberToOrganization,
  });
