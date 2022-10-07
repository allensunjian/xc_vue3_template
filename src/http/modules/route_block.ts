/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-17 16:41:11
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-13 14:19:49
 * @FilePath: \xc_customer-service\src\http\modules\route_block.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "../request";
import { TRole } from "../../store/modules/types";
import { CentralPlatform } from "@/http/host";
import Store from "@/store";
const PromiseBlock = (fn: (resolve: any, reject: any) => void) =>
  new Promise(fn);

export const navList = () => {
  return PromiseBlock((resolve, reject) => {
    request({
      url:
        CentralPlatform +
        "/customerCenter/menu/nav/" +
        Store.getters.g_client_type,
      method: "get",
    }).then((res: any) => {
      if (res.data.code == 0) {
        const navList = res.data.data;
        const refershNavData = (list: Array<any>) => {
          return list.map((item) => {
            item.path = item.url;
            item.name = item.menuName;
            item.meta = JSON.parse(item.meta);
            if (item.children && item.children.length > 0) {
              item.children = refershNavData(item.children);
            }
            return item;
          });
        };
        resolve(refershNavData(navList));
      }
    });
    // setTimeout(() => {
    //   resolve(
    //     role == "CSS_SERVER"
    //       ? [
    //           {
    //             // 首页必须设为 路由必须设为 /
    //             path: "/",
    //             name: "首页",
    //             component: "/server/home/homePage.vue",
    //             meta: {
    //               title: "首页",
    //               keepAliveD: true,
    //               hideAuxiliaryBar: true,
    //             },
    //           },
    //           {
    //             path: "/server/customersPage",
    //             name: "顾客管理",
    //             component: "/server/customers/customersPage.vue",
    //             meta: {
    //               title: "顾客管理",
    //               keepAliveD: true,
    //               handleAuxBar: true,
    //             },
    //           },
    //           {
    //             path: "/server/im",
    //             name: "在线沟通",
    //             component: "/server/serverIM/serverIMPage.vue",
    //             meta: {
    //               title: "在线沟通",
    //               keepAliveD: true,
    //               hideAuxiliaryBar: false,
    //               onlyBox: true,
    //             },
    //           },
    //           {
    //             path: "/server/clues",
    //             name: "线索列表",
    //             component: "/server/clues/cluesPage.vue",
    //             meta: {
    //               title: "线索列表",
    //               keepAliveD: true,
    //               handleAuxBar: true,
    //             },
    //           },
    //           {
    //             path: "/server/subscribe",
    //             name: "预约顾客",
    //             component: "/server/customers/subscribePage.vue",
    //             meta: {
    //               title: "预约顾客",
    //               keepAliveD: true,
    //               handleAuxBar: true,
    //             },
    //           },

    //           {
    //             path: "/server/subscribeStorePage",
    //             name: "到店顾客",
    //             component: "/server/customers/subscribeStorePage.vue",
    //             meta: {
    //               title: "到店顾客",
    //               keepAliveD: true,
    //               handleAuxBar: true,
    //             },
    //           },
    //           {
    //             path: "/server/customesPayReturn",
    //             name: "需回访",
    //             component: "/server/customers/customesPayReturn.vue",
    //             meta: {
    //               title: "需回访",
    //               keepAliveD: true,
    //               handleAuxBar: true,
    //             },
    //           },
    //           {
    //             path: "/server/customersPage",
    //             name: "公海顾客",
    //             component: "/server/customers/customersPage.vue",
    //             meta: {
    //               title: "公海顾客",
    //               keepAliveD: true,
    //               handleAuxBar: true,
    //             },
    //           },
    //           {
    //             path: "/server/customersManage",
    //             name: "顾客管理",
    //             component: "/server/customers/customersManage.vue",
    //             meta: {
    //               title: "顾客管理",
    //               keepAliveD: true,
    //               handleAuxBar: true,
    //             },
    //           },
    //         ]
    //       : [
    //           {
    //             // 首页必须设为 路由必须设为 /
    //             path: "/",
    //             name: "首页",
    //             component: "/manager/home/manageHomePage.vue",
    //             meta: {
    //               title: "首页",
    //               keepAliveD: true,
    //               hideAuxiliaryBar: false,
    //             },
    //           },
    //           {
    //             // 首页必须设为 路由必须设为 /
    //             path: "/manager/customersPage",
    //             name: "顾客管理",
    //             component: "/manager/customers/customersPage.vue",
    //             meta: {
    //               title: "顾客管理",
    //               keepAliveD: true,
    //               hideAuxiliaryBar: false,
    //               id: "1",
    //               asideBar: true,
    //             },
    //           },
    //           {
    //             name: "人员配置",
    //             children: [
    //               {
    //                 path: "/manager/genRolePage",
    //                 name: "角色创建",
    //                 component: "/manager/staffing/genRolePage.vue",
    //                 meta: {
    //                   title: "角色创建",
    //                   keepAliveD: true,
    //                   hideAuxiliaryBar: false,
    //                 },
    //               },
    //               {
    //                 path: "/manager/personnelDistribution",
    //                 name: "角色管理",
    //                 component: "/manager/staffing/personnelDistribution.vue",
    //                 meta: {
    //                   title: "角色管理",
    //                   keepAliveD: true,
    //                   hideAuxiliaryBar: false,
    //                 },
    //               },
    //               {
    //                 // 首页必须设为 路由必须设为 /
    //                 path: "/manager/staffing/navSetting",
    //                 name: "菜单设置",
    //                 component: "/manager/staffing/navSetting.vue",
    //                 meta: {
    //                   title: "菜单设置",
    //                   keepAliveD: true,
    //                   hideAuxiliaryBar: false,
    //                 },
    //               },
    //             ],
    //           },
    //         ]
    //   );
    // }, 2000);
  });
};

export const PermissionList = () =>
  PromiseBlock((resolve, reject) => {
    setTimeout(() => {
      resolve(["sys:xx:Xxx, sys:xxx:xxx, sysxxx:xxx"]);
    }, 1000);
  });
