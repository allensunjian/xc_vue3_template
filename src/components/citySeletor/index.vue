<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-09-22 17:58:52
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-24 11:24:01
 * @FilePath: \xc_customer-service\src\components\citySeletor\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-select class="citySelector" v-model="State.provinceModel" size="small"
        @change="proviceChange('cityData', $event)">
        <el-option v-for="(item, index) in State.provinceData" :key="'p_' + index" :label="item.cityName"
            :value="String(item.codeId)">
        </el-option>
    </el-select>
    <el-select class="citySelector" v-model="State.cityModel" size="small" @change="proviceChange('areaData', $event)">
        <el-option v-for="(item, index) in State.cityData" :key="'p_' + index" :label="item.cityName"
            :value="String(item.codeId)">
        </el-option>
    </el-select>
    <el-select class="citySelector" v-model="State.areaModel" size="small" @change="proviceChange(null, $event)">
        <el-option v-for="(item, index) in State.areaData" :key="'p_' + index" :label="item.cityName"
            :value="String(item.codeId)">
        </el-option>
    </el-select>
</template>

<script lang="ts" setup>
import { getProvince, getSubArea } from "@/http/modules/option_block"
import { onMounted, reactive, defineEmits, defineProps, watch } from "vue"
const lib: any = {}
const State: any = reactive({
    provinceData: [],
    provinceModel: "",
    cityData: [],
    cityModel: "",
    areaData: [],
    areaModel: ""
})
const props = defineProps<{
    defaultData: {
        provinceModel: string,
        cityModel: string,
        areaModel: string
    }
}>();

const emit = defineEmits<{
    (e: 'change', val: any): void
}>()

watch(() => props.defaultData, (val: any) => {
    State.provinceModel = val.provinceModel;
    val.provinceModel && proviceChange("cityData", val.provinceModel)
    State.cityModel = val.cityModel;
    val.cityModel && proviceChange("areaData", val.cityModel)
    State.areaModel = val.areaModel;
})

const proviceChange = (type: string, id: any) => {
    if (type == "cityData") {
        State.cityModel = "";
        State.areaModel = "";
    }
    if (type == "areaData") {
        State.areaModel = "";
    }
    if (lib[id]) {
        return State[type] = lib[id]
    }
    getSubArea(id).then(res => {
        if (res.data.code == 0) {
            State[type] = res.data.data;
            lib[id] = res.data.data
        }
    })

    emit("change", {
        provinceModel: State.provinceModel,
        cityModel: State.cityModel,
        areaModel: State.areaModel,
    })
}




onMounted(() => {
    getProvince().then((res: any) => {
        State.provinceData = res;
        console.log(res)
    })
})

</script>

<style scoped>
.citySelector {
    display: inline-block;
    width: 30%;
    margin-right: 1%;
}
</style>