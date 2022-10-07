/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-16 09:07:32
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-27 13:45:29
 * @FilePath: \xc_customer-service\src\router\index.ts
 * @Description: 路由配置
 */
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteLocationNormalized,
  NavigationGuardNext,
  RouteRecordRaw,
  RouteRecordName,
} from "vue-router";
import { LocalToken, LocalInfo } from "../../Framework/scripts/utils";
import Store from "../store";
// import Home from "@pages/server/home/homePage.vue";
// console.log(Hom
const addRoutes = (
  routes: Array<RouteRecordRaw>,
  parentName?: RouteRecordName,
  root?: boolean
) => {
  routes.forEach((item) => {
    const { name, path, component, meta } = item;
    const hasComponent = Boolean(component);
    if (hasComponent) {
      const route = {
        name,
        path,
        component: () => import("@/pages" + String(component)),
        meta,
      };
      router.addRoute(route);
    } else {
      // 重定向路由
      if (item.redirect) {
        router.addRoute(item);
      }
    }

    if (item.children && item.children.length > 0) {
      addRoutes(
        item.children,
        hasComponent ? (item.name as RouteRecordName) : "",
        false
      );
    }
  });
};
const _routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@pages/login/loginPage.vue"),
    meta: {
      title: "登录",
      keepAliveD: true,
      pageOnly: true,
      hideAuxiliaryBar: true,
    },
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@pages/statePage/404.vue"),
    meta: { title: "404", pageOnly: true, hideAuxiliaryBar: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: _routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const IsLogin = Boolean(LocalToken.get());
    Store.commit(
      IsLogin ? "UPDATE_LOGIN_STATE_SUCCESS" : "UPDATE_LOGIN_STATE_FAIL"
    );
    !to.meta.handleAuxBar && Store.commit("SET_AUY_CONTENT", to.meta.title);
    const toPath = to.path;
    console.log(toPath);
    if (IsLogin) {
      if (Store.state.login.routes == 0) {
        const localInfo = LocalInfo.get();
        Store.commit("UPDATE_CLIENTTYPE", (localInfo || {}).clientType);
        Store.dispatch({ type: "initPermission" }).then((res) => {
          const DynamicRoutes: Array<RouteRecordRaw> = res[0];
          const firstPage = DynamicRoutes[0];
          _routes.push({
            path: "/",
            redirect: firstPage.path,
          });
          Store.commit("UPDATE_LOGIN_ROUTES", DynamicRoutes.concat(_routes));

          addRoutes(DynamicRoutes.concat(_routes), "", true);
          console.log(DynamicRoutes.concat(_routes));
          Store.dispatch({ type: "initMenus", payload: DynamicRoutes });
          try {
            next({ ...to, replace: true });
          } catch (error) {
            console.log(error);
          }
        });
      } else {
        toPath == "/login" ? next({ path: "/" }) : next();
      }
    } else {
      toPath !== "/login" ? next({ path: "/login" }) : next();
    }
  }
);
router.isReady().then(() => Store.commit("UPDATE_LOGIN_PAGEREADY_Y"));
export default router;
