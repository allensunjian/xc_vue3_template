<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-16 16:57:03
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-10-06 10:12:19
 * @FilePath: \xc_customer-service\src\components\nav\navComponent.vue
 * @Description: 导航实现
-->
<template>
    <div class="Nav__content_layout">
        <div class="Nav__content_navside reset__scrollbar">
            <div class="Nav__module">
                <img :src="clientTypeImg" class="Nav__module_client">
                &nbsp;{{Store.getters.g_role_text }}
            </div>
            <el-menu :default-active="active" class="el-menu-vertical-demo">
                <template v-for="(item, index) in Store.getters.g_menus" :key="'nav_' + index">
                    <el-sub-menu :index="item.index"
                        v-if="item.children && item.children.filter((item:any) => item.type == 0).length > 0 && item.type == 0">
                        <template #title>
                            <i :class="item.icon" class="nav__icon"></i>
                            <span>{{ item.name }}</span>
                        </template>
                        <template v-for="(child, idx) in item.children" :key="'child_' + idx">
                            <el-menu-item v-if="child.type == 0" :index="child.index" @click="NavSelected(child)">
                                <template #title><span>{{ child.name }}</span></template>
                            </el-menu-item>
                        </template>

                    </el-sub-menu>
                    <el-menu-item @click="NavSelected(item)" :index="item.index"
                        v-if="item.children && item.children.filter((item:any) => item.type == 0).length == 0 && item.type == 0">
                        <i :class="item.icon" class="nav__icon"></i>
                        <span>{{ item.name }}</span>
                    </el-menu-item>
                </template>

            </el-menu>
        </div>
        <globalSetting v-if="showSideBar && Page == 'globalSetting'"></globalSetting>
        <!-- eslint-disable-next-line vue/no-dupe-v-else-if -->
        <wholeChannelSetup v-else-if="showSideBar && Page == 'wholeChannelSetup'"></wholeChannelSetup>
        <!-- {{ Page }} -->


    </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { reactive, ref, onMounted, ReactiveEffect, watch } from 'vue'
import { TRouteMeta } from "@/store/modules/types"
import globalSetting from "./components/globalSettingAsideBarComponent.vue";
import wholeChannelSetup from "./components/wholeChannelAsideBarComponent.vue";
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const clientTypeImg = (window as any).GETRESOURCE_PALETTE('img_组 9109@2x')
const selectedSide = ref(0)
const isCollapse = ref(true);
const Router = useRouter();
const Route = useRoute()
const showSideBar = ref(false);

const Page = ref("");
const active = ref("0")
const Store = useStore();
;
if (Route.meta.asideBar) {
    Page.value = Route.meta.page as string;
    showSideBar.value = Route.meta.asideBar as boolean
}

const NavSelected = (item: TRouteMeta) => {
    if (item?.meta?.asideBar) {
        showSideBar.value = true
    } else {
        showSideBar.value = false
    }
    // if (!item.path) return;
    Router.push(item.path);
};

const setupAsideBar = () => {
    if (Route.meta.asideBar) {
        Page.value = Route.meta.page as string
    } else {
        // findRoute(Route.path)
    }
}



watch(Route, setupAsideBar);

onMounted(() => {
    const meta = Route.meta;
    let currentPath: string = Route.path as string;
    if (meta.parentPath) {
        currentPath = meta.parentPath as string
    }
    const currentMap = Store.getters.g_index_map[currentPath];
    if (currentMap && currentMap.index) {
        active.value = currentMap.index;
    }

})
</script>

<style scoped>
.Nav__module_client {
    width: 32px;
    height: 32px;
    margin-bottom: -6px;
}

.el-menu {
    overflow: hidden;
}

/* 下面我们会解释这些 class 是做什么的 */
.slide-fade-enter-active {
    transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    z-index: 1;
    transform: translateX(120px);
    opacity: 0;
}

.Nav__content_layout {
    display: flex;
    height: 100%;
    overflow: hidden;
    box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.1);
}

.Nav__content_navside {
    position: relative;
    height: 100%;
    width: 180px;
    border-right: 1px solid var(--border_clr-main);
}

.Nav__module {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--border_clr-main);

}

.sideActive {
    background: var(--background_clr-light-4);
    color: var(--font_clr-high__light--primary);
}



.nav__icon {
    color: var(--font_clr-gary__sub) !important;
    margin-right: 10px;
    font-size: 16px
}

.is-active .nav__icon {
    color: var(--font_clr-high__light--primary) !important;
}
</style>