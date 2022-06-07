import {Member} from './member';

export interface Organization {
  id: number;
  name: string;
  members: Member[];
}

export interface CreateOrganizationRequestData {
  name: string;
}

export interface AddMemberRequestData {
  nickname: string;
}
