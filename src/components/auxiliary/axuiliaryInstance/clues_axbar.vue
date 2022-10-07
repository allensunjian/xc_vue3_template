<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-22 18:25:32
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-08-24 17:14:38
 * @FilePath: \xc_customer-service\src\pages\server\customers\components\axbar.vue
 * @Description: 实现axbar插槽内容
-->
<template>
    <div class="Auxbar">
        <div class="Auxbar__title">{{ $route.meta.title }}</div>
        <div class="Auxbar__module">
            <el-button size="small" type="primary" @click="$emit('add')">新增线索</el-button>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
.Auxbar {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.Auxbar__title {
    flex: 0 0 150px;
}

.Auxbar__module {
    flex: 1;
}

.Auxbar__module {
    display: flex;
    justify-content: flex-end;
}
</style>