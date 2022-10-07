/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-17 15:26:26
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-08-17 15:53:00
 * @FilePath: \xc_customer-service\src\store\modules\header.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  state: {
    noticeCount: 0,
  },
  mutations: {
    UPDATE_NOTICE_COUNT(state: any, payload: number) {
      state.noticeCount = payload;
    },
  },
  getters: {
    str_noticeCount: (state: any) => {
      if (state.noticeCount < 99) {
        return state.noticeCount;
      } else {
        return "99+";
      }
    },
  },
};
