import CryptoJS from "crypto-js";
import { CONSTANTS } from "../constants";

export class Encryption {
  static encryptData = (data: any) => {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      CONSTANTS.secretkey
    ).toString();
  };
  static decryptData = (ciphertext: any) => {
    if (ciphertext !== null) {
      const bytes = CryptoJS.AES.decrypt(ciphertext, CONSTANTS.secretkey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
  };
}
