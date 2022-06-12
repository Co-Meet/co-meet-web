import api from './core';
import {
  AddMemberRequestData,
  CreateOrganizationRequestData,
  Organization,
} from '../types/dto/organization';

export const createOrganization = (
  createOrganizationRequestData: CreateOrganizationRequestData,
): Promise<Organization> =>
  api.post({
    url: '/organizations',
    data: createOrganizationRequestData,
  });

export const getOrganization = (id: number): Promise<Organization> =>
  api.get({
    url: `/organizations/${id}`,
  });

export const addMember = (
  id: any,
  addMemberRequestData: AddMemberRequestData,
): Promise<Organization> =>
  api.patch({
    url: `/organizations/${id}/in`,
    data: addMemberRequestData,
  });

export const removeMember = (id: any): Promise<Organization> =>
  api.patch({
    url: `/organizations/${id}/out`,
  });
