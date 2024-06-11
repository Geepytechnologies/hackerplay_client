import { Encryption } from "./encryption";
import { LocalStorage } from "./localstorage";

export class Common {
  static EncryptAndStoreInLocalStorage(item: any) {
    const encrytedData = Encryption.encryptData(item);
    LocalStorage.setItem("user", encrytedData);
  }
}
