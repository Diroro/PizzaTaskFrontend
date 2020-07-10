import {stringify} from 'querystring';
import {localStorageUtils} from '../utils/localStorage';

const isDev = process.env.NODE_ENV === 'development';

const url = isDev ? 'http://192.168.0.6:3009' : 'https://pizza-task-test.herokuapp.com';

export type ApiRequest = {
  url: string;
  query?: object;
  body?: unknown;
};
export type FullApiRequest = ApiRequest & {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
};

interface ApiClient {
  readonly request: <R>(request: FullApiRequest) => Promise<R>;
  readonly get: <R>(request: ApiRequest) => Promise<R>;
  readonly post: <R>(request: ApiRequest) => Promise<R>;
  readonly remove: <R>(request: ApiRequest) => Promise<R>;
  readonly put: <R>(request: ApiRequest) => Promise<R>;
}

const createApiClient = (baseHref: string, extraHeaders?: object): ApiClient => {
  const request = async <R = never>(request: FullApiRequest): Promise<R> => {
    const url = `${baseHref}${buildUrl(request.url, request.query)}`;

    const accessToken = localStorageUtils.getAccessToken();

    if (accessToken) {
      extraHeaders = {
        ...extraHeaders,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    const init: RequestInit = {
      method: request.method,
      headers: {
        ...extraHeaders,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(request.body),
    };

    const response = await fetch(url, init);

    // need to handle error!
    // if (response.error) {
    //   throw new Error (response.error)
    // }

    const text = await response.text();
    return text === '' ? undefined : JSON.parse(text);
  };

  const get = <R = never>(apiRequest: ApiRequest): Promise<R> =>
    request({
      ...apiRequest,
      method: 'GET',
    });
  const post = <R = never>(apiRequest: ApiRequest): Promise<R> =>
    request({
      ...apiRequest,
      method: 'POST',
    });

  const put = <R = never>(apiRequest: ApiRequest): Promise<R> =>
    request({
      ...apiRequest,
      method: 'PUT',
    });

  const remove = <R = never>(apiRequest: ApiRequest): Promise<R> =>
    request({
      ...apiRequest,
      method: 'DELETE',
    });

  return {
    request,
    get,
    post,
    put,
    remove,
  };
};

const buildUrl = (url: string, query?: {}): string => {
  const correctUrl = url.startsWith('/') ? url : `/${url}`;
  return query ? `${correctUrl}?${stringify(query)}` : url;
};

export const apiClient: ApiClient = createApiClient(url);
