import axios from "axios";
import { StorageKeys } from "../enums";

import { BACKEND_URL } from "../config";

interface GetRequest {
  path: string;
  params?: any;
  hasToken?: boolean;
}

interface PostRequest {
  path: string;
  body?: any;
  params?: any;
  hasToken?: boolean;
}

interface PutRequest {
  path: string;
  body?: any;
  params?: any;
  hasToken?: boolean;
}

class BackendService {
  protected getToken(): string | null {
    return localStorage.getItem(StorageKeys.TOKEN);
  }

  protected async getQuery<T>({
    path,
    hasToken,
    params,
  }: GetRequest): Promise<T> {
    const token = hasToken ? this.getToken() : undefined;
    const headers = { token: token };
    return await axios
      .get<T>(`${BACKEND_URL}/${path}`, { headers, params })
      .then((response) => response.data)
      .catch((error) => {
        throw { ...error?.response?.data, status: error?.response?.status };
      });
  }

  protected async postQuery<T>({
    path,
    body = {},
    hasToken,
    params,
  }: PostRequest): Promise<T> {
    const token = hasToken ? this.getToken() : undefined;
    const headers = { token: token };
    return await axios
      .post<T>(`${BACKEND_URL}/${path}`, body, { headers, params })
      .then((response) => response.data)
      .catch((error) => {
        throw { ...error?.response?.data, status: error?.response?.status };
      });
  }

  protected async putQuery<T>({
    path,
    body = {},
    hasToken,
    params,
  }: PutRequest): Promise<T> {
    const token = hasToken ? this.getToken() : undefined;
    const headers = { token: token };
    return await axios
      .put<T>(`${BACKEND_URL}/${path}`, body, { headers, params })
      .then((response) => response.data)
      .catch((error) => {
        throw { ...error?.response?.data, status: error?.response?.status };
      });
  }
}

export default BackendService;
