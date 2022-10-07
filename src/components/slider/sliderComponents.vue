<template>
    <div v-if="!verifySuccess" class="slider-verification" ref="sliderContainer">
        <div class="slider-left-bg" :style="sliderLeftWidthStyle"></div>
        <div class="prompt-text" :style="verifySuccess ? 'color: var(--el-color-success)' : {}">
            {{  verifySuccess ? '获取成功，' + seconds + 's, 后重新获取' : '向右拖动滑块获取验证码'  }}
        </div>
        <div ref="slider" @mousedown="mouseDownHandler($event)" :class="{ 'slider-verify-success': verifySuccess }"
            class="slider" :style="sliderToLeftStyle"></div>
    </div>
    <div v-else class="slider-verification">
        <div class="prompt-text" :style="verifySuccess ? 'color: var(--el-color-success)' : {}">
            <span v-if="seconds > 0">获取成功, {{  seconds  }}s, 后重新获取</span>
            <span v-else @click="reset">重新获取</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';

/**
 * 组件名称：
 * 组件描述：
 */
export default defineComponent({
    name: 'SliderVerification',
    components: {},
    props: {
        /**
         * 验证成功提示文字样式
         */
        promptTextStyleSuccess: {
            type: Object,
            default: () => ({
                color: 'var(--el-color-success);'
            })
        },
        /**
         * 验证成功需要拖动距离倍数，倍数越大验证成功需要拖动的距离越大
         */
        multiple: {
            type: Number,
            default: 2
        }
    },
    setup(props, context) {
        let sliderState = ref(false)
        let verifySuccess = ref(false)
        let beginClientX = ref(0)
        let maxWidth = ref(0)
        const slideWidth = ref(0)
        let seconds = ref(60);
        const mouseMoveHandler = (e: any) => {
            if (sliderState.value) {
                let width = (e.clientX - beginClientX.value) / props.multiple;
                if (width > 0 && width <= maxWidth.value) {
                    slideWidth.value = width
                } else if (width > maxWidth.value) {
                    slideWidth.value = maxWidth.value
                    verifySuccessFun();
                }
            }
        }
        const moseUpHandler = (e: any) => {
            sliderState.value = false;
            let width = (e.clientX - beginClientX.value) / props.multiple;
            if (width < maxWidth.value) {
                slideWidth.value = 0
            }
        }
        const verifySuccessFun = () => {
            verifySuccess.value = true
            context.emit('statusChange', true)
            document.getElementsByTagName('html')[0].removeEventListener('mousemove', mouseMoveHandler);
            document.getElementsByTagName('html')[0].removeEventListener('mouseup', moseUpHandler);
            slideWidth.value = maxWidth.value
        }
        const slider = ref(null)
        const sliderContainer = ref(null)
        onMounted(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            maxWidth.value = sliderContainer.value && slider.value ? (sliderContainer.value.offsetWidth - slider.value.offsetWidth) : 0
            addListener()
        })
        const addListener = () => {
            document.getElementsByTagName('html')[0].addEventListener('mousemove', mouseMoveHandler);
            document.getElementsByTagName('html')[0].addEventListener('mouseup', moseUpHandler)
        }
        const reset = () => { // 重置
            setTimeout(() => {
                addListener()
                context.emit('statusChange', false)
                beginClientX.value = 0
                sliderState.value = false
                verifySuccess.value = false
                slideWidth.value = 0
                seconds.value = 60
            }, 10)

        };
        watch(verifySuccess, (state: boolean) => {
            if (state) {
                let timer = setInterval(() => {
                    seconds.value--;
                    if (seconds.value <= 0) {
                        // seconds.value = 60;
                        // reset();
                        clearInterval(timer)
                    }
                }, 1000)
            }
        })
        return {
            sliderContainer, slider,
            beginClientX, // 鼠标按下的位置
            sliderState,     // 滑块是否可以移动
            maxWidth,// 滑块验证成功需要移动的最大距离
            verifySuccess,  // 是否验证成功
            slideWidth, // 滑块滑过的区域宽度
            seconds,
            reset,
            mouseDownHandler(e: any) { // 鼠标在滑块上按下事件
                const myThis = this as any;
                if (!myThis.verifySuccess) {
                    myThis.sliderState = true;
                    myThis.beginClientX = e.clientX;
                }
            },
        }
    },
    computed: {
        sliderToLeftStyle() {
            return {
                left: this.slideWidth + 'px'
            }
        },
        sliderLeftWidthStyle() {
            return {
                width: this.slideWidth + 'px'
            }
        }
    }
});
</script>
<style scoped lang="scss">
.slider-verification {
    position: relative;
    background-color: #F5F5F5;
    width: 100%;
    height: 100%;
    line-height: 32px;
    text-align: center;
    user-select: none;
}

.slider {
    position: absolute;
    top: 0;
    width: 48px;
    height: 30px;
    border: 1px solid #E6E6E6;
    background: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%);
    opacity: 1;
    border-radius: 4px;
    box-sizing: border-box;
}

.slider-verify-success {
    background: var(--el-color-success);
    background-size: 30px 30px;
}

//滑块滑过区域的样式
.slider-left-bg {
    background-color: var(--background_clr-light-4);
    width: 0;
    height: 100%;
}

//提示文本样式
.prompt-text {
    position: absolute;
    top: -3px;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 14px;
    line-height: 1;
    padding: 13px;
    color: #BFBFBF;
    opacity: 0.7;
}
</style>