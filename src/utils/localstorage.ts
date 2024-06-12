export class LocalStorage {
  static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static getItem(key: any) {
    const storedValue = localStorage.getItem(key);
    console.log("stored", storedValue);
    if (storedValue !== null) {
      try {
        const parsedValue = JSON.parse(storedValue);
        return parsedValue;
      } catch (error) {
        console.error("Error parsing stored value:", error);
        return null;
      }
    } else {
      console.log("it is null");
      return null;
    }
  }
  static removeItem(key: any) {
    localStorage.removeItem(key);
  }
}
