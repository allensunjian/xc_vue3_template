<!--
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-16 13:30:43
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-10-06 09:16:26
 * @FilePath: \xc_customer-service\src\pages\login\loginPage.vue
 * @Description: LoginPage
-->
<template>
    <div class="Login__page">
        <div class="Login__page_left">
            <img class="Login_element2" src="./img/element-02.png" alt="">
            <img class="Login_element1" src="./img/element-01.png" alt="">
            <img class="Login_element3" src="./img/element-03.png" alt="">
            <img class="Login_element5" src="./img/element-05.png" alt="">
            <div class="Login_element7">
                <span>Welcome</span>
                <span>欢迎进入客服系统</span>
            </div>
            <img class="Login_element6" src="./img/element-06.png" alt="">
            <img class="Login_element8" src="./img/logo_szdl.png" alt="">
            <div class="Login__page_form">
                <div class="Login__tab">
                    <div class="Login__tab_item" :class="{ 'tab-active': State.tabIndex == 1 }" @click="tab(1)">客服登录
                    </div>
                    <div class="Login__tab_item" :class="{ 'tab-active': State.tabIndex == 2 }" @click="tab(2)">后台管理
                    </div>
                </div>
                <div class="Login__content">
                    <div class="Login__content_title" v-if="State.loginType == 1">
                        <!-- <img :src="State.bubble" alt=""> -->
                        <div>短信验证</div>
                        <div class="Login__type_switch">
                            <div class="Login__content_type">账号密码<img :src="State.bubble" alt=""
                                    @click="loginSwitch(2)">
                            </div>
                            <span class="Login__type_wrap">
                                <el-icon class="Login__type_icon">
                                    <Unlock />
                                </el-icon>
                            </span>
                        </div>
                    </div>
                    <div class="Login__content_title" v-if="State.loginType == 2">
                        <!-- <img :src="State.bubble" alt=""> -->
                        <div>账号密码</div>
                        <div class="Login__type_switch">
                            <div class="Login__content_type">短信验证<img :src="State.bubble" alt=""
                                    @click="loginSwitch(1)">
                            </div>
                            <span class="Login__type_wrap">
                                <el-icon class="Login__type_icon">
                                    <ChatLineRound />
                                </el-icon>
                            </span>

                        </div>
                    </div>
                    <div class="Login__content_inputGroup" v-if="State.loginType == 1">
                        <el-input class="w-50 m-2" v-model="LoginParams.mobile" size="large" placeholder="请输入手机号"
                            :prefix-icon="Phone" />
                        <el-input v-if="State.sliderState" class="w-50 m-2" style="margin-top: 10px"
                            v-model="LoginParams.smsCode" size="large" placeholder="请输入验证码" :prefix-icon="Message" />
                        <div class="Login__content_slider">
                            <Slider ref="slider" @statusChange="statusChange"></Slider>
                        </div>
                    </div>
                    <div class="Login__content_inputGroup" v-else-if="State.loginType == 2">
                        <el-input class="w-50 m-2" v-model="LoginParams.username" size="large" placeholder="请输入用户名"
                            :prefix-icon="Phone" />
                        <el-input class="w-50 m-2" show-password style="margin-top: 10px" v-model="LoginParams.password"
                            size="large" placeholder="请输入密码" :prefix-icon="Lock" />
                        <el-row style="margin-top: 10px">
                            <el-col :span="14">
                                <el-input v-model="LoginParams.captcha" size="large" placeholder="请输入验证码"
                                    :prefix-icon="FirstAidKit"></el-input>
                            </el-col>
                            <el-col :span="10">
                                <img @click="getCaptchaUrl" style="width: 100%" :src="State.captchaUrl" alt="">
                            </el-col>
                        </el-row>
                    </div>

                    <el-button class="Login__content_btn" type="primary"
                        :disabled="!State.sliderState && State.loginType == 1"
                        @click="login(State.tabIndex == 1 ? 'CSS_SERVER' : 'CSS_MANAGER')">登录</el-button>

                </div>

            </div>
        </div>
        <div class="Login__page_right">

        </div>
    </div>
</template>

<script lang="ts">
import { getCurrentInstance, reactive } from "vue"
import { useStore } from "vuex";
import { useRouter } from "vue-router"
import { TRole } from "@/store/modules/types";
import { LocalInfo, LocalToken, getUuid } from "../../../Framework/scripts/utils";
import { Phone, Message, Lock, FirstAidKit, ChatLineRound, Unlock } from '@element-plus/icons-vue'
import Slider from "@components/slider/sliderComponents.vue"
import { ElMessage } from "element-plus"
import request from "@/http/request";
import { CentralPlatform } from "@/http/host";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import encrypt from "@/../Framework/scripts/encrypt.js";

const ToLogin = (loginParams: any) => {
    const FromData = new FormData();
    Object.keys(loginParams).forEach((key: string) => {
        FromData.append(key, loginParams[key])
    })
    return request({
        url: CentralPlatform + "/auth/login/in",
        method: "post",
        data: FromData
    })
}
export default {
    components: { Slider, ChatLineRound, Unlock },
    setup() {
        const Ins: any = getCurrentInstance();
        const G = window as any;
        const Store = useStore();
        const Router = useRouter();
        const State: any = reactive({
            tabIndex: 1,
            bubble: G.GETRESOURCE_PALETTE('img_text_tbubble'),
            sliderState: false,
            currentPermissionRoles: [],
            loginType: 1, // 1 手机号验证码 2 手机号密码
            captchaUrl: ""
        })
        const LoginParams = reactive({
            username: "",
            mobile: "",
            smsCode: "",
            clientId: "workst",
            clientSecret: "workstxinchen",
            grantType: "mobile_sms",
            systemCode: "CUSTOMER_SERVICE_SYSTEM",
            password: "",
            key: "",
            uuid: "",
            captcha: ""
        });
        const getCaptchaUrl = () => {
            LoginParams.uuid = getUuid();
            State.captchaUrl = `${CentralPlatform}/auth/captcha?uuid=${LoginParams.uuid}`;
        };
        // 用户名密码登录字段：
        // username
        // password
        // captcha
        // uuid
        // grantType: ""
        // systemCode
        const getSmsCode = () => request({
            url: CentralPlatform + "/auth/smsCode?" + `mobile=${LoginParams.mobile}&smsCode=1001`,
            method: "get"
        })
        const login = () => {
            if (State.loginType == 1 && !LoginParams.smsCode) {
                ElMessage.warning("请输入验证码");
                return
            };


            if (State.loginType == 2 && !LoginParams.username) {
                ElMessage.warning("请输入账号");
                return
            }
            if (State.loginType == 2 && !LoginParams.password) {
                ElMessage.warning("请输入密码");
                return
            };
            if (State.loginType == 2 && !LoginParams.captcha) {
                ElMessage.warning("请输入验证码");
                return
            };

            if (LoginParams.password) {
                // 加密待完成
                let key = "hh4b1cfbeystp2xy";
                const aesPassword = encrypt.aesEncrypt(LoginParams.password, key);
                let publickey =
                    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCraz76TvnJ7hAMssPUgFtDtHgrRCfT9ENklMtxm3LtSr6I2w0sziZlUuI1pv9l81Wq+qFKgLNOn6VvtqDONy01ppGWFPGn1aE6YN8Kfp6u+vpxWC6myAtb+SBdOzqKAge8a+KlxKTKx6LA3nRz3mVW/Tzv120kF+thkkVuOgrO5wIDAQAB";
                Ins.appContext.config.globalProperties.$rsaEncrypt
                let keyEncrypt = Ins.appContext.config.globalProperties.$rsaEncrypt(key, publickey, true);
                LoginParams.key = keyEncrypt
            }
            ToLogin(LoginParams).then((res: any) => {
                if (res.data.code == 0) {
                    const RoleList: Array<any> = res.data.data.roleList;
                    // 过滤客服系统角色
                    const realRoles = RoleList.filter((roleItem: any) => {
                        return roleItem.sysCodes.indexOf('CUSTOMER_SERVICE_SYSTEM') >= 0
                    })
                    // .map((roleItem: any) => roleItem.roleCode);

                    let currentRoles: any[] = [];

                    State.currentPermissionRoles.forEach((role: any) => {
                        if (typeof role == "string") {
                            const idx = realRoles.findIndex((rRole: any) => rRole.roleCode == role)
                            return idx >= 0 && currentRoles.push(realRoles[idx]);
                        }
                        if (typeof role == "function") {
                            currentRoles = currentRoles.concat(role(realRoles))
                        };

                    })
                    if (currentRoles.length >= 2) {
                        ElMessage.warning("该用户存在多重身份");
                    }
                    if (currentRoles.length > 0) {
                        const role = currentRoles[0];
                        const loginInfo = {
                            userName: res.data.data.realName,
                            roleCode: role.roleCode,
                            roleName: role.name,
                            mobile: res.data.data.mobile,
                            clientType: Store.getters.g_client_type,
                            empId: res.data.data.eId
                        };
                        LocalInfo.set(loginInfo);
                        localStorage.setItem("USER_ROLES", JSON.stringify(currentRoles));
                        LocalToken.set(res.data.data.access_token);
                        Store.commit('UPDATE_LOGIN_STATE_SUCCESS');
                        Store.commit('UPDATE_LOGIN_ROLE', role);
                        Router.push({ path: "/" })
                    } else {
                        ElMessage.error("暂无权限")
                    }
                } else {
                    ElMessage.error(res.data.msg);
                }
                getCaptchaUrl()
            })
        };
        const tab = (tabindex: 1 | 2) => {
            State.tabIndex = tabindex;
            const permissionsRoles = {
                1: ["SYSTEM_CSS_MEMBER", "SYSTEM_CSS_LEADER"],
                2: ["SYSTEM_CSS_ADMIN", function (roles: Array<any>) {
                    const HANDLE_CUSTOMER_ROLES = roles.filter((role: any) => {
                        return permissionsRoles[1].indexOf(role.roleCode) == -1 && role.roleCode !== "SYSTEM_CSS_ADMIN"
                    });
                    return HANDLE_CUSTOMER_ROLES
                }]
            };
            const userRoleMap = {
                1: "server",
                2: "manager"
            }
            Store.commit("UPDATE_CLIENTTYPE", userRoleMap[tabindex])
            State.currentPermissionRoles = permissionsRoles[tabindex];
        }
        const statusChange = (state: any) => {
            if (state) {
                if (!LoginParams.mobile) {
                    ElMessage.warning("请输入手机号");
                    Ins.refs.slider.reset();
                    return
                }
                getSmsCode().then((res: any) => {
                    if (res.data.code == 0) {
                        State.sliderState = state
                    } else {
                        Ins.refs.slider.reset();
                        ElMessage.warning(res.data.msg)
                    };

                })
            } else {
                State.sliderState = false
            }
        }
        const loginSwitch = (type: 1 | 2) => {
            State.loginType = type;
            if (type == 1) {
                LoginParams.grantType = "mobile_sms";
            }
            if (type == 2) {
                LoginParams.grantType = "password";
            }

        }
        tab(1);
        getCaptchaUrl()
        return {
            login, tab, State, Phone, Message, statusChange, LoginParams, loginSwitch, Lock, FirstAidKit, getCaptchaUrl
        }
    }
}
</script>

<style>
.Login__type_icon {
    font-size: 30px;
    vertical-align: middle;
    margin-top: -6px;
    color: var(--font_clr-gary__light--1)
}

.Login__type_wrap {
    position: relative;
    display: inline-block;
}

.Login__type_wrap::before {
    content: "";
    position: absolute;
    bottom: -1px;
    left: -5px;
    border-top: 10px solid #fff;
    /* width: 10px; */
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    transform: rotate(45deg);
    z-index: 10;
}

.Login__page {
    display: flex;
    width: 100vw;
    height: 100vh;
    position: relative;
}

.Login__page_left {
    flex: 0 0 68%;
    background: linear-gradient(180deg, #F8FBFF 0%, #E6E9F0 100%);
    height: 100%;
    position: relative;
}

.Login__page_right {
    flex: 1;
    background: var(--font_clr-high__light--primary);
    position: relative;
    z-index: -1;
}

.Login_element6 {
    position: absolute;
    top: 36%;
    right: 290px;
    width: 632px;
    height: 470px;
}

.Login_element7 {
    color: #1362AD;
    position: absolute;
    top: 13%;
    right: 596px;
    display: flex;
    flex-direction: column;
}

.Login_element7 span:first-child {
    font-size: 74px;
}

.Login_element7 span:last-child {
    font-size: 24px;
}

.Login_element1 {
    position: absolute;
    top: 0;
    right: 893px;
    width: 106px;
    height: 278px;
}

.Login_element3 {
    position: absolute;
    top: 14%;
    right: 986px;
    width: 41px;
    height: 278px;
}

.Login_element5 {
    position: absolute;
    top: 75%;
    width: 158px;
    height: 62px;
    right: -79px;
}

.Login_element2 {
    position: absolute;
    top: 57%;
    right: -360px;
    width: 28px;
    height: 278px;

}

.Login_element8 {
    position: absolute;
    top: 3%;
    right: 700px;
    height: 53px;
}

.Login__page_form {
    display: inline-block;
    width: 480px;
    height: 435px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 12px rgba(0, 42, 136, 0.16);
    border: 1px solid #E6E6E6;
    position: absolute;
    right: -240px;
    top: 22%;
    border-radius: 16px;
    box-sizing: border-box;
}

.Login__tab {
    display: flex;
    border-bottom: 1px solid #E6E6E6;
    font-size: 14px;
    cursor: pointer;

}

.Login__tab_item {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 64px;
    border-bottom: 4px solid transparent
}

.Login__tab_item:first-child {
    border-right: 1px solid #E6E6E6;
}

.tab-active {
    font-weight: 600;
    color: #2D70F8;
    border-bottom: 4px solid #2D70F8
}

.Login__content {
    margin: 0 80px;
    position: relative;
    height: calc(100% - 64px);
}

.Login__content_title {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    position: relative;
}

.Login__content_type {
    display: inline-flex;
    width: 77px;
    height: 28px;
    position: absolute;
    justify-content: center;
    align-items: center;
    color: #2D70F8;
    position: relative;
    cursor: pointer;

}

.Login__type_switch {
    line-height: 28px;
}

.Login__content_type img {
    position: absolute;
    top: 0;
    right: 0;
}

.Login__content_slider {
    height: 32px;
    margin-top: 16px;
    border: 1px solid #F5F5F5;
    border-radius: 4px;
}

.Login__content_btn {
    width: 100%;
    position: absolute;
    bottom: 63px;
}
</style>