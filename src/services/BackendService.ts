import axios, { AxiosRequestConfig } from "axios";
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
  private getToken(): string | null {
    return localStorage.getItem(StorageKeys.TOKEN);
  }

  private getHeaders(hasToken?: boolean): AxiosRequestConfig["headers"] {
    if (hasToken) {
      const token = this.getToken();
      return {
        Authorization: `Bearer ${token}`,
      };
    }
    return {};
  }

  protected async getQuery<T>({
    path,
    hasToken,
    params,
  }: GetRequest): Promise<T> {
    const headers = this.getHeaders(hasToken);
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
    const headers = this.getHeaders(hasToken);
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
    const headers = this.getHeaders(hasToken);
    return await axios
      .put<T>(`${BACKEND_URL}/${path}`, body, { headers, params })
      .then((response) => response.data)
      .catch((error) => {
        throw { ...error?.response?.data, status: error?.response?.status };
      });
  }
}

export default BackendService;
