export class StorageService {
  getItem(key: string) {
    const result = localStorage.getItem(key);
    if (typeof result === "string") {
      return JSON.parse(result);
    } else {
      return null;
    }
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
