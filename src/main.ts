/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-15 15:13:46
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-13 18:03:20
 * @FilePath: \xc_customer-service\src\main.ts
 * @Description: 程序入口
 */

import { createApp } from "vue";
import App from "./App";
import { httpInstall } from "./http/request";
import AXHELPER from "./components/auxiliary/auxiliaryHelper";
import Router from "@/router/index";
import Store from "@/store";
import "./registerServiceWorker";
import "../assets/reset.scss";
import ElementPlus from "element-plus";
import QuickForm from "quick-form-vue3";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { JSEncrypt } from "jsencrypt";
createApp(App)
  .use(Router)
  .use(Store)
  .use(AXHELPER)
  .use(QuickForm)
  .use(ElementPlus, { locale: zhCn })
  .use(httpInstall)
  .use(
    (() => ({
      install: (app: {
        config: {
          globalProperties: {
            $rsaEncrypt?: (data: string, key: string, isPublic: boolean) => any;
          };
        };
      }) => {
        app.config.globalProperties.$rsaEncrypt = function (
          data: string,
          key: string,
          isPublic: boolean
        ) {
          const encryptObj = new JSEncrypt();
          if (isPublic) {
            encryptObj.setPublicKey(key);
          } else {
            encryptObj.setPrivateKey(key);
          }
          return encryptObj.encrypt(data);
        };
      },
    }))()
  )
  .mount("#app");
