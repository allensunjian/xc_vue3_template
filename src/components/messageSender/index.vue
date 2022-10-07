<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-09-27 16:13:23
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-28 10:45:08
 * @FilePath: \xc_customer-service\src\components\messageSender\index.vue
 * @Description: 根据短信模板发送短信
-->
<template>
    <el-dialog title="发送短信" width="1158px">
        <div class="messageSender__body">
            <div class="messageSender__header">
                <span class="messageSender__textitem"><span class="messageSender__textitem_label">姓名：</span>
                    {{Result.data.name}}</span>
                <span class="messageSender__textitem"><span class="messageSender__textitem_label">手机号：</span>
                    {{Result.data.mobile}}</span>
                <span class="messageSender__textitem"><span class="messageSender__textitem_label">预约时间：</span>
                    {{Result.data.appointTime}}</span>
                <span class="messageSender__textitem"><span class="messageSender__textitem_label">预约门店：</span>
                    {{Result.data.institutionName}}</span>
            </div>
            <div class="messageSender__header pt--18">
                <div class="messageSender__acitem">
                    <el-input v-model="searchStr" @input="searchQuery" style="width: 264px;" size="small"
                        placeholder="搜索模板" :prefix-icon="Search" clearable></el-input>
                </div>
                <div class="messageSender__acitem ml-14">
                    接收号码：<el-input-number v-model="phoneNumber" class="only__number" style="width: 160px" size="small"
                        placeholder="号码">
                    </el-input-number>
                </div>
            </div>
            <div class="messageSender__body_content pt--18">
                <div class="messageSender__contentitem mr-14 bg--gray reset__scrollbar">
                    <div v-for="(item, index) in Result.data.infos" :key="'m_' + index">
                        <div class="messageSender__temp">
                            <div style="font-size:var(--font_size-title-medium); font-weight: 600">{{item.modelName}}
                            </div>
                        </div>
                        <div v-for="(info, idx) in item.infos" :key="'info_' + idx">
                            <div class="messageSender__detail">
                                {{info.modelContent}}
                            </div>
                            <div class="messageSender__content_footer pt--18">
                                <el-button size="small" @click="SendMessageTemp(info)">直接发送</el-button>
                                <el-button type="primary" size="small" @click="editMessageTemp(info)">编辑发送</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="messageSender__contentitem reset__scrollbar ml-14" contenteditable="true"
                    v-html="currentTemplate" ref="msgContent"></div>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取消</el-button>
                <el-button type="primary" @click="SendMessageTemp" size="small">发送</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { onMounted, reactive, watch, defineProps, ref, getCurrentInstance } from "vue"
import request from "@/http/request"
import { CentralPlatform } from "@/http/host"
import { CacheTransfer } from "@/../Framework/scripts/transfer";
import { Throttling, HttpClosure, LocalInfo } from "@/../Framework/scripts/utils"
import { MessageState } from "@/types/state"
import { ElMessage } from "element-plus";
// import { useStore } from "vuex"
// const Store = useStore();
const searchStr = ref("");
const phoneNumber = ref(0)
const currentTemplate = ref("");
const props = defineProps<{
    data: {
        institutionId: number | string,
        patientId: number | string
    }
}>();
const TransferInstance = new CacheTransfer({
    query: {
        "institutionId": 10,
        "modelTitle": "",
        "patientId": 0
    },
    result: {
        Data: {}
    }
});
const searchQuery = Throttling(100, (val) => {
    Query.modelTitle = val
})

const Ins: any = getCurrentInstance();
watch(() => props.data, (val: any) => {
    Query.institutionId = val.institutionId;
    Query.patientId = val.patientId;
})
const post = HttpClosure(CentralPlatform + "/customerCenter/cusmanage/smsmodle/list", "post", request);
TransferInstance.mount(reactive);
const Query = TransferInstance.getQuery();
TransferInstance.capture(post, (respones: any) => {
    if (respones.data.code == 0) {
        const ret: any = respones.data.data
        phoneNumber.value = Number(ret.mobile)
        return ret;
    } else {
        return { data: {} };
    }
});
const Result = TransferInstance.getResult();
const editMessageTemp = (data: any) => {
    currentTemplate.value = FormattValString(data.modelContent);
}
const SendMessageTemp = (data?: any) => {
    const content = data && data.modelContent ? data.modelContent : Ins.refs.msgContent.innerText
    request({
        url: CentralPlatform + "/customerCenter/cusmanage/sms/send",
        method: "post",
        data: {
            content,
            mobile: phoneNumber.value
        }
    }).then((res: any) => {
        if (res.data.code == 0) {
            ElMessage.success("发送成功")
        }
    })

}

const FormattValString = (temp: string) => {
    // 数据缺少相应的字段， 預約編號 前台电话 客服手機號 客服姓名
    console.log(temp, Result)
    console.log(MessageState);
    // 这里记录下 修改 枚举信息 替换成真实
    Object.keys(MessageState).forEach((key: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore 
        temp = temp.replace(new RegExp(`{{${key}}}`, "g"), Result.data[MessageState[key]])
    });
    return temp
}
</script>

<style scoped>
.messageSender__content_footer {
    text-align: center;
}

.messageSender__body_content {
    display: flex;
}

.messageSender__contentitem {
    flex: 1;
    padding: 14px 22px;
    border: 1px solid var(--border_clr-main);
    white-space: pre-line;
    border-radius: 4px;
    max-height: 450px;
    overflow: hidden;
    overflow-y: auto;
}

.messageSender__contentitem:first-child {
    border: none
}

.messageSender__detail {
    word-break: break-all;
}

.messageSender__body {
    padding: 0 20px;
}

.messageSender__header {
    display: flex;
}

.bg--gray {
    background: var(--background_clr-light-2);
}

.mr-14 {
    margin-right: 14px;
}

.ml-14 {
    margin-left: 14px;
}

.pt--18 {
    padding-top: 18px;
}

.messageSender__acitem {
    flex: 1;
}

.messageSender__textitem {

    margin-right: 56px;
    color: var(--font_clr-text-default)
}

.messageSender__textitem_label {
    color: var(--font_clr-gary__light--1);
}
</style>