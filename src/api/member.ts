import api from '../api/core';

export const login = (login: any): Promise<any> =>
  api.post({
    url: '/members/login',
    data: login,
  });

export const join = (join: any): Promise<any> =>
  api.post({
    url: '/members/join',
    data: join,
  });

export const checkNickname = (nickname: any): Promise<any> =>
  api.get({
    url: `/members/check-nickname/${nickname}`,
  });

export const checkGithubId = (githubId: any): Promise<any> =>
  api.get({
    url: `/members/check-githubId/${githubId}`,
  });
