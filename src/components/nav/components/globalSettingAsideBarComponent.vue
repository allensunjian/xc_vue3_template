<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-09-06 13:44:42
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-07 09:26:09
 * @FilePath: \xc_customer-service\src\components\nav\components\globalSettingAsideBarComponent.vue
 * @Description: 全局边栏组件
-->
<template>
    <div class="Nav__content_third">
        <span class="Nav__content_third--item" v-for="(item, index) in navConfig" @click="sideClick(index, item)"
            :class="{ 'sideActive': selectedSide == index }" :key="'nav_' + index">{{ item.name }}</span>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { reactive, ref, onMounted, ReactiveEffect, watch, Ref } from 'vue'
import { useRoute, useRouter } from "vue-router"
// import request from "@/http/request";
// import { CentralPlatform } from "@/http/host"
// import { IObject } from '@/types/interface';
const navConfig: Ref<any> = ref([])
const Route = useRoute();
const Router = useRouter();
const selectedSide = ref(0)
const Store = useStore();
const sideClick = (idx?: number, data?: any) => {
    Router.push({
        path: data.path
    })
    selectedSide.value = Number(idx);
    Store.commit("SET_AUY_CONTENT", data.name);

};

const initState = () => {
    let currentNavConfig = [];
    const { page, parentPath } = Route.meta;
    let currentThirdPath = "";
    try {
        // 辅助导航的元素
        if (page && parentPath) {
            currentThirdPath = parentPath as string
        } else {
            currentThirdPath = Route.path;
        }
        currentNavConfig = Store.getters.g_index_map[currentThirdPath].children.filter((item: any) => item.meta.thirdNav);
        navConfig.value = currentNavConfig;
        Router.push(currentNavConfig[0].path)

    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    setTimeout(() => {
        initState()
    })

})
</script>