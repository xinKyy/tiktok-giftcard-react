declare module 'jsencrypt' {
  export default class JSEncrypt {
    constructor();
    setPublicKey(key: string): void;
    setPrivateKey(key: string): void;
    encrypt(data: string): string | false;
    decrypt(data: string): string | false;
    getKey(): any;
    // 还有更多方法你可以按需添加
  }
}
