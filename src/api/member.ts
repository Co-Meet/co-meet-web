import api from '../api/core';

export const login = (login: any): Promise<any> =>
  api.post({
    url: '/members/login',
    data: login,
  });
