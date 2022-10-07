/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-09-07 10:02:20
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-26 16:02:00
 * @FilePath: \xc_customer-service\src\http\modules\option_block.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "../request";
import { CentralPlatform } from "@/http/host";
import { HttpClosure } from "@/../Framework/scripts/utils";
import { IFunction, IObject } from "@/types/interface";
const Lib: IObject = {
  // 客服角色
  serverRoles: null,
  // 管理角色
  managerRoles: null,
  // 有门店的城市
  cities: null,
  // 所有门店
  stores: null,
  // 所有组
  group: null,
  // 渠道
  channels: null,
  classes: null,
  classList: null,
  dimensionOptions: [
    {
      label: "预约登记时间",
      value: 1,
    },
    {
      label: "约到时间",
      value: 1,
    },
  ],
  platformOptions: null,
  appointmentStateOptions: [
    { label: "已预约", value: 1 },
    { label: "未预约", value: 0 },
  ],
  isThroughOptions: [
    { label: "全部", value: -1 },
    { label: "未接通", value: 0 },
    { label: "接通", value: 1 },
  ],
  isAppointmentOptions: [
    { label: "全部", value: -1 },
    { label: "未预约", value: 0 },
    { label: "已预约", value: 1 },
  ],
  isVoidOptions: [
    { label: "全部", value: -1 },
    { label: "无效", value: 0 },
    { label: "有效", value: 1 },
  ],
  isWechatOptions: [
    { label: "全部", value: -1 },
    { label: "个人微信", value: 1 },
    { label: "企业微信", value: 2 },
    { label: "未加微信", value: 3 },
  ],
  unAppointmentReasons: [
    { label: "全部", value: -1 },
    { label: "未联系上", value: 1 },
    { label: "沟通中断", value: 2 },
    { label: "未确定时间", value: 3 },
    { label: "负评", value: 4 },
    { label: "距离远", value: 5 },
    { label: "非精准", value: 6 },
    { label: "环境因素", value: 7 },
    { label: "外市", value: 8 },
  ],
  distanceTime: [
    { label: "未标记", value: 1 },
    { label: "1小时", value: 2 },
    { label: "1-1.5小时", value: 3 },
    { label: "1.5-2小时", value: 4 },
    { label: "2小时以上", value: 5 },
    { label: "未知", value: 6 },
  ],
  // 顾客症状
  symptomStatus: [
    { label: "全部", value: -1 },
    { label: "未标记", value: 1 },
    { label: "轻度痘", value: 2 },
    { label: "重度痘痘", value: 3 },
    { label: "清洁", value: 4 },
    { label: "黑头", value: 5 },
    { label: "痘痕", value: 6 },
    { label: "毛孔粗大", value: 7 },
    { label: "螨虫", value: 8 },
    { label: "皮肤病", value: 9 },
    { label: "未知", value: 10 },
    { label: "亚健康皮肤", value: 11 },
  ],
  // 年龄
  ageRange: [
    { label: "全部", value: -1 },
    { label: "小于16", value: 1 },
    { label: "16-18", value: 2 },
    { label: "18-25", value: 3 },
    { label: "25-30", value: 4 },
    { label: "30-40", value: 5 },
    { label: "大于40", value: 6 },
    { label: "未知", value: 7 },
  ],
  // 未到店原因
  noArrvialStatus: [
    // { label: "全部", value: -1 },
    { label: "改约", value: 1 },
    { label: "未联系上", value: 2 },
    { label: "评价", value: 3 },
    { label: "删除", value: 4 },
    { label: "不需要", value: 5 },
    { label: "没时间", value: 6 },
    { label: "环境影响", value: 7 },
    { label: "已到店", value: 8 },
  ],
  //回访结果
  callbackStatus: [
    { label: "成功", value: 1 },
    { label: "失败", value: 2 },
    { label: "取消", value: 3 },
    { label: "终止", value: 4 },
  ],
  // 顾客状态
  costumerStatus: [
    { label: "在路上", value: 1 },
    { label: "预约", value: 2 },
    { label: "改约", value: 3 },
    { label: "未接通", value: 4 },
    { label: "挂断", value: 5 },
    { label: "顾客放弃", value: 5 },
    { label: "停机", value: 5 },
    { label: "空号", value: 5 },
  ],
  // 处理
  makeItStatus: [
    { label: "未处理", value: 0 },
    { label: "已处理", value: 1 },
  ],
  // 性别
  genters: [
    { label: "全部", value: -1 },
    { label: "未知", value: 0 },
    { label: "男", value: 1 },
    { label: "女", value: 2 },
  ],
  // 是 && 否
  yAndN: [
    { label: "是", value: 1 },
    { label: "否", value: 0 },
  ],
};

const closureOptionLib = (tag: string, dataGener: any) => () => {
  return new Promise((resolve, reject) => {
    if (Lib[tag]) {
      resolve(Lib[tag]);
    }
    if (dataGener instanceof Promise) {
      dataGener.then((res: any) => {
        if (res.data.code == 0) {
          Lib[tag] = res.data.data;
          resolve(Lib[tag]);
        }
      });
    } else {
      Lib[tag] = dataGener;
      resolve(Lib[tag]);
    }
  });
};

const genGetLabel = (Func: any, List: Array<any>) => {
  const name = "getLabel";
  Func[name] = (value: any) => {
    const ret = List.filter((item) => item.value == value);
    if (ret.length > 0) {
      return ret[0].label;
    } else {
      return null;
    }
  };
};

export const getServerRoles = closureOptionLib(
  "serverRoles",
  HttpClosure(
    CentralPlatform + "/customerCenter/role/list/0",
    "get",
    request
  )({})
);

export const getManagerRoles = closureOptionLib(
  "managerRoles",
  HttpClosure(
    CentralPlatform + "/customerCenter/role/list/1",
    "get",
    request
  )({})
);

export const getCities = closureOptionLib(
  "cities",
  HttpClosure(CentralPlatform + "/hsystem/organ/city", "get", request)({})
);

export const getProvince = closureOptionLib(
  "province",
  HttpClosure(
    CentralPlatform + "/customerCenter/cuscluedata/region/0",
    "get",
    request
  )({})
);
export const getSubArea = (id: number) => {
  return request({
    url: CentralPlatform + "/customerCenter/cuscluedata/region/" + id,
    method: "get",
  });
};

export const getOrganStores = closureOptionLib(
  "stores",
  request({
    url: CentralPlatform + "/customerCenter/smsmodel/organ/list",
    method: "get",
  })
);

export const getAllGroup = closureOptionLib(
  "group",
  request({
    url: CentralPlatform + "/customerCenter/teammanage/get/allteam",
    method: "get",
  })
);

export const getChannels = closureOptionLib(
  "channels",
  request({
    url: CentralPlatform + "/customerCenter/channelsetting/channel/list",
    method: "post",
  })
);

export const getClasses = closureOptionLib(
  "classes",
  request({
    url: CentralPlatform + "/customerCenter/customerclass/get/allclass",
    method: "get",
  })
);

export const getClassList = closureOptionLib(
  "classList",
  request({
    url: CentralPlatform + "/customerCenter/customerportrait/list",
    method: "get",
  })
);

export const uploadForm = (File: any) => {
  const param: any = new FormData();
  param.append("file", File, File.name);
  return new Promise((resolve, reject) => {
    request({
      // url: CentralPlatform + "/customerCenter/conversationcard/upload",
      url: CentralPlatform + "/order/agreement/transFileInputStream",
      method: "post",
      data: param,
    }).then((res: any) => {
      if (res.data.code == 0) {
        resolve(res.data.data);
      }
    });
  });
};

export const getAppointmentDimensionOptions = closureOptionLib(
  "dimensionOptions",
  Lib.dimensionOptions
);
genGetLabel(getAppointmentDimensionOptions, Lib.dimensionOptions);
export const getAppointmentStateOptions = () => {
  return new Promise((resolve, reject) => {
    resolve(Lib.appointmentStateOptions);
  });
};
genGetLabel(getAppointmentStateOptions, Lib.appointmentStateOptions);

export const getPlatformOptions = closureOptionLib(
  "platformOptions",
  request({
    url: CentralPlatform + "/customerCenter/channelsetting/query/platform",
    method: "get",
  })
);

// 是否接通
export const connectedStatus = () => {
  return new Promise((resolve, reject) => {
    resolve(Lib.isThroughOptions);
  });
};
genGetLabel(connectedStatus, Lib.isThroughOptions);
// 是否有效
export const effectStatus = () => {
  return new Promise((resolve, reject) => {
    resolve(Lib.isVoidOptions);
  });
};
genGetLabel(effectStatus, Lib.isVoidOptions);
// 是否预约
export const appointmentStatus = () => {
  return new Promise((resolve, reject) => {
    resolve(Lib.isAppointmentOptions);
  });
};
genGetLabel(appointmentStatus, Lib.isAppointmentOptions);
// 是否加微
export const wechatFunsStatus = () => {
  return new Promise((resolve, reject) => {
    resolve(Lib.isWechatOptions);
  });
};
genGetLabel(wechatFunsStatus, Lib.isWechatOptions);
// 未预约原因
export const withoutAppointmentStatus = () => {
  return new Promise((resolve, reject) => {
    resolve(Lib.unAppointmentReasons);
  });
};
genGetLabel(withoutAppointmentStatus, Lib.unAppointmentReasons);
// 距门店过远/到店耗时
export const distanceStatus = () => {
  return new Promise((resolve, reject) => {
    resolve(Lib.distanceTime);
  });
};
genGetLabel(distanceStatus, Lib.distanceTime);
// 未到店原因
export const noArrvialStatus = closureOptionLib(
  "noArrvialStatus",
  Lib.noArrvialStatus
);
genGetLabel(noArrvialStatus, Lib.noArrvialStatus);
// 年龄
export const ageRange = closureOptionLib("ageRange", Lib.ageRange);
genGetLabel(ageRange, Lib.symptomStatus);
// 顾客症状
export const symptomStatus = closureOptionLib(
  "symptomStatus",
  Lib.symptomStatus
);
genGetLabel(symptomStatus, Lib.symptomStatus);
// 回访结果
export const callbackStatus = () => {
  return new Promise((resolve, reject) => {
    resolve(Lib.callbackStatus);
  });
};
genGetLabel(callbackStatus, Lib.callbackStatus);
// 顾客状态
export const costumerStatus = () => {
  return new Promise((resolve, reject) => {
    resolve(Lib.costumerStatus);
  });
};
genGetLabel(costumerStatus, Lib.costumerStatus);

export const makeItStatus = () => {
  return new Promise((resolve, reject) => {
    resolve(Lib.makeItStatus);
  });
};
genGetLabel(makeItStatus, Lib.makeItStatus);
export const genter = () => {
  return new Promise((resolve, reject) => {
    resolve(Lib.genters);
  });
};
genGetLabel(genter, Lib.genters);

export const yn = closureOptionLib("yAndN", Lib.yAndN);
genGetLabel(yn, Lib.yAndN);
