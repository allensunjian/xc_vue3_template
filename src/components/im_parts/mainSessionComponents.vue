<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-25 10:13:15
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-08-25 15:13:50
 * @FilePath: \xc_customer-service\src\components\im_parts\mainSessionComponents.vue
 * @Description: im会话抽象组件
-->
<template>
    <div class="IMSessionContent">
        <div class="IMSessionContent__im">
            <div class="IMSessionContent__im_view">
                <div class="IMSessionContent__im_view--title">
                    <span class="small__title">李易峰</span>
                    <span class="subtext">来自快手</span>
                    <span class="text__clr_primary">顾客详情</span>
                    <div class="IMSessionContent__im_view--swicth">
                        分析
                        <el-switch v-model="State.swicth" size="small" />
                    </div>
                </div>
                <div class="IMSessionContent__im_inview">
                    <div class="IMSessionContent__im_view--error">
                        访客等待00:03:01
                    </div>
                    <div class="IMSessionContent__im_inview--flow"></div>
                    <div class="IMSessionContent__im_list"></div>
                </div>

            </div>
            <div class="IMSessionContent__im_input">
                <div class="IMSessionContent__im_view--title">
                    正在输入...那行，要提前预约…
                </div>
                <div class="IMSessionContent__im_input--tar">

                </div>

            </div>
        </div>
        <div class=" IMSessionContent__form">
            <div class="IMSessionContent__form--content">
                <div class="IMSessionContent__form_title">
                    <span class="small__title">顾客信息</span>
                    <span class="IMSessionContent__form_add">新增</span>
                    <div class="IMSessionContent__form_states">
                        <span class="IMSessionContent__form_state circle__point_primary">&nbsp;&nbsp;手动输入</span>
                        <span class="IMSessionContent__form_state circle__point_warning">&nbsp;&nbsp;系统识别</span>
                    </div>
                </div>
            </div>
            <div class="IMSessionContent__form--info"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
export default {
    setup() {
        const State = reactive({
            swicth: false
        });
        return {
            State
        }
    }

}
</script>

<style scoped>
.IMSessionContent__form_state {
    margin-left: 16px;
}

.IMSessionContent__form_states {
    float: right;
    font-size: var(--font_size-title-default);
}

.IMSessionContent__form_add {
    color: var(--font_clr-high__light--primary);
    margin-left: 16px;
}

.IMSessionContent__form_title {
    height: 60px;
    line-height: 60px;
    padding-right: 20px;
}

.IMSessionContent__form_title::before {
    display: inline-block;
    content: "";
    width: 4px;
    height: 16px;
    background: var(--font_clr-high__light--primary);
    margin-right: 10px;
    margin-bottom: -2px;
}

.IMSessionContent__form--info {
    flex: 1;
    margin-top: 10px;
    background: var(--font_clr-main);
}

.IMSessionContent__form--content {
    flex: 1;
    background: var(--font_clr-main);
}

.IMSessionContent__im_inview--flow {
    flex: 0 0 130px;
    background: var(--background_clr-light-3);

}

.IMSessionContent__im_list {
    flex: 1;
    background: var(--background_clr-light-2);
}

.IMSessionContent__im_inview {
    flex: 1;
    /* background: var(--font_clr-main); */
    position: relative;
    display: flex;
}

.subtext {
    padding: 0 4px
}

.IMSessionContent__im_view--swicth {
    float: right;
}

.IMSessionContent__im_view--title {
    flex: 0 0 40px;
    line-height: 40px;
    padding: 0 12px;
    box-sizing: border-box;
    background: var(--background_clr-light-2);
}

.IMSessionContent__im_view--error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: var(--background_clr-danger-light);
    text-align: center;
    color: var(--font_clr-danger01);

}

.IMSessionContent {
    display: flex;
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    border-left: 1px solid var(--border_clr-main);
}

.IMSessionContent__im {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
}

.IMSessionContent__form {
    flex: 0 0 690px;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.IMSessionContent__im_view {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
}

.IMSessionContent__im_input {
    flex: 0 0 234px;
    display: flex;
    flex-direction: column;

}

.IMSessionContent__im_input--tar {
    flex: 1;
    background: var(--background_clr-light-2)
}

.IMSessionContent__im_input .IMSessionContent__im_view--title {
    background: var(--font_clr-main);
}
</style>
