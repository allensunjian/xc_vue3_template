<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-09-14 14:21:27
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-14 14:47:37
 * @FilePath: \xc_customer-service\src\components\auxiliary\axuiliaryInstance\axbar_awesome.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="wrap">
        <div class="shadowTop"></div>
        <div class="shadowBottom"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@property --xPoint {
    syntax: '<length>';
    inherits: false;
    initial-value: 400px;
}

@property --yPoint {
    syntax: '<length>';
    inherits: false;
    initial-value: 300px;
}

@property --x2Point {
    syntax: '<length>';
    inherits: false;
    initial-value: 500px;
}

@property --y2Point {
    syntax: '<length>';
    inherits: false;
    initial-value: 300px;
}

.wrap {
    position: relative;
    margin: auto;
    width: 100%;
    height: 100%;
    background:
        conic-gradient(from -45deg at var(--xPoint) var(--yPoint),
            hsla(170deg, 100%, 70%, .7),
            transparent 50%,
            rgba(182, 207, 252, 0.5) 100%),
        conic-gradient(from 180deg at var(--x2Point) var(--y2Point),
            hsla(170deg, 100%, 70%, .7),
            transparent 50%,
            hsla(219deg, 90%, 80%, .5) 100%),
        linear-gradient(-45deg, #060d5e, #002268);
    animation: pointMove 1s infinite alternate linear;
    overflow: hidden;
    opacity: 0.8;
}

.shadowTop {
    position: absolute;
    top: -300px;
    left: -330px;
    width: 430px;
    height: 300px;
    background: #fff;
    transform-origin: 100% 100%;
    transform: rotate(225deg);
    clip-path: polygon(-100% 100%, 200% 100%, 200% 500%, -100% 500%);
    box-shadow:
        /* 0px 0 .5px hsla(170deg, 95%, 80%, 1),
        0px 0 1px hsla(170deg, 91%, 80%, .95),
        0px 0 2px hsla(171deg, 91%, 80%, .95),
        0px 0 3px hsla(171deg, 91%, 80%, .95),
        0px 0 4px hsla(171deg, 91%, 82%, .9),
        0px 0 5px hsla(172deg, 91%, 82%, .9),
        0px 0 10px hsla(173deg, 91%, 84%, .9),
        0px 0 20px hsla(174deg, 91%, 86%, .85),
        0px 0 40px hsla(175deg, 91%, 86%, .85), */
        0px 0 100% hsla(175deg, 91%, 86%, .85);
    animation: scale 1s infinite alternate linear;
    mix-blend-mode: hard-light;
}

.shadowBottom {
    position: absolute;
    top: 300px;
    left: 500px;
    width: 400px;
    height: 300px;
    background: #000;
    transform-origin: 0 100%;
    clip-path: polygon(0 -100%, -200% -100%, -200% 200%, 0 200%);
    box-shadow:
        /* 0px 0 .5px hsla(170deg, 95%, 80%, 1),
        0px 0 1px hsla(170deg, 91%, 80%, .95),
        0px 0 2px hsla(171deg, 91%, 80%, .95),
        0px 0 3px hsla(171deg, 91%, 80%, .95),
        0px 0 4px hsla(171deg, 91%, 82%, .9),
        0px 0 5px hsla(172deg, 91%, 82%, .9),
        0px 0 10px hsla(173deg, 91%, 84%, .9),
        0px 0 20px hsla(174deg, 91%, 86%, .85),
        0px 0 40px hsla(175deg, 91%, 86%, .85), */
        0px 0 100% hsla(175deg, 91%, 86%, .85);
    animation: scaleBottom 1s infinite -1s alternate linear;
    mix-blend-mode: hard-light;
}

@keyframes scale {

    50%,
    100% {
        transform: rotate(225deg) scale(0);
    }
}

@keyframes scaleBottom {

    50%,
    100% {
        transform: scale(0);
    }
}

@keyframes pointMove {
    0% {
        --x2Point: 500px;
        --y2Point: 600px;
    }

    50% {
        --xPoint: 100px;
        --yPoint: 0;
        --x2Point: 500px;
        --y2Point: 600px;
    }

    0% {
        --xPoint: 100px;
        --yPoint: 0;
        --x2Point: 500px;
        --y2Point: 300px;
    }
}
</style>