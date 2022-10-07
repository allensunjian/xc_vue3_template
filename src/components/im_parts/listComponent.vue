<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-25 10:12:01
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-08-25 15:14:00
 * @FilePath: \xc_customer-service\src\components\im_parts\listComponent.vue
 * @Description: 抽象IM列表部件
-->
<template>
    <div class="IMList">
        <div class="IMList_list01">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="在线沟通中" name="1">
                    <div class="IMList_list_itemContent reset__scrollbar">
                        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
                    </div>
                </el-collapse-item>
                <el-collapse-item title="在线访客" name="2">
                    <div class="IMList_list_itemContent reset__scrollbar">

                    </div>
                </el-collapse-item>
                <el-collapse-item title="离线顾客" name="3">
                    <div class="IMList_list_itemContent reset__scrollbar">

                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="IMList_list02" v-show="Show">
            <div class="IMList_list_bar">
                <el-icon style="transform:translateY(2px)">
                    <ArrowLeft />
                </el-icon>
                <span style="padding-left: 10px">李易峰</span>
            </div>
            <div class="IMList_list_item">
                <div>昵称 <span>15:43</span></div>
                <div> <span>tag</span></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { ArrowLeft } from '@element-plus/icons-vue'
export default {
    components: { ArrowLeft },
    setup() {
        const activeName = ref("1");
        const Show = ref(false);
        interface Tree {
            label: string
            children?: Tree[],
            id?: number
        }

        const handleNodeClick = (data: Tree) => {
            console.log(data)
            if (data.id) {
                Show.value = true
            } else {
                Show.value = false
            }
        }

        const data: Tree[] = [
            {
                label: '文案策划部',
                children: [
                    {
                        label: '李易峰',
                        id: 1
                    },
                    {
                        label: '杨紫',
                        id: 2
                    }
                ],
            },
            {
                label: '快手咨询部'
            },
            {
                label: '网易知乎咨询组'
            },
        ]

        const defaultProps = {
            children: 'children',
            label: 'label',
        }
        return { activeName, defaultProps, data, handleNodeClick, Show }
    }
}
</script>

<style scoped>
.IMList_list_item {
    height: 80px;
}

.IMList_list_itemContent {
    height: calc(100vh - 64px - 56px - 20px - 149px);
    overflow: hidden;
}

.IMList_list01 {
    display: inline-block;
    width: 260px;
    height: 100%;
    box-sizing: border-box;
    vertical-align: top;
    padding: 0 10px;
    background: var(--font_clr-main);
}

.IMList_list02 {
    display: inline-block;
    width: 260px;
    height: 100%;
    box-sizing: border-box;
    vertical-align: top;
    margin-left: 2px;
    background: var(--font_clr-main);
}

.IMList {
    height: 100%;

}

.IMList_list_bar {
    height: 40px;
    line-height: 40px !important;
    padding: 0 10px;
    font-size: var(--font_size-title-small);
    font-weight: 600;
}
</style>