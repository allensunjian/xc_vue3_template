<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-09-23 18:33:59
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-28 15:41:27
 * @FilePath: \xc_customer-service\src\components\toggleInfo\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-drawer title="修改记录">
        <div style="margin-bottom: 20px">
            <span
                style="font-size: var(--font_size-title-medium); font-weight: 600;margin-right:10px">{{patientInfo.patientName}}</span>
            <span style="margin-right:10px">{{genter.getLabel(patientInfo.gender)}}</span>
            <span>{{patientInfo.mobile}}</span>
        </div>
        <el-timeline>
            <el-timeline-item class="timeline__item reset__scrollbar" v-for="(item, index) in infoList"
                :key="'i_' + index" :timestamp="item.eventDate" placement="top">
                <div class="timeline__card">
                    <div class="form__layout">
                        <div class="form__layout_label">修改人员：</div>
                        <div class="form__layout_content">{{item.creatorName}}</div>
                    </div>
                    <div v-for="(info, idx) in item.infoList" :key="'ii_' + idx">
                        <div class="form__layout">
                            <div class="form__layout_label">{{info.label}}：</div>
                            <div class="form__layout_content">
                                <span style="color:var(--font_clr-gary__light--1)">{{isDateVal(info.info[0])}}</span>
                                <el-icon style="transform: rotate(-90deg);color:var(--font_clr-gary__light--1)">
                                    <SortDown />
                                </el-icon>
                                {{isDateVal(info.info[1])}}
                            </div>
                        </div>
                        <div class="form__layout" v-show="info.remark">
                            <div class="form__layout_label">备注：</div>
                            <div class="form__layout_content">
                                {{info.remark}}
                            </div>
                        </div>
                    </div>

                </div>
            </el-timeline-item>
        </el-timeline>
    </el-drawer>
</template>

<script lang="ts" setup>
import { reactive, defineProps, watch, ref } from "vue";
import request from "@/http/request";
import { CentralPlatform } from "@/http/host"
import { TimestampToDate } from "@/../Framework/scripts/utils"
import { genter } from "@/http/modules/option_block"
import { SortDown } from "@element-plus/icons-vue"
const props = defineProps<{
    id: string | undefined,
}>();
const infoList: any = ref([]);
const patientInfo = ref({
    patientName: "",
    mobile: "",
    gender: ""
})
const isDateVal = (val: any) => {
    const ret = TimestampToDate(new Date(val).getTime(), "YY-MM-DD hh:mm:ss")
    return ret ? ret : val
}
watch(() => props.id, (id: string) => {
    request({
        url: CentralPlatform + "/customerCenter/cuscluedata/clue/info/" + id,
        method: "get"
    }).then((res: any) => {
        if (res.data.code == 0) {
            const Data = res.data.data;
            const baseInfo = {
                creatorName: null
            }
            patientInfo.value = Data;
            infoList.value = Object.keys(Data.infos).map((dateTime: string) => {
                const innerList: Array<any> = Data.infos[dateTime];
                return {
                    eventDate: TimestampToDate(dateTime, "YY-MM-DD hh:mm:ss"),
                    infoList: innerList.map((inner: any) => {
                        if (!baseInfo.creatorName) baseInfo.creatorName = inner.creatorName
                        return {
                            label: inner.logName,
                            info: [inner.preInfo, inner.backInfo],
                            remark: inner.remark
                        }
                    }),
                    ...baseInfo,
                }
            });
            console.log(infoList.value)

        }
    })
});

</script>

<style scoped>
.form__layout {
    display: flex;
}

.form__layout_label {
    flex: 0 0 72px;
    color: var(--font_clr-gary__light--1)
}

.form__layout_content {
    flex: 1
}

.timeline__card {
    color: var(--font_clr-text-default);
    padding: 10px;
}


.timeline__item:nth-child(2n+1) .timeline__card {
    background: var(--background_clr-light-2);
}
</style>