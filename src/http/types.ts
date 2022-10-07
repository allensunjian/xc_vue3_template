/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-15 16:45:49
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-08-15 17:22:15
 * @FilePath: \xc_customer-service\src\http\types.ts
 * @Description: 請求類
 */
import { IHttpResponse, IObject } from "./../types/interface";

type TData = null | IObject;
export type TRespones = IHttpResponse<TData>;
