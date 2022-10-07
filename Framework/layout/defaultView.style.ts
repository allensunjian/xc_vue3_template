/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-16 13:37:34
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-14 09:41:01
 * @FilePath: \xc_customer-service\Framework\layout\defaultView.style.ts
 * @Description: 默认布局样式文件
 */
import { CSheet } from "../scripts/utils";
const { uiStyleClr, app_layout, uiStyleLayout } = require("../mainfest.json");
const ClrFont = uiStyleClr.font_clr;
const ClrBackground = uiStyleClr.background_clr;
const layout = uiStyleLayout.layout;
const { default_layout } = app_layout;

export default CSheet({
  Layout__app: {
    background: ClrBackground.main_bg,
  },
  Layout__nav: {
    height: "100%",
    background: ClrBackground.light,
    zIndex: 1,
  },
  Layout__app_warp: {
    height: `calc(100vh - ${default_layout.nav}px)`,
    width: "100vw",
    ...layout.layout__flex,
  },
  Layout__content_view: {
    ...layout["layout__flex--column"],
    height: "100%",
    flex: 1,
    overflow: "hidden",
  },
  Layout__viewContent: {
    ...layout["layout__hidden--scrollY"],
    background: ClrBackground.light,
    height: "100%",
    padding: "20px",
    boxSizing: "border-box",
  },
  Layout__noBoxContent: {
    height: "100%",
  },
  Layout__content_innerView: {
    flex: 1,
    padding: "10px",
    boxSizing: "border-box",
    height: "calc(100% - 55px)",
  },
  Layout__header: {
    height: `${default_layout.nav}px`,
    with: "100vw",
    background: ClrBackground.primary,
    color: ClrFont.main,
    padding: "0 32px",
    position: "relative",
  },
});
