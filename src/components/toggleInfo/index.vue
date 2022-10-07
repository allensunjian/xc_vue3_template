<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-09-23 18:33:59
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-23 18:51:48
 * @FilePath: \xc_customer-service\src\components\toggleInfo\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-drawer title="I am the title" :with-header="false">
        <slot></slot>
    </el-drawer>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
const State = reactive({
    drawer: true
})
</script>

<style>

</style>