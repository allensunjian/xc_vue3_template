<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-23 13:19:41
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-10-06 10:58:39
 * @FilePath: \xc_customer-service\src\pages\server\customers\components\stateBar_customer.vue
 * @Description: 客户管理实现statebar 到店顾客
-->
<template>
    <div class="stateBar">
        <StateBar ref="stateBar" :options="options" @event="event" @change="change"></StateBar>
    </div>
</template>

<script lang="ts">
// 0 登记时间 1 预约登记时间
import StateBar from "@/components/stateBar/stateBarComponent.vue";
import { reactive, SetupContext, EmitsOptions, onMounted, watch, getCurrentInstance } from "vue"
import { getChannels, getOrganStores, ageRange } from "@/http/modules/option_block"
import { TimestampToDate } from "@/../Framework/scripts/utils"
import { ElCascader } from "element-plus"
import request from "@/http/request"
import { CentralPlatform } from "@/http/host"
import { file } from "@babel/types";
const currentTime = new Date().getTime();
export default {
    components: { StateBar },
    props: {
        values: {
            type: Object,
            default: () => ({
                daterange: [TimestampToDate(currentTime, "YY-MM-DD"), TimestampToDate(currentTime, "YY-MM-DD")],
                institutionId: null,
                arriveShopType: 0,
                cascaderValue: [],
                age: -1,
                inputval: ""
            })
        }
    },
    setup(props: any, ctx: SetupContext<EmitsOptions>) {
        const values = reactive(props.values);
        const cascaderProps = {
            lazy: true,
            lazyLoad: (() => {
                let rootNode: any = [];
                let DATAS: any = {};
                return (node: any, resolve: any) => {
                    const { level, data } = node;
                    if (level == 0) {
                        if (rootNode.length > 0) return resolve(rootNode)
                        request({
                            url: CentralPlatform + "/customerCenter/channelsetting/channel/list",
                            method: "post"
                        }).then(res => {
                            if (res.data.code == 0) {
                                let nodes = res.data.data.map((item: { channelId: number, channelName: string }) => ({
                                    value: item.channelId,
                                    label: item.channelName,
                                    leaf: level >= 1
                                }))
                                rootNode = nodes
                                resolve(nodes)
                            }
                        })
                    } else {
                        const query = {
                            channelId: data.value,
                            channelName: data.label
                        }
                        const cache = DATAS[JSON.stringify(query)];
                        if (cache) return resolve(cache)
                        request({
                            url: CentralPlatform + "/customerCenter/channelsetting/subchannel/list",
                            method: "post",
                            data: query
                        }).then(res => {
                            if (res.data.code == 0) {
                                let nodes = res.data.data.map((item: { channelId: number, subclassName: string }) => ({
                                    value: item.channelId,
                                    label: item.subclassName,
                                    leaf: level >= 1
                                }))
                                resolve(nodes);
                                DATAS[JSON.stringify(query)] = nodes
                            }
                        })
                    }
                }
            })()
        }
        const Ins: any = getCurrentInstance();
        const options: any = {
            data: reactive({
                daterange: [],
                arriveShopType: 0,
                institutionId: null,
                cascaderValue: [],
                inputval: "",
                cascaderProps,
                age: -1,

            }),
            depData: reactive({
                ageOptions: [],
                stores: [],
                arriveShopTypeOptions: [
                    {
                        label: "首次到店",
                        value: 0
                    },
                    {
                        label: "末次到店",
                        value: 1
                    }
                ],
                appointStatusOptions: [],
                channels: []
            }),
            items: [
                {
                    type: "select",
                    options: "arriveShopTypeOptions",
                    key: "arriveShopType",
                    classList: ["stateBar__dateRange_select", "merge__element"],
                    config: {
                        size: "small",
                    },
                },
                {
                    type: "date:range",
                    key: "daterange",
                    classList: ["stateBar__dateRange", "handle__style", "merge__element"],
                    labelClassList: ["stateBar__dateRange_label"],
                    config: {
                        clearable: false,
                        format: "YYYY/MM/DD",
                        // valueFormat: "YYYY/MM/DD",
                        style: "width: 300px",
                        size: "small"
                    },

                },
                {
                    type: "slot",
                    component: ElCascader,
                    slotOptions: {
                        props: [
                            { prop: "props", value: "cascaderProps" },
                            {
                                prop: "modelValue",
                                value: "cascaderValue"
                            },
                            {
                                prop: "size",
                                value: "small",
                                type: "self"
                            },
                            {
                                prop: "style",
                                value: "margin-right:20px",
                                type: "self"
                            },
                        ],
                        receiver: ["change"]
                    },
                    classList: ["stateBar__dateRange_select"]
                },
                {
                    type: "select",
                    options: "stores",
                    key: "institutionId",
                    classList: ["stateBar__dateRange_select"],
                    config: {
                        size: "small",
                    },
                    placeholder: "门店"
                },
                {
                    type: "select",
                    options: "ageOptions",
                    key: "age",
                    classList: ["stateBar__dateRange_select"],
                    config: {
                        size: "small",
                    },
                    placeholder: "年龄"
                },
                {
                    type: "button",
                    text: "重置",
                    sType: "primary",
                    key: "reset",
                    classList: ["stateBar__layout_pr--20"],
                    config: {
                        size: "small",
                        onClick: () => {
                            options.data.daterange = values.daterange;
                            options.data.arriveShopType = values.arriveShopType;
                            options.data.institutionId = values.institutionId;
                            options.data.cascaderValue = [];
                            options.data.age = -1;
                            options.data.inputval = values.inputval;
                        }
                    }
                },
                {
                    type: "input",
                    key: "inputval",
                    placeholder: "请输入顾客姓名/电话",
                    icon: "Search",
                    config: {
                        autocomplete: "off",
                        clearable: true,
                        size: "small"
                    },
                    classList: ["stateBar__layout_search"]
                },
            ]
        };
        const event = (e: any) => ctx.emit("event", e)
        const change = (e: any) => ctx.emit("change", e)

        onMounted(() => {
            // console.log(JSON.stringify(values))
            const val = JSON.parse(JSON.stringify(values))
            options.data.daterange = val.daterange
            options.data.appointStatus = val.appointStatus;
            options.data.subChannelId = val.subChannelId;
            options.data.inputval = val.inputval;
            getChannels().then((list: any) => {
                options.depData.channels = list.map((item: any) => ({
                    label: item.channelName,
                    value: item.channelId
                }));
                options.depData.channels.push({
                    label: "所有渠道",
                    value: -1
                })
            });
            getOrganStores().then((list: any) => {
                options.depData.stores = list.map((item: any) => ({
                    label: item.organName,
                    value: item.organId,
                }))
            })

            ageRange().then((list: any) => {
                options.depData.ageOptions = list.filter((item: any) => item.value)
            })
        })
        return {
            options, event, change
        }
    }
}
</script>

<style>
.stateBar {}

.stateBar__dateRange {
    width: 260px !important;
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

.handle__style {
    margin-left: -10px;
}
</style>