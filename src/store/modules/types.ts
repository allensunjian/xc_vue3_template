/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-16 10:53:06
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-14 09:18:25
 * @FilePath: \xc_customer-service\src\store\modules\types.ts
 * @Description: types login
 */
export type TRouteMeta = {
  path: string;
  name: string;
  component: string;
  meta: TMeta;
};
export type TMeta = {
  title: string;
  keepAliveD?: boolean;
  hideAuxiliaryBar?: boolean;
  id?: string;
  asideBar?: boolean;
};
export type TMenuItem = {
  path: string;
  name: string;
  id?: number;
  meta: {};
  icon?: string;
  children: Array<TMenuItem>;
};
import { IObject } from "@/types/interface";
import { RouteRecordRaw } from "vue-router";
export type TRole = {
  roleCode: string;
  roleName: string;
};
export type TLogin = {
  isLogin: boolean;
  readyToRefersh: boolean;
  pageReady: boolean;
  menus: Array<TMenuItem>;
  role: TRole;
  routes: Array<RouteRecordRaw>;
  permissions: Array<string>;
  user: IObject;
  indexMap: Array<TMenuItem>;
  clientType: TCLientType;
};

export type TCLientType = "server" | "manager";
