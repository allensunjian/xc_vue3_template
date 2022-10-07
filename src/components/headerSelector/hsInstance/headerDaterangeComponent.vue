<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-09-21 09:45:36
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-10-06 09:56:02
 * @FilePath: \xc_customer-service\src\components\headerSelector\hsInstance\headerCascaderComponent.vue
 * @Description: datarange
-->
<template>
    <hs :label="props.label" :prop="props.prop" :icon-size="props.iconSize" :icon="props.icon" :scope="props.scope"
        type="handler" :changeOnly="true" behavior="contextmenu" v-slot="slotProps" :tag="tag" @submit="submit"
        @reset="reset">
        <div class="header__radioGroup">
            <el-date-picker ref="picker" value-format="YYYY-MM-DD" format="YYYY/MM/DD" @change="slotProps.change"
                type="daterange" v-model="daterange" />
        </div>
    </hs>

</template>

<script setup lang="ts">
import hs from "../headerSelectorComponent.vue"
import { defineProps, defineEmits, ref, getCurrentInstance } from "vue"
import { IObject } from "@/types/interface";
const daterange: any = ref([]);
const props = defineProps<{
    icon: string,
    iconSize: number,
    label: string,
    prop: string,
    scope: IObject,
}>();
const Ins: any = getCurrentInstance();
const tag = ref(null);
const submit = () => {
    tag.value = daterange.value.join("至")
}
const reset = () => {
    tag.value = null
    daterange.value = []
}
</script>

<style scoped>
.header__radioGroup .el-radio-group {
    flex-direction: column;
}

.header__radioGroup .el-radio {
    margin-right: 0 !important
}
</style>