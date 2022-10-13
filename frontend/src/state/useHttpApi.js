import { useMemo, useState } from 'react';
import axios from 'axios';
import constate from 'constate';

import { API_URL } from 'config';

const buildApi = (setIsLoading) => {
  const processResponse = async (callInstance) => {
    try {
      setIsLoading(true);

      const { data } = await callInstance;
      if (data && data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (e) {
      if (e.response && e.response.status) {
        switch (e.response.status) {
          case 401:
            // setLoggedOutState();
            break;
          default:
        }
      }

      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  // const getAuthHeaders = () => {
  //   const token = userTokenPersistence.get();

  //   if (!token) {
  //     return {};
  //   }

  //   return { Authorization: `Token ${token}` };
  // };

  const callAxiosMethod = (methodName, path, ...args) =>
    processResponse(
      axios[methodName](
        `${API_URL}${path}`,
        ...args
        // {
        //   headers: { ...getAuthHeaders() }
        // }
      )
    );

  const get = (...args) => callAxiosMethod('get', ...args);

  // const post = (...args) => callAxiosMethod('post', ...args);
  // // eslint-disable-next-line no-unused-vars
  // const put = (...args) => callAxiosMethod('put', ...args);
  // const patch = (...args) => callAxiosMethod('patch', ...args);
  // // eslint-disable-next-line no-unused-vars
  // const Delete = (...args) => callAxiosMethod('delete', ...args);
  const getGoldBars = () => get('api/gold-bars/');
  const getBarHolder = () => get(`api/bar-holder/`);
  const getBurnHistory = () => get(`api/burn-history/`);
  const getBarHolderByAddress = (address) => get(`api/bar-holder/${address}/`);

  return {
    getGoldBars,
    getBarHolder,
    getBurnHistory,
    getBarHolderByAddress
  };
};

export const useHttpApi_ = () => {
  //   const setLoggedOutState = useSetLoggedOutState();
  const [isLoading, setIsLoading] = useState(false);

  const api = useMemo(() => buildApi(setIsLoading), []);

  return { api, isLoading };
};

export const [HttpApiProvider, useHttpApi, useHttpApiLoading] = constate(
  useHttpApi_,
  ({ api }) => api,
  ({ isLoading }) => isLoading
);
