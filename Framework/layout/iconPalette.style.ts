/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-30 09:48:06
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-08-30 14:35:52
 * @FilePath: \xc_customer-service\Framework\layout\iconPalette.style.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CSheet } from "../scripts/utils";
const { uiStyleClr, app_layout, uiStyleLayout } = require("../mainfest.json");
const ClrFont = uiStyleClr.font_clr;
const ClrBackground = uiStyleClr.background_clr;
const layout = uiStyleLayout.layout;
const { default_layout } = app_layout;

export default CSheet({
  iconPalette__wrap: {
    width: "100%",
    ...layout["layout__hidden--scrollY"],
    height: "200px",
  },
  iconPalette__item: {
    width: "40px",
    height: "40px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      background: "var(--background_clr-light-4)",
    },
  },
});
