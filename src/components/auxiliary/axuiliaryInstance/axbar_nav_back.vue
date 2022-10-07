<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-22 18:25:32
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-06 10:36:15
 * @FilePath: \xc_customer-service\src\pages\server\customers\components\axbar.vue
 * @Description: 实现axbar插槽内容 路由返回
-->
<template>
    <div class="Auxbar">
        <div class="Auxbar__title" @click="navTo">
            <el-icon>
                <ArrowLeft></ArrowLeft>
            </el-icon>
            {{ title || $route.meta.title }}
        </div>
        <div class="Auxbar__module">
            <el-button size="small" :type="btn.type ? btn.type : 'primary'" @click="$emit(btn.key)"
                v-for="(btn, index) in Btns" :key="'btn_' + index">{{ btn.text }}</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
import { SetupContext, EmitsOptions, reactive } from "vue";
import { useRouter } from 'vue-router';
export default {
    props: {
        path: {
            type: String,
            default: "/"
        },
        btns: {
            type: Array,
            default: () => ([])
        },
        title: {
            type: String,
            default: ""
        }
    },
    components: { ArrowLeft },
    setup(props: any, ctx: SetupContext<EmitsOptions>) {
        const Router = useRouter();
        const navTo = () => {
            try {
                Router.go(-1)
            } catch (error) {

                Router.replace(props.path || "/")
            }

        }
        const Btns = reactive(props.btns)

        return {
            navTo, Btns
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
    cursor: pointer;
}



.Auxbar__module {
    flex: 1;
}

.Auxbar__module {
    display: flex;
    justify-content: flex-end;
}
</style>