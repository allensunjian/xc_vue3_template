/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-09-13 18:08:08
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-13 18:14:43
 * @FilePath: \xc_customer-service\Framework\scripts\encrypt.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import CryptoJS from "crypto-js";

export default {
  //随机生成指定数量的16进制key
  generatekey(num) {
    let library =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";
    for (var i = 0; i < num; i++) {
      let randomPoz = Math.floor(Math.random() * library.length);
      key += library.substring(randomPoz, randomPoz + 1);
    }
    return key;
  },

  //加密
  aesEncrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : "abcdsxyzhkj12345"; //判断是否存在key，不存在就用定义好的key
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  },
  //解密
  aesDecrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : "abcdsxyzhkj12345";
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var decrypt = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
};
