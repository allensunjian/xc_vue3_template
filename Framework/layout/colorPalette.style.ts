import { CSheet } from "../scripts/utils";
const { uiStyleClr, app_layout, uiStyleLayout } = require("../mainfest.json");
const ClrFont = uiStyleClr.font_clr;
const ClrBackground = uiStyleClr.background_clr;
const layout = uiStyleLayout.layout;
const { default_layout } = app_layout;

export default CSheet({
  Palette_layout: {
    position: "fixed",
    top: "30%",
    right: 0,
    opacity: "0.5",
    "&:hover": {
      opacity: 1,
    },
    zIndex: 999,
  },
  Palette_dialog_content: {
    ...layout["layout__flex--column"],
  },
  Palette_dialog_flex: {
    ...layout.layout__flex,
  },
  Palette_dialog_item: {
    flex: "0 0 30px",
    ...layout.layout__flex,
    marginTop: "10px",
    cursor: "pointer",
    "&:hover": {
      background: ClrBackground["light-2"],
    },
    "& img:hover": {
      borderColor: ClrFont["high__light--primary"],
    },
  },

  Palette_dialog_state: {
    ...layout.layout__flex,
    flex: "0 0 30px",
    height: "100%",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  Palette_dialog_copytext: {
    ...layout.layout__flex,
    flex: "1",
    height: "100%",
    paddingLeft: "20px",
    alignItems: "center",
  },
  Palette_dialog_subtitle: {
    fontSize: "20px",
    color: ClrFont["high__light--primary"],
  },
});
