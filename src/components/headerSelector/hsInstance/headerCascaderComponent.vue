<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-09-21 09:45:36
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-10-06 09:55:38
 * @FilePath: \xc_customer-service\src\components\headerSelector\hsInstance\headerCascaderComponent.vue
 * @Description: cascader
-->
<template>
    <hs :label="props.label" :prop="props.prop" :icon="props.icon" :iconSize="props.iconSize" :scope="props.scope"
        type="handler" behavior="contextmenu" v-slot="slotProps" :changeOnly="true" :tag="tag" @reset="reset">
        <el-cascader ref="cascader" v-if="!props.lazy" @change="change($event, slotProps.change)" :options="props.data"
            style="margin-bottom: 10px" size="small" />
        <el-cascader ref="cascader" v-else-if="props.lazy" @change="change($event, slotProps.change)"
            :props="{lazy: true, lazyLoad: props.lazyLoad}" style="margin-bottom: 10px" size="small" />
    </hs>

</template>

<script setup lang="ts">
import hs from "../headerSelectorComponent.vue"
import { defineProps, defineEmits, getCurrentInstance, ref } from "vue"
import { IFunction, IObject } from "@/types/interface";
const tag = ref(null)
const props = defineProps<{
    icon: string,
    iconSize: number,
    label: string,
    prop: string,
    scope: IObject,
    data?: any,
    lazy?: false | true,
    lazyLoad?: IFunction<void>,
    // tag: string
}>();
const Ins: any = getCurrentInstance();
const change = (e: any, changeback: IFunction) => {
    changeback(e);
    try {
        tag.value = Ins.refs.cascader.getCheckedNodes()[0].label
    } catch (error) {
        tag.value = null
    }

}
const reset = () => {
    tag.value = null;
    Ins.refs.cascader?.handleClear()
}

</script>

<style>

</style>y