<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-09-21 09:45:36
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-10-06 09:56:34
 * @FilePath: \xc_customer-service\src\components\headerSelector\hsInstance\headerCascaderComponent.vue
 * @Description: selection
-->
<template>
    <hs :label="props.label" :prop="props.prop" :icon-size="props.iconSize" :icon="props.icon" :scope="props.scope"
        type="handler" behavior="contextmenu" v-slot="slotProps" :tag="tag" @reset="reset" @submit="submit">
        <div class="header__radioGroup">
            <el-radio-group ref="rgroup" v-model="selectOption" @change="change($event, slotProps.change)">
                <el-radio v-for="(item, index) in props.data" :key="'r_' + index" :label="item.value" size="small">
                    {{item.label}}</el-radio>
            </el-radio-group>
        </div>
    </hs>

</template>

<script setup lang="ts">
import hs from "../headerSelectorComponent.vue"
import { defineProps, defineEmits, ref, getCurrentInstance } from "vue"
import { IFunction, IObject } from "@/types/interface";
const selectOption: any = ref(null);
const props = defineProps<{
    icon: string,
    iconSize: number,
    label: string,
    prop: string,
    scope: IObject,
    data: any,
}>();
const tag = ref(null);
const Ins: any = getCurrentInstance();

const change = (e: any, cb: IFunction) => {
    cb(e);
}
const submit = () => {
    if (selectOption.value === null) return
    tag.value = props.data.filter((item: any) => item.value == selectOption.value)[0].label
}
const reset = () => {
    tag.value = null;
    selectOption.value = null
}
</script>

<style scoped>
.header__radioGroup .el-radio-group {
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
}

.header__radioGroup .el-radio {
    margin-right: 0 !important
}
</style>