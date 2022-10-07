/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-22 18:33:26
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-14 14:48:05
 * @FilePath: \xc_customer-service\src\components\auxiliary\auxiliaryHelper.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h, DefineComponent } from "vue";
import Store from "@/store";
import { IObject } from "../../types/interface";
import { FistUpper } from "../../../Framework/scripts/utils";
import { ElIcon, ElLoading } from "element-plus";
import { Loading } from "@element-plus/icons-vue";
export type AuxBarHelper = {
  component: DefineComponent;
  methods?: IObject<(...items: any) => any>;
  options?: IObject<string | number | boolean>;
};
export const mountAuxBar = (config: AuxBarHelper) => {
  Store.commit(
    "SET_AUY_CONTENT",
    h(Loading, {
      color: "var(--font_clr-high__light--primary)",
      width: "20px",
      class: "round__infi",
    })
  );
  const methods = Object.keys(config.methods || {}).reduce(
    (ref: IObject, cur) => {
      const meType = `on${FistUpper(cur)}`;
      ref[meType] = (config.methods || {})[cur];
      return ref;
    },
    {}
  );
  let timer: any = null;
  timer = setTimeout(() => {
    Store.commit(
      "SET_AUY_CONTENT",
      h(config.component, {
        ...methods,
        ...config.options,
      })
    );
    clearTimeout(timer);
  }, 500);
};
export default {
  install(app: any) {
    app.config.globalProperties.mountAuxBar = mountAuxBar;
  },
};
