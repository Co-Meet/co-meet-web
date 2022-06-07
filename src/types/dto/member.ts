import {Organization} from './organization';

export interface Member {
  id: number;
  nickname: string;
  githubId: string;
}

export interface LoginRequestData {
  nickname: string;
}

export interface JoinRequestData extends LoginRequestData {
  githubId: string;
}

export interface GetMyOrganizationResponseData {
  organizationList: Organization[];
}
