/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-16 10:45:19
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-08-17 15:47:28
 * @FilePath: \xc_customer-service\src\store\index.ts
 * @Description: Store
 */
import Vuex from "vuex";
import login from "./modules/login";
import auxiliary from "./modules/auxiliary";
import header from "./modules/header";
import getters from "./getters";

export default new Vuex.Store({
  modules: {
    login,
    auxiliary,
    header,
  },
  getters,
});
