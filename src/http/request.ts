/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-15 15:54:37
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-05 09:36:35
 * @FilePath: \xc_customer-service\src\http\request.ts
 * @Description: 請求實例
 */
import Axios, { AxiosResponse } from "axios";
import { BaseURL } from "./host";
import { LocalToken, clearLogin } from "../../Framework/scripts/utils";
import { TRespones } from "./types";
import Store from "@/store";
const login_api = "/auth/oauth/token";

const axiosIns = Axios.create({
  // baseURL: BaseURL,
  timeout: 100000,
});

// request
axiosIns.interceptors.request.use((config: any) => {
  const token = LocalToken.get();
  if (token && config.url !== login_api) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

// respones
axiosIns.interceptors.response.use(
  (respone: AxiosResponse<TRespones, any>) => {
    if (respone.data.code == 0) {
      return Promise.resolve(respone);
    }

    if (respone.data.code !== 0) {
      return Promise.resolve(respone);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (respone.data.code == 401) {
      // Store.dispatch({ type: "outLogin" });
      return Promise.reject(401);
    }
  },
  (err) => Promise.reject(err)
);

// 攔截設置
export default axiosIns;

export const httpInstall = {
  install: (app: any) => (app.config.globalProperties.$http = axiosIns),
};
