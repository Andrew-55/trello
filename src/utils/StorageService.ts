export class StorageService {
  getItem(key: string) {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
