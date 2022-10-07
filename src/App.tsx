/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-15 15:13:46
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-08-17 10:53:21
 * @FilePath: \xc_customer-service\src\App.tsx
 * @Description: app.vue
 */
import { defineComponent, KeepAlive } from "vue";
import DefaultLayout from "../Framework/layout/defaultView";

export default defineComponent({
  name: "App",
  setup() {
    return () => <DefaultLayout></DefaultLayout>;
  },
});
