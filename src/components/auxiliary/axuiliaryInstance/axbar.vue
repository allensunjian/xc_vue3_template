<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-22 18:25:32
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-08-24 17:18:08
 * @FilePath: \xc_customer-service\src\pages\server\customers\components\axbar.vue
 * @Description: 实现axbar插槽内容 （新增 && 分派 && 批量操作[批量分配&&群发消息]） 
-->
<template>
    <div class="Auxbar">
        <div class="Auxbar__title">{{ $route.meta.title }}</div>
        <div class="Auxbar__module">
            <el-button size="small" type="primary" @click="$emit('add')">新增</el-button>
            <el-button size="small" type="primary" @click="$emit('distribution')">分配</el-button>
            <el-dropdown style="margin-left: 12px;">
                <el-button size="small" type="primary">
                    批量操作<el-icon class="el-icon--right">
                        <ArrowDown></ArrowDown>
                    </el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="$emit('distributionGroup')">批量分配</el-dropdown-item>
                        <el-dropdown-item @click="$emit('massTexting')">群发消息</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { ArrowDown } from "@element-plus/icons-vue"
export default {
    components: { ArrowDown },
    setup() {
        return {

        }
    }
}
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