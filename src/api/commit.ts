import api from '../api/core';
import {GetCommitResponseData} from '../types/dto/commit';

export const getCommit = (memberId: number): Promise<GetCommitResponseData> =>
  api.get({
    url: `/commits/members/${memberId}`,
  });
