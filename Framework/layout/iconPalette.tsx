/* eslint-disable @typescript-eslint/ban-ts-comment */
/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-30 09:45:53
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-08-30 14:32:17
 * @FilePath: \xc_customer-service\Framework\layout\iconPalette.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineComponent } from "vue";
import CS from "./iconPalette.style";
export default defineComponent({
  setup(props: any, { emit }) {
    // @ts-ignore
    const iconStrs: Array<string> = GETICON_SELECTION;
    const EmitEvent = (strClass: string) => () => {
      emit("iconselect", strClass);
    };
    const createIconItems = () => {
      return iconStrs.map((str) => (
        <div
          class={CS.classes.iconPalette__item}
          onClick={EmitEvent("icon iconfont icon-" + str)}
        >
          <i class={["icon iconfont", "icon-" + str]}></i>
        </div>
      ));
    };
    return () => (
      <div class={[CS.classes.iconPalette__wrap, "reset__scrollbar"]}>
        {createIconItems()}
      </div>
    );
  },
});
