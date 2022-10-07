<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-22 18:25:32
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-08-24 17:56:30
 * @FilePath: \xc_customer-service\src\pages\server\customers\components\axbar.vue
 * @Description: 实现axbar插槽内容 按钮组实例
-->
<template>
    <div class="Auxbar">
        <div class="Auxbar__title">{{ $route.meta.title }}</div>
        <div class="Auxbar__module">
            <el-button size="small" :type="btn.type ? btn.type : 'primary'" @click="$emit(btn.key)"
                v-for="(btn, index) in Btns" :key="'btn_' + index">{{ btn.text }}</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { SetupContext, EmitsOptions, reactive } from "vue";
export default {
    props: {
        btns: {
            type: Array,
            default: () => ([])
        }
    },
    setup(props: any, ctx: SetupContext<EmitsOptions>) {
        const Btns = reactive(props.btns)
        return {
            Btns
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