<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-09-23 18:33:59
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-28 15:44:07
 * @FilePath: \xc_customer-service\src\components\toggleInfo\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-drawer title="回访记录">
        <div style="margin-bottom: 20px">
            <span
                style="font-size: var(--font_size-title-medium); font-weight: 600;margin-right:10px">{{info.name}}</span>
            <span style="margin-right:10px">{{genter.getLabel(info.gender)}}</span>
            <span>{{info.mobile}}</span>
        </div>
        <el-timeline>
            <el-timeline-item class="timeline__item" v-for="(item, index) in infoList" :key="'i_' + index"
                :timestamp="item.createDate" placement="top">
                <div class="timeline__card">
                    <div class="form__layout">
                        <div class="form__layout_label">回访人员：</div>
                        <div class="form__layout_content">{{item.ename}}</div>
                    </div>
                    <div class="form__layout">
                        <div class="form__layout_label">回访结果：</div>
                        <div class="form__layout_content">{{callbackStatus.getLabel(item.backResult)}}</div>
                    </div>
                    <div class="form__layout">
                        <div class="form__layout_label">预约状态：</div>
                        <div class="form__layout_content">{{appointmentStatus.getLabel(item.appointStatus)}}</div>
                    </div>
                    <div class="form__layout">
                        <div class="form__layout_label">是否到店：</div>
                        <div class="form__layout_content">{{item.isArrive == 0 ? '未到店' : '已到店'}}</div>
                    </div>
                    <div class="form__layout">
                        <div class="form__layout_label">顾客状态：</div>
                        <div class="form__layout_content">{{costumerStatus.getLabel(item.patientStatus)}}</div>
                    </div>
                    <div class="form__layout">
                        <div class="form__layout_label">下次回访：</div>
                        <div class="form__layout_content">{{item.nextBackTime}}</div>
                    </div>
                    <div class="form__layout">
                        <div class="form__layout_label">备注：</div>
                        <div class="form__layout_content">{{item.remark}}</div>
                    </div>
                    <div class="form__layout">
                        <div class="form__layout_label">附件：</div>
                        <div class="form__layout_content">
                            <div style="display:inline-block" v-for="(file, index) in getFiles(item.fileVoucher)"
                                :key="'f_' + index">
                                <el-image v-if="file.type == 'img'" style="width: 100px; height: 100px" :src="file.url"
                                    :preview-src-list="[
                                      file.url,
                                    ]" :initial-index="4" fit="cover" />
                                <video style="margin-left: 10px" v-else :src="file.url" width="100px"
                                    height="100px"></video>
                            </div>

                            <!-- {{item.fileVoucher}} -->

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
import { costumerStatus, callbackStatus, appointmentStatus, genter } from "@/http/modules/option_block"
const props = defineProps<{
    id: string | undefined,
    info: {
        name: "",
        gender: "",
        mobile: null
    }
}>();
const infoList: any = ref([]);
const getFiles = (fileString: string) => {
    try {
        const arr: Array<string> = fileString.split(",");
        return arr.map((item: any) => {
            const itemArr = item.split(".");
            const type = itemArr[itemArr.length - 1];
            return {
                type: type == "mp4" ? "video" : "img",
                url: item
            }
        })
    } catch (error) {
        return []
    }

}
watch(() => props.id, (id: string) => {
    request({
        url: CentralPlatform + "/customerCenter/cuscluedata/back/info/" + id,
        method: "get"
    }).then((res: any) => {
        if (res.data.code == 0) {
            infoList.value = res.data.data;
            // infoList.value = Object.keys(res.data.data).map((dateTime: string) => {
            //     const innerList: Array<any> = res.data.data[dateTime];
            //     const baseInfo = {
            //         patientName: null,
            //         genter: null,
            //         mobile: null,
            //         creatorName: null
            //     }

            //     return {
            //         ...baseInfo,
            //         eventDate: TimestampToDate(dateTime, "YY-MM-DD"),
            //         infoList: innerList.map((inner: any) => {
            //             if (!baseInfo.patientName) baseInfo.patientName = inner.patientName
            //             if (!baseInfo.genter) baseInfo.genter = inner.genter
            //             if (!baseInfo.mobile) baseInfo.mobile = inner.mobile
            //             if (!baseInfo.creatorName) baseInfo.creatorName = inner.creatorName
            //             return {
            //                 label: inner.logName,
            //                 info: [inner.preInfo, inner.backInfo],
            //                 remark: inner.remark
            //             }
            //         })
            //     }
            // });
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
    flex: 1;
    word-break: break-all;
}

.timeline__card {
    color: var(--font_clr-text-default);
    padding: 10px;
}


.timeline__item:nth-child(2n+1) .timeline__card {
    background: var(--background_clr-light-2);
}
</style>