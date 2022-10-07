/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-16 09:49:43
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-14 09:37:31
 * @FilePath: \xc_customer-service\src\pages\layout\default-view.tsx
 * @Description: 系统常规视图布局
 */
const { layoutComponents = {} } = require("../mainfest.json");
import Header from "../../src/components/header/headerComponent.vue";
import Nav from "../../src/components/nav/navComponent.vue";
import AuBar from "../../src/components/auxiliary/auxiliaryComponent.vue";
import Clp from "./colorPalette";
import CS from "./defaultView.style";
import { getEnv } from "../scripts/utils";
// const path = require("path");
import { KeepAlive, defineComponent, Transition } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const ViewRender = (Store: any, Route: any) => () =>
  Store.getters.g_pageReady ? (
    Route.meta.pageOnly ? (
      <router-view></router-view>
    ) : (
      <div class={CS.classes.Layout__app}>
        {getEnv() == "development" ? <Clp></Clp> : ""}

        <Header classes={CS.classes}></Header>
        <div class={CS.classes.Layout__app_warp}>
          <div class={CS.classes.Layout__nav}>
            <Nav></Nav>
          </div>
          <div class={[CS.classes.Layout__content_view]}>
            {!Route.meta.hideAuxiliaryBar ? (
              <AuBar>{Store.getters.auyContent}</AuBar>
            ) : (
              ""
            )}
            <div class={[CS.classes.Layout__content_innerView]}>
              {!Route.meta.onlyBox ? (
                <div
                  class={[CS.classes.Layout__viewContent, "reset__scrollbar"]}
                >
                  <router-view>
                    {({ Component }: any) => {
                      return Route.meta.keepAliveD ? (
                        <KeepAlive>
                          <Component></Component>
                        </KeepAlive>
                      ) : (
                        <Component></Component>
                      );
                    }}
                  </router-view>
                </div>
              ) : (
                <div
                  class={[CS.classes.Layout__noBoxContent, "reset__scrollbar"]}
                >
                  <router-view>
                    {({ Component }: any) => {
                      return Route.meta.keepAliveD ? (
                        <KeepAlive>
                          <Component></Component>
                        </KeepAlive>
                      ) : (
                        <Component></Component>
                      );
                    }}
                  </router-view>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <div class="no_ready">
      <div>
        <span class="星">星</span>
        <span class="晨">晨</span>
        <span></span>
        <span class="客">客</span>
        <span class="服">服</span>
        <span class="系">系</span>
        <span class="统">统</span>
        {/* <span class="D">D</span> */}
      </div>
    </div>
  );

export default defineComponent({
  setup() {
    const Store = useStore();
    const Route = useRoute();
    return ViewRender(Store, Route);
  },
});
