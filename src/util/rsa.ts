import JSEncrypt from 'jsencrypt';

class RSAUtil {
  private encrypt: JSEncrypt;

  constructor() {
    this.encrypt = new JSEncrypt();
  }

  /**
   * 设置公钥
   * @param publicKey - Base64编码的公钥
   */
  setPublicKey(publicKey: string): void {
    this.encrypt.setPublicKey(publicKey);
  }

  /**
   * 加密数据
   * @param data - 要加密的数据
   * @returns 加密后的Base64字符串，如果失败则返回 null
   */
  encryptData(data: string): string | false {
    return this.encrypt.encrypt(data);
  }
}


const rsaUtil = new RSAUtil();

export default rsaUtil;
