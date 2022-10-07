<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-09-21 09:45:36
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-10-06 09:56:28
 * @FilePath: \xc_customer-service\src\components\headerSelector\hsInstance\headerCascaderComponent.vue
 * @Description: search list
-->
<template>
    <hs :label="props.label" :prop="props.prop" :icon-size="props.iconSize" :icon="props.icon" :scope="props.scope"
        type="handler" :changeOnly="true" behavior="contextmenu" v-slot="slotProps" :tag="tag" @submit="submit"
        @reset="reset">
        <div class="header__radioGroup">
            <el-input v-model="searchQuery" size="small" placeholder="选择预约门店" @input="toSearch" :suffix-icon="Search" />
        </div>
        <div class="header__searchList reset__scrollbar">
            <div v-for="(item, index) in optionList" :key="'s_' + index" class="header__searchList_item"
                :class="{'sideActive': State.seaactiveIndex == index}"
                @click="selected(slotProps.change, item.value, index)">
                {{item.label}}
            </div>
        </div>
    </hs>

</template>

<script setup lang="ts">
import hs from "../headerSelectorComponent.vue"
import { defineProps, defineEmits, ref, reactive, computed } from "vue"
import { IFunction, IObject } from "@/types/interface";
import { Search } from '@element-plus/icons-vue'
import { Throttling, copy } from "@/../Framework/scripts/utils"


const searchQuery: any = ref("");
const State: any = reactive({
    seaactiveIndex: null,
    searchStr: ""
})
const toSearch = Throttling(100, (val: string) => {
    State.searchStr = val;
});
const selected = (fn: IFunction, val: any, index: number) => {
    fn(val);
    State.seaactiveIndex = index
}

const tag = ref(null);

const props = defineProps<{
    icon: string,
    iconSize: number,
    label: string,
    prop: string,
    scope: IObject,
    data: Array<any>,
}>();

const submit = () => {
    setTimeout(() => {
        tag.value = optionList.value[State.seaactiveIndex].label;
        console.log(tag.value);
    }, 100)
}
const reset = () => {
    searchQuery.value = "";
    tag.value = null;
    State.seaactiveIndex = null

}
const optionList = computed(() => {
    return props.data.filter((item: any) => item.label.indexOf(State.searchStr) >= 0)
})

</script>

<style scoped>
.header__searchList {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    height: 200px;
    overflow: hidden;
    overflow-y: auto;
    margin-top: 10px;
}

.header__searchList_item {
    padding: 4px 10px;
    width: 100%;
    text-align: left;
    flex: 1;
}


.header__searchList_item:hover {
    background: var(--background_clr-light-4);
}

.header__radioGroup .el-radio-group {
    flex-direction: column;
}

.header__radioGroup .el-radio {
    margin-right: 0 !important
}
</style>