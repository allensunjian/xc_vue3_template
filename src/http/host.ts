/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-15 15:54:55
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-13 10:47:23
 * @FilePath: \xc_customer-service\src\http\host.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const currentEnv: "dev" | "test" | "pre" | "pro" = "test";
const getCurrenURL = (map: {
  dev: string;
  test: string;
  pre: string;
  pro: string;
}) => {
  console.log(currentEnv, process.env.VUE_ENV);
  return map[currentEnv] ? map[currentEnv] : map.pro;
};

export const BaseURL = getCurrenURL({
  dev: "https://dbsgw.dev.center.xcuniv.com/douboshi-api",
  test: "https://dbsgw.test.center.xcuniv.com/douboshi-api",
  pre: "https://dbsgw.pre.center.xcuniv.com/douboshi-api",
  pro: "https://dbsgw.test.center.xcuniv.com/douboshi-api",
});

export const CentralPlatform = getCurrenURL({
  dev: "https://gw.dev.center.xcuniv.com",
  test: "https://gw.test.center.xcuniv.com",
  pre: "https://gw.pre.center.xcuniv.com",
  pro: "https://gw.test.center.xcuniv.com",
});
