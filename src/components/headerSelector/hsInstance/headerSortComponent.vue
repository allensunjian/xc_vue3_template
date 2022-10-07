<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-09-21 09:45:36
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-22 16:22:57
 * @FilePath: \xc_customer-service\src\components\headerSelector\hsInstance\headerCascaderComponent.vue
 * @Description: sort
-->
<template>
    <hs :label="props.label" :prop="props.prop" :scope="props.scope" type="sort" behavior="hover" :tag="null"></hs>

</template>

<script setup lang="ts">
import hs from "../headerSelectorComponent.vue"
import { defineProps, defineEmits, ref } from "vue"
import { IObject } from "@/types/interface";
const selectOption: any = ref(null);
const props = defineProps<{
    label: string,
    prop: string,
    scope: IObject,
}>();

</script>

<style scoped>
.header__radioGroup .el-radio-group {
    flex-direction: column;
}

.header__radioGroup .el-radio {
    margin-right: 0 !important
}
</style>