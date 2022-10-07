/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-17 13:21:59
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-08-31 11:19:23
 * @FilePath: \xc_customer-service\src\store\modules\auxiliary.ts
 * @Description: 辅助bar状态
 */
import { ElButton } from "element-plus";
import { h } from "vue";
export default {
  state: {
    show: true,
    content:
      "辅助bar" ||
      h(ElButton, {
        children: ["测试"],
      }),
  },
  mutations: {
    SET_AUY_STATE(state: any, payload: boolean) {
      state.show = payload;
    },
    SET_AUY_CONTENT(state: any, payload: any) {
      state.content = payload;
      if (typeof payload == "string") document.title = payload;
    },
  },
};
