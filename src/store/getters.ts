/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-16 10:45:35
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-08-17 15:49:03
 * @FilePath: \xc_customer-service\src\store\getters.ts
 * @Description: 快捷方法
 */

const getters = {
  isLogin: (state: any) => state.login.isLogin,
  readyToRefersh: (state: any) => state.login.readyToRefersh,
  auyState: (state: any) => state.auxiliary.show,
  auyContent: (state: any) => state.auxiliary.content,
};

export default getters;
