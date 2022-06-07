import api from '../api/core';
import {
  GetMyOrganizationResponseData,
  JoinRequestData,
  LoginRequestData,
} from '../types/dto/member';

export const login = (loginRequestData: LoginRequestData): Promise<string> =>
  api.post({
    url: '/members/login',
    data: loginRequestData,
  });

export const join = (joinRequestData: JoinRequestData): Promise<string> =>
  api.post({
    url: '/members/join',
    data: joinRequestData,
  });

export const checkNickname = (nickname: string): Promise<string> =>
  api.get({
    url: `/members/check-nickname/${nickname}`,
  });

export const checkGithubId = (githubId: string): Promise<string> =>
  api.get({
    url: `/members/check-githubId/${githubId}`,
  });

export const getMyOrganization = (): Promise<GetMyOrganizationResponseData> =>
  api.get({
    url: '/members/organizations',
  });
