/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-19 09:23:54
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-10-06 09:45:49
 * @FilePath: \xc_customer-service\Framework\bin\stylesSatePlugus.ts
 * @Description: styleStatePlugins
 */
const MainFest = require("../mainfest.json");
const path = require("path");
const fs = require("fs");
class StyleStatePlugins {
  constructor(config) {
    this.apply(config);
  }
  apply(config) {
    config.plugin("html").tap((args) => {
      const mergedObject = {
        ...MainFest.uiStyleClr,
        ...MainFest.uiStyleSize,
      };
      let module = CreateState.init(mergedObject);
      Object.keys(mergedObject).forEach((blockname) => {
        module = module(blockname);
      });
      fs;
      const resouces = () => {
        const files = fs
          .readdirSync(path.join(__dirname, "../img"))
          .reduce((ref, file) => {
            const fileSplites = file.split(".");
            const nameSpace = fileSplites[0];
            ref[nameSpace] = `@img/${file}`;
            return ref;
          }, {});
        let resouceMerged = {
          ...files,
          ...MainFest.staticImgs,
        };
        let resouceMethod = CreateResouces.init(resouceMerged);
        Object.keys(resouceMerged).forEach((blockname) => {
          resouceMethod = resouceMethod(blockname);
        });
        return resouceMethod();
      };
      args[0].styleState = module() + resouces() + CreateIcons();

      return args;
    });
  }
}

const CreateState = ((o) => {
  let resoures = null;
  let start_tag = '<style type="text/css">@charset "UTF-8"; :root{';
  let end_tag = "}</style>";
  let start_script_tag = `<script> const PALETTE_STATE = {`;
  let end_script_tag = `}</script>`;
  let prefix = "--";
  let result = "";
  let result_scripts = "";

  const sum = (key) => {
    if (key) {
      result_scripts += `${key}:{`;
      Object.keys(resoures[key]).forEach((tag) => {
        const TagKey = `${key}-${tag}`;
        const TagValue = `${resoures[key][tag]}`;
        result += `${prefix}${TagKey}:${TagValue};`;
        result_scripts += `'${prefix}${TagKey}':'${TagValue}',`;
      });
      result_scripts += "},";
    }

    return key
      ? sum
      : `${start_tag + result + end_tag}${
          start_script_tag + result_scripts + end_script_tag
        }`;
  };
  return {
    init(_resoures) {
      resoures = _resoures;
      return sum;
    },
  };
})();

const CreateResouces = (() => {
  const name = "GETRESOURCE";
  const block = "PALETTE";
  let start_script_tag = `<script> const ${block}_RESOURCE = {`;
  let end_script_tag = `};window.${name}_${block} = (name) => PALETTE_RESOURCE[name]</script>`;
  let resouces = "";
  let orginResouces = {};
  const getDirname = (valString) => {
    const sArr = valString.split("/");
    const type = sArr[sArr.length - 1].split(".")[1];
    return {
      dirname: sArr[0].replace("@", ""),
      path: sArr.slice(1).join("/"),
      type,
    };
  };
  const getResouce = (rInfos) => {
    const filePath = path.join(
      __dirname,
      "../" + rInfos.dirname + "/" + rInfos.path
    );
    const data = fs.readFileSync(filePath);
    return `data: image/${rInfos.type};base64,${data.toString("base64")}`;
  };
  const sum = (key) => {
    if (key) {
      let val = orginResouces[key];
      if (val.indexOf("@") == 0) {
        const rInfos = getDirname(val);
        resouces += `'${rInfos.dirname + "_" + key}':'${getResouce(rInfos)}',`;
      } else {
        console.log("无资源");
      }
    }

    return key ? sum : start_script_tag + resouces + end_script_tag;
  };
  return {
    init(_orginResouces) {
      orginResouces = _orginResouces;
      return sum;
    },
  };
})();

const CreateIcons = () => {
  let ret = "";
  const IconString = "GETICON";
  const IconModule = "SELECTION";
  const jsonfilePath = path.join(__dirname, "../icons/iconfont.json");
  const cssFilePath = path.join(__dirname, "../icons/iconfont.css");
  const jsFilePath = path.join(__dirname, "../icons/iconfont.js");
  const startTag = `<script id='scriptRunTime'>`;
  const endTag = `</script>`;
  const runTimeContent = `const runTimeScript = document.getElementById('scriptRunTime'); const host = location.origin; const link = document.createElement("link");link.setAttribute('rel', 'stylesheet');   link.href = origin + "/iconfont.css";document.getElementsByTagName("head")[0].appendChild(link);`;
  try {
    const jsonStr = fs.readFileSync(jsonfilePath, "utf-8");
    const jsStr = fs.readFileSync(jsFilePath, "utf-8");
    const data = JSON.parse(jsonStr);
    fs.statSync(cssFilePath);
    const selections = data.glyphs.map((item) => item.font_class);
    ret = `${startTag}${runTimeContent}const ${IconString}_${IconModule}=${JSON.stringify(
      selections
    )};${jsStr}; ${endTag}`;
  } catch (error) {
    console.log("no icon config");
  }
  return ret;
};

module.exports = StyleStatePlugins;
