<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-09-21 09:27:42
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-10-06 09:59:00
 * @FilePath: \xc_customer-service\src\components\headerSelector\headerSelectorComponent.vue
 * @Description: selector
-->
<template>
    <el-popover placement="bottom" :trigger="props.behavior" :visible="visible" width="400"
        v-if="props.type == 'handler' && props.behavior == 'contextmenu'">
        <template #reference>
            <div>
                <div><span @click="show">{{props.label}}<i v-if="props.icon" :class='props.icon'
                            :style="'font-size: ' + (props.iconSize || 16) + 'px'"></i></span></div>
                <div>
                    <span class="tag__style" v-if="tag">
                        <span class="tag__style_content">{{tag}}</span>
                        <span class="tag__style_op">
                            <el-icon :style="'font-size: ' + (props.iconSize || 16) + 'px'" @click="reset">
                                <CircleClose></CircleClose>
                            </el-icon>
                        </span>
                    </span>
                </div>
            </div>
        </template>
        <div style="text-align: center; background: #fff; position: relative">
            <div class="header__title">
                <el-icon @click="visible = false" class="close__icon"
                    style="color: var(--font_clr-high__light--primary)">
                    <Close />
                </el-icon>
            </div>
            <slot :change="change" ref="slot"></slot>
            <div class="header__footer">
                <el-button size="small" link type="primary" @click="reset">
                    重置
                </el-button>
                <el-button size="small" v-if="!props.changeOnly" type="primary" @click="submit">确定</el-button>
                <el-button size="small" v-else link @click="visible = false">取消</el-button>
            </div>

        </div>
    </el-popover>
    <el-popover placement="bottom" :trigger="props.behavior" width="400"
        v-else-if="props.type == 'handler' && props.behavior !== 'contextmenu'">
        <template #reference>
            <div class="header__title_wrap">
                <div><span @click="show">{{props.label}}<i v-if="props.icon" :class='props.icon'></i></span></div>
                <div class="header__title_wrap">
                    <span class="tag__style" v-if="tag">
                        <span class="tag__style_content">{{tag}}</span>
                        <span class="tag__style_op">
                            <el-icon style="font-size: 16px" @click="reset">
                                <CircleClose></CircleClose>
                            </el-icon>
                        </span>
                    </span>
                </div>
            </div>
        </template>
        <div style="text-align: center; background: #fff;">
            <div class="header__title">
                <el-icon @click="visible = false" class="close__icon"
                    style="color: var(--font_clr-high__light--primary)">
                    <Close />
                </el-icon>
            </div>
            <slot :change="change"></slot>
            <div class="header__footer">
                <el-button size="small" link type="primary" @click="reset">
                    重置
                </el-button>
                <el-button size="small" v-if="!props.changeOnly" type="primary" @click="submit">确定</el-button>
                <el-button size="small" v-else link @click="visible = false">取消</el-button>
            </div>

        </div>
    </el-popover>
    <span v-else-if="props.type == 'sort'">
        {{props.label}}
        <span class="header__sort" @click="sortClick()">
            <el-icon class="header__sort--top" :class="{'sort--active': currentSortType == 1}">
                <CaretTop></CaretTop>
            </el-icon>
            <el-icon class="header__sort--bottom" :class="{'sort--active': currentSortType == 0}">
                <CaretBottom></CaretBottom>
            </el-icon>
        </span>
    </span>
</template>

<script setup lang="ts">
import { IObject } from "@/types/interface";
import { defineProps, defineEmits, ref, getCurrentInstance, onDeactivated } from "vue"
import { CaretTop, CaretBottom, CircleClose, Close } from "@element-plus/icons-vue"
const Ins: any = getCurrentInstance()
const visible = ref(false)
const props = defineProps<{
    icon?: string,
    iconSize?: number,
    label: string,
    prop: string,
    scope: IObject,
    type: "handler" | "sort",
    behavior: "click" | "hover" | "contextmenu",
    changeOnly?: false | true,
    tag: null | string,

}>();

let cacheVal: any = null
let currentSortType = ref(0);
const emit = defineEmits<{
    (e: 'change', val: any): void,
    (e: 'submit', val: any): void,
    (e: 'reset'): void,
}>()
const show = () => {
    visible.value = true
}
const change = (data: any) => {
    cacheVal = data;
    emit("change", {
        prop: props.prop,
        val: cacheVal
    });
    if (props.changeOnly) submit()
}

const submit = () => {
    if (cacheVal === null) return;
    emit("submit", {
        prop: props.prop,
        val: cacheVal
    });
    visible.value = false
}

const sortClick = () => {
    const _currentSortType: any = currentSortType.value;
    currentSortType.value = _currentSortType == 0 ? 1 : 0;
    emit("change", {
        prop: props.prop,
        val: currentSortType.value
    })
}

const reset = () => {
    // Ins.refs.slot.reset()
    emit("submit", {
        prop: props.prop,
        val: null
    })
    emit("reset");
    cacheVal = null;
    visible.value = false

}
onDeactivated(() => {
    visible.value = false
})

</script>

<style scoped>
.header__title {
    text-align: right;
    font-size: 20px;
    cursor: pointer;
    position: relative;
    padding-top: 20px;
}

.close__icon {
    position: absolute;
    top: 0;
    right: 0;
}

.header__title_wrap {
    position: relative;
}

.tag__style_content {
    flex: 1;
    padding: 0 2px;
    box-sizing: border-box;
}

.tag__style_op {
    flex: 0 0 20px;
    text-align: center;
    display: flex;
    /* justify-items: center; */
    padding-top: 3px;
    box-sizing: border-box;
    cursor: pointer;
}

.tag__style {
    display: inline-flex;
    width: 100%;
    overflow: hidden;
    height: 24px;
    font-size: 12px;
    justify-items: center;
    background: var(--el-color-primary-light-9);
    border: 1px solid var(--el-color-primary-light-8);
    color: var(--font_clr-high__light--primary);
    font-weight: 500;
    border-radius: 3px;
}

.header__footer {
    border-top: 1px solid #ddd;
    padding-top: 10px;
}

.header__sort {
    position: relative;
}

.header__sort--top {
    position: absolute;
    top: -1px;
    left: 0;
    cursor: pointer;
}

/* .header__sort--top:hover {
    color: var(--font_clr-high__light--primary)
}

.header__sort--bottom:hover, */
.sort--active {
    color: var(--font_clr-high__light--primary)
}

.header__sort--bottom {
    position: absolute;
    bottom: -1px;
    left: 0;
    cursor: pointer;
}
</style>