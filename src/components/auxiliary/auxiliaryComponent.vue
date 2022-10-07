<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-17 11:28:04
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-05 16:12:36
 * @FilePath: \xc_customer-service\src\components\auxiliary\auxiliaryComponent.vue
 * @Description: 辅助bar
-->
<template>
    <div class="auxiliary__content">
        <slot></slot>


        <!-- <el-button size="small" @click="$store.commit('SET_AUY_STATE', false)">关闭辅助
        </el-button> -->
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.auxiliary__content {
    display: flex;
    flex: 0 0 56px;
    background: var(--font_clr-main);
    padding: 0 10px;
    align-items: center;
    color: #262626;
    font-weight: 600;
    font-size: var(--font_size-title-small)
}
</style>