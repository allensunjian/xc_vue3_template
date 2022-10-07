<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-23 11:28:33
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-26 13:33:54
 * @FilePath: \xc_customer-service\src\components\stateBar\stateBarComponent.vue
 * @Description:stateBar
-->
<template>
    <div>
        <quick-form :form-data="FromData" :quick-options="QuickForm" :dep-options="DepOptions" :onFormEvent="FormEvent"
            :onFormChange="FormChange"></quick-form>
    </div>
</template>
<script lang="ts">
import { Search } from "@element-plus/icons-vue"
import { reactive, ref, h, watch, EmitsOptions } from 'vue';
import * as Icons from "@element-plus/icons-vue";
import { IObject } from '@/types/interface';
export default {
    props: {
        options: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props: any, ctx: { emit: (event: string, ...args: any[]) => void }) {
        const mergeArr = (arr1: Array<any> = [], arr2: Array<any> = []) => {
            typeof arr1 == "string" && (arr1 = [arr1]);
            typeof arr2 == "string" && (arr2 = [arr2]);
            return arr1.concat(arr2).join(" ")
        };
        const CreateQuickFormOptionsForProps = (options: any) => {
            const { items } = options;
            return items.reduce((ref: any, cur: any) => {
                const { label, type, key, classList, labelClassList, format = "YYYY/MM/DD", valueFormat = "YYYY/MM/DD", placeholder = "", options = [], sType = "primary", text = "", config = {}, icon = null } = cur;
                const typeSplits = type.split(":");
                const _type = typeSplits[0];
                const _subType = typeSplits[1] || "";
                let ret: any = {
                    formElementType: _type,
                    type: `${_type}${_subType}`,
                    key,
                    class: mergeArr(classList, ["QuickForm__handle_element"]),
                    placeholder,
                    ...config
                    // size: "small"
                };

                if (_type == "date") {
                    ret.format = format;
                    ret.valueFormat = valueFormat;
                }
                if (_type == "select") {
                    ret.options = options
                }
                if (_type == "button") {
                    ret.type = sType
                    ret.children = [text]
                }
                if (icon && _type == "input") {
                    ret.prefixIcon = (Icons as IObject)[icon]
                }
                if (_type == "slot") {
                    ret.component = cur.component;
                    ret.slotOptions = cur.slotOptions;
                }
                if (label) {
                    // 叠加元素
                    ret = {
                        formElementType: "container",
                        childrenOptions: [
                            {
                                formElementType: "container",
                                class: mergeArr(labelClassList, ["QuickForm__textLabel"]),
                                children: [label]
                            },
                            ret
                        ]
                    }
                };
                ref.push(ret);
                return ref
            }, [])
        };
        const DepOptions = ref({})
        const FromData = reactive(props.options.data || {})
        const QuickForm = {
            formOptions: CreateQuickFormOptionsForProps(props.options),
            layout: {
                labelWidth: 100,
                size: "default",
                labelPosition: "right",
            },
            config: {
                renderType: "hander",
                containerVnode: h("div", { class: ['QuickForm__container reset__scrollbar'] }),
                itemVnode: h("div", { class: ['QuickForm__item'] }),
            }
        };
        const FormEvent = (e: any) => ctx.emit("event", e)
        const FormChange = (e: any) => ctx.emit("change", e)
        watch(props.options.depData, (val) => {
            DepOptions.value = JSON.parse(JSON.stringify(val || {}));
        });
        watch(props.options.data, (val) => {
            Object.keys(val).forEach((key: string) => {
                FromData[key] = val[key]
            })

        })
        return {
            FromData, DepOptions, QuickForm, FormEvent, FormChange
        }
    }
}   
</script>

<style>
.QuickForm__item>div {}

.QuickForm__textLabel {
    display: inline-block;
}

.QuickForm__handle_element {
    /* flex: 1 */
    display: inline-block;
}

.QuickForm__container {
    width: calc(100vw - 80px - 180px);
    white-space: nowrap;
    overflow: hidden;
    overflow-x: auto;
    padding-bottom: 20px;
}


.QuickForm__item {
    display: inline-block;
    vertical-align: middle;
}
</style>