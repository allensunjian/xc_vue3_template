<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-16 13:33:26
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-14 09:55:53
 * @FilePath: \xc_customer-service\src\components\header\headerComponent.vue
 * @Description: header
-->
<template>
    <div :class="Classes.Layout__header">
        <img class="Header__logo" :src="logo" alt="">
        <!-- <div class="Header__module">
            <div class="Header__module_blcok">
                <span class="Header__module_blcok--text">通知<i class="Header__module_notice">{{
                $store.getters.str_noticeCount
                }}</i></span>
            </div>
            <div class="Header__module_blcok">
                <span class="Header__module_blcok--text">工作台</span>
            </div>
            <div class="Header__module_blcok">
                <span class="Header__module_blcok--text">设置</span>
            </div>
        </div> -->
        <el-dropdown class="Header__userInfo">
            <div class="Header__userInfo">
                <img class="Header__userInfo_avatar" :src="avatar" alt="">
                <div class="Header__userInfo_detail">
                    <div>{{ $store.getters.g_user.userName }} <span class="Header__userInfo_role">{{
                    $store.getters.g_user.roleName
                    }}</span></div>
                    <div style="margin-top: 6px">{{ $store.getters.g_user.mobile }}</div>
                </div>
                <div class="Header__userInfo_sub">
                    <svg style="width:16px;height: 16px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                        data-v-029747aa="">
                        <path fill="currentColor" d="m192 384 320 384 320-384z"></path>
                    </svg>
                </div>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="outLogin"><span style="color:var(--font_clr-danger02)">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from "vue";
import { useStore } from "vuex"
import { useRouter } from "vue-router"
export default defineComponent({
    props: ["classes"],
    setup(prop) {
        const Classes = reactive(prop.classes);
        const Store = useStore()
        const Router = useRouter();
        const logo = ref("")
        const avatar = ref("")
        // setInterval(() => {
        //     Store.commit("UPDATE_NOTICE_COUNT", Store.state.header.noticeCount + 1)
        // }, 1000)
        const outLogin = () => {
            Store.dispatch({ type: "outLogin" })
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        logo.value = window.GETRESOURCE_PALETTE('img_logo')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        avatar.value = window.GETRESOURCE_PALETTE('img_default_avatar')
        return {
            Classes,
            outLogin,
            logo,
            avatar
        }
    }
})
</script>

<style>
.Header__logo {
    width: 88px;
    float: left;
    margin-top: 14px;
}

.Header__module {
    display: flex;
    width: 408px;
    margin: 0 auto;
    height: 100%;
    font-size: var(--font_size-title-medium);
}

.Header__module_blcok {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
}

.Header__module_blcok .Header__module_blcok--text {
    border-bottom: 3px solid transparent;
    box-sizing: border-box;
    position: relative;
}

.Header__module_blcok:hover {
    background: var(--background_clr-light-5);
    cursor: pointer;
}

.Header__module_blcok:hover .Header__module_blcok--text {
    border-bottom-color: var(--background_clr-light);
}

.Header__module_notice {
    min-width: 18px;
    text-align: center;
    display: inline-block;
    position: absolute;
    top: -12px;
    right: -16px;
    padding: 1px 3px;
    background: var(--font_clr-danger02);
    font-style: normal;
    box-sizing: border-box;
    border-radius: 14px;
    font-size: var(--font_size-title-default);
}

.Header__userInfo {
    display: flex;
    width: 200px;
    height: 100%;
    position: absolute !important;
    right: 32px;
    top: 0;
    align-items: center;
    color: var(--font_clr-main);
    cursor: pointer;
    padding: 0 10px;
    box-sizing: border-box;
}

.Header__userInfo :hover {
    background: var(--background_clr-light-5);
}

.Header__userInfo_avatar {
    width: 40px;
    height: 32px;
}

.Header__userInfo_detail {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-left: 8px;
}

.Header__userInfo_role {
    display: inline-block;
    padding: 0 6px;
    background: var(--font_clr-main);
    color: var(--font_clr-high__light--primary);
    border-radius: 2px;
}

.Header__userInfo_sub {
    flex: 0 0 16px;
}
</style>