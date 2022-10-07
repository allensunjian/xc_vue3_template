/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-16 10:45:54
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-27 16:52:50
 * @FilePath: \xc_customer-service\src\store\modules\login.ts
 * @Description: 登录状态
 */
import { TLogin, TMenuItem, TRole, TCLientType } from "./types";
import { ERole } from "../../../Framework/dictionary/dict";
import {
  clearLogin,
  LocalRoutes,
  LocalInfo,
  LocalPermission,
} from "../../../Framework/scripts/utils";
import { navList, PermissionList } from "../../http/modules/route_block";
import { RouteRecordRaw } from "vue-router";
export default {
  state: {
    pageReady: false,
    isLogin: false,
    readyToRefersh: false,
    permissions: [],
    user: {},
    role: "",
    clientType: "",
    routes: [],
    menus: [],
    indexMap: [],
  },
  mutations: {
    UPDATE_LOGIN_STATE_SUCCESS: (state: TLogin) => {
      state.isLogin = true;
    },
    UPDATE_LOGIN_STATE_FAIL: (state: TLogin) => {
      state.isLogin = false;
      clearLogin();
    },
    UPDATE_LOGIN_PAGEREADY_Y: (state: TLogin) => {
      state.pageReady = true;
    },
    UPDATE_LOGIN_PAGEREADY_N: (state: TLogin) => {
      state.pageReady = false;
    },
    UPDATE_LOGIN_MENUS: (state: TLogin, payload: Array<TMenuItem>) => {
      state.menus = payload;
    },
    UPDATE_LOGIN_INDEXMAP: (state: TLogin, payload: Array<TMenuItem>) => {
      state.indexMap = payload;
    },
    UPDATE_LOGIN_ROLE: (state: TLogin, payload: TRole) => {
      state.role = payload;
    },
    UPDATE_LOGIN_ROUTES: (state: TLogin, payload: Array<RouteRecordRaw>) => {
      state.routes = payload;
    },
    UPDATE_LOGIN_PERMISSION: (state: TLogin, payload: Array<string>) => {
      state.permissions = payload;
    },
    UPDATE_LOGIN_USER: (state: TLogin, payload: any) => {
      state.user = payload;
    },
    RESET_LOGIN_OUT: (state: TLogin) => {
      state.pageReady = false;
      state.isLogin = false;
      state.readyToRefersh = false;
      state.permissions = [];
      state.user = {};
      state.role = {
        roleCode: "",
        roleName: "",
      };
      state.routes = [];
      state.menus = [];
    },
    UPDATE_CLIENTTYPE: (state: TLogin, type: TCLientType) => {
      state.clientType = type;
    },
  },
  actions: {
    updateNavList() {
      return new Promise((resolve, reject) => {
        navList().then((r: any) => {
          LocalRoutes.set(r);
          resolve(null);
        });
      });
    },
    initPermission(ctx: any) {
      const routes = LocalRoutes.get(); // routes | menu
      const info: TRole | null = LocalInfo.get() as TRole; // user | role
      const permissions = LocalPermission.get(); // permissions
      if (info && info.roleCode) {
        ctx.commit("UPDATE_LOGIN_ROLE", {
          roleCode: info.roleCode,
          roleName: info.roleCode,
        });
        ctx.commit("UPDATE_LOGIN_USER", info);
      }
      if (routes == null || permissions == null) {
        return new Promise((resolve, reject) => {
          Promise.all([navList(), PermissionList()])
            .then((res: any) => {
              const r: Array<string> = res[0];
              const p = res[1];
              LocalRoutes.set(r);
              LocalPermission.set(p);
              resolve(res);
            })
            .catch(reject);
        });
      }
      return Promise.resolve([routes, permissions]);
    },
    initMenus(
      ctx: any,
      options: { type: string; payload: Array<RouteRecordRaw> }
    ): void {
      const createMenuDeep = (
        orginMenus: any,
        start?: number,
        indexSource?: any
      ) => {
        const Menus: Array<any> = [];
        const IndexMap: any = {};
        orginMenus.forEach((item: any, index: number) => {
          const currentIndex = index + 1;
          const computedIndex = start
            ? start + "-" + currentIndex
            : String(currentIndex);
          const menuItem = {
            icon: item.icon,
            path: item.path,
            name: item.name,
            meta: item.meta,
            index: computedIndex,
            children: [null],
            type: item.type,
            permissions: item.permissions,
          };
          if (item.path) {
            (indexSource ? indexSource : IndexMap)[item.path] = menuItem;
          }
          const children: any =
            item.children && item.children.length > 0
              ? createMenuDeep(item.children, currentIndex, IndexMap).Menus
              : [];
          menuItem.children = children;
          Menus.push(menuItem);
        });
        return {
          Menus,
          IndexMap,
        };
      };
      const Map = createMenuDeep(options.payload);
      console.log(Map);
      const Menus = Map.Menus;
      const IndexMap = Map.IndexMap;
      ctx.commit("UPDATE_LOGIN_MENUS", Menus);
      ctx.commit("UPDATE_LOGIN_INDEXMAP", IndexMap);
    },
    outLogin(ctx: any) {
      ctx.commit("RESET_LOGIN_OUT");
      clearLogin();
      location.reload();
    },
  },
  getters: {
    g_pageReady: (state: TLogin) => state.pageReady,
    g_menus: (state: TLogin): Array<TMenuItem> => state.menus,
    g_role_text: (state: TLogin) => {
      return ERole[state.clientType];
    },
    g_index_map: (state: TLogin) => state.indexMap,
    g_user: (state: TLogin) => state.user,
    g_client_type: (state: TLogin) => state.clientType,
  },
};
