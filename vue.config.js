/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-15 15:13:46
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-08-24 10:37:56
 * @FilePath: \xc_customer-service\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require("@vue/cli-service");
const StyleStatePlugins = require("./Framework/bin/stylesSatePlugus.js");
console.log(StyleStatePlugins);
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  transpileDependencies: true,
  // configureWebpack: {
  //   plugins: [new StyleStatePlugins()],
  // },
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.optimization.minimize(true);
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("@components", resolve("./src/components"))
      .set("@pages", resolve("./src/pages"))
      .set("@assets", resolve("./src/assets"))
      .set("@Framework", resolve("./Framework"));
    config.when(
      ["dev", "testEnv", "pre", "prod"].includes(process.env.NODE_ENV),
      (config) => config.devtool("inline-source-map")
    );
    new StyleStatePlugins(config);
  },
  lintOnSave: false,
});
