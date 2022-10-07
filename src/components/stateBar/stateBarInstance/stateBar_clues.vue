<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-23 13:19:41
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-08-24 17:29:26
 * @FilePath: \xc_customer-service\src\pages\server\customers\components\stateBar_customer.vue
 * @Description: 客户管理实现statebar
-->
<template>
    <div class="stateBar">
        <StateBar :options="options" @event="event" @change="change"></StateBar>
    </div>
</template>

<script lang="ts">
import StateBar from "@/components/stateBar/stateBarComponent.vue";
import { reactive, SetupContext, EmitsOptions } from "vue"

export default {
    components: { StateBar },
    setup(props: any, ctx: SetupContext<EmitsOptions>) {
        const options = reactive({
            data: {
                daterange: ["2022-01-01", "2022-10-10"],
                selectVal: 1,
                inputval: ""
            },
            depData: {
            },
            items: [
                {
                    type: "select",
                    options: "options",
                    key: "selectVal",
                },
                {
                    type: "date:range",
                    key: "daterange",
                    classList: ["stateBar__dateRange"],
                    labelClassList: ["stateBar__dateRange_label"],
                    config: {
                        clearable: false
                    }
                },
                {
                    type: "select",
                    options: "options",
                    classList: ["stateBar__dateRange_select"],
                    key: "selectVal"
                },
                {
                    type: "select",
                    options: "options",
                    classList: ["stateBar__dateRange_select"],
                    key: "selectVal"
                },
                {
                    type: "select",
                    options: "options",
                    classList: ["stateBar__dateRange_select"],
                    key: "selectVal"
                },
                {
                    type: "input",
                    key: "inputval",
                    placeholder: "请输入顾客姓名/电话",
                    icon: "Search",
                    config: {
                        autocomplete: "off",
                        clearable: true
                    },
                    classList: ["stateBar__layout_search"]
                }
            ]
        });
        const event = (e: any) => ctx.emit("event", e)
        const change = (e: any) => ctx.emit("change", e)
        setTimeout(() => {
            options.depData = {
                options: [
                    { label: "选项1", value: 1 },
                    { label: "选项2", value: 2 },
                    { label: "选项3", value: 3 },
                    { label: "选项4", value: 4 },
                ]
            }
        }, 2000)
        return {
            options, event, change
        }
    }
}
</script>

<style>
.stateBar {}

.stateBar__dateRange {
    width: 300px !important;
    margin-right: 20px;
    font-size: 12px !important
}

.stateBar__dateRange_label {
    width: 70px;
}

.stateBar__dateRange_select {
    width: 200px !important;
    margin-right: 20px;
}

.stateBar__layout_pr--20 {
    margin-right: 10px;
}

.stateBar__layout_search {
    float: right;
}
</style>