/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-15 15:34:47
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-10-07 09:19:31
 * @FilePath: \xc_customer-service\src\common\utils\utils.ts
 * @Description: 公共抽离方法
 */
import jss from "jss";
import preset from "jss-preset-default";
import * as State from "../State";
import { IFunction, IObject } from "../../src/types/interface";
import { RouteRecordRaw } from "vue-router";

import Store from "@/store";

type TJsonString = IObject<
  string | number | null | undefined | IObject<TJsonString>
>;

export const stringfiy = (obj: TJsonString | Array<any>) => JSON.stringify(obj);

export const parse = (jsonString: string | null): any => {
  try {
    return JSON.parse(jsonString || "");
  } catch (error) {
    return jsonString;
  }
};

export const copy = (obj: TJsonString): TJsonString => parse(stringfiy(obj));

export const CSheet = (() => {
  jss.setup(preset());
  return (classes: any) => {
    return jss.createStyleSheet(classes).attach();
  };
})();

export const copyToClipboard = (value: string): void => {
  const transfer = document.createElement("textarea");
  document.body.appendChild(transfer);
  transfer.value = value;
  transfer.focus();
  transfer.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
  }
  transfer.blur();
  document.body.removeChild(transfer);
};

// export const getToken = () => localStorage.getItem(State.LocalToken);

export const clearLogin = () => {
  localStorage.clear();
};

export const HttpClosure =
  (url: string, method: string, request: IFunction) => (data: IObject) => {
    let _url = url;
    if (method == "get") {
      _url +=
        "?" +
        Object.keys(data).reduce((ref: string, cur: string) => {
          ref += `${cur}=${data[cur]}&`;
          return ref;
        }, "");
    }
    return request({
      url: _url,
      method,
      data,
    });
  };

export const Throttling = function (dely: number, fn: IFunction<void>) {
  let timer: any = null;
  return function (this: any, ...argus: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, argus);
      clearTimeout(timer);
    }, dely);
  };
};
export const getEnv = () => {
  return process.env.NODE_ENV;
};

export const LocalRoutes = (() => {
  let routes: Array<RouteRecordRaw> | null = null;
  return {
    get() {
      if (!routes) routes = parse(localStorage.getItem(State.LocalRoutes));
      return routes;
    },
    set(obj: any) {
      localStorage.setItem(State.LocalRoutes, stringfiy(obj));
    },
  };
})();

export const LocalToken = (() => {
  let token: null | string = null;
  return {
    set(tk: string) {
      localStorage.setItem(State.LocalToken, tk);
    },
    get() {
      if (!token) token = localStorage.getItem(State.LocalToken) || "";
      return token;
    },
  };
})();

export const LocalInfo = (() => {
  let info: IObject | null = null;
  return {
    set(obj: TJsonString) {
      localStorage.setItem(State.LocalLoginINFO, stringfiy(obj));
    },
    get() {
      if (!info) info = parse(localStorage.getItem(State.LocalLoginINFO));
      return info;
    },
  };
})();

export const LocalPermission = (() => {
  let permissions: Array<string> | null = null;
  return {
    get() {
      if (!permissions)
        permissions = parse(localStorage.getItem(State.LocalPermission));
      return permissions;
    },
    set(permissions: Array<string>) {
      localStorage.setItem(State.LocalPermission, stringfiy(permissions));
    },
  };
})();

export const FistUpper = (x: string) => {
  const ex = x.slice(1);
  const fx = x.charAt(0).toUpperCase();
  return `${fx}${ex}`;
};

export const getUuid = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const Datepad = function (str: number) {
  return (isNaN(str) ? String(str) : String(str)).padStart(2, "0");
};

export const TimestampToDate = function (
  timestamp: any,
  format: string,
  charges?: boolean,
  hideHour?: boolean
) {
  let timerobj: any = {
    YY: "",
    MM: "",
    DD: "",
    hh: "",
    mm: "",
    ss: "",
  };

  if (charges) {
    timerobj = {
      YY: "",
      MM: "",
      DD: "",
      hh: parseInt(
        String((timestamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ),
      mm: parseInt(String((timestamp % (1000 * 60 * 60)) / (1000 * 60))),
      ss: (timestamp % (1000 * 60)) / 1000,
    };
  } else {
    if (!timestamp) {
      return "";
      // return "收到：【错误的时间戳或时间格式 " + Object.prototype.toString.call(null, timestamp) + "】";
    }
    const n_tt = Number(timestamp);
    const date = timestamp instanceof Date ? timestamp : new Date(n_tt);
    timerobj = {
      YY: date.getFullYear(),
      MM: Datepad(date.getMonth() + 1),
      DD: Datepad(date.getDate()),
      hh: Datepad(date.getHours()),
      mm: Datepad(date.getMinutes()),
      ss: Datepad(date.getSeconds()),
    };
  }

  if (hideHour) {
    timerobj.hh == "00" &&
      (function () {
        const hIndex = format.indexOf("hh");
        const mIndex = format.indexOf("mm");
        const formatArr = format.split("");
        formatArr.splice(hIndex, mIndex - hIndex);
        format = formatArr.join("");
      })();
  }

  return Object.keys(timerobj).reduce(
    (formater, cur) => formater.replace(cur, timerobj[cur]),
    format
  );
};
