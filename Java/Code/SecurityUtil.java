package com.golden.util;

import java.security.Key;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder; 
/**
 * 加密工具类，主要用于密码加密
 * @author ZSX
 */
public class SecurityUtil {  
	
    /**
     * 秘钥生成算法
     */
    public static String DES = "AES"; // optional value AES/DES/DESede  
      
    /**
     * 密码加密算法
     */
    public static String CIPHER_ALGORITHM = "AES"; // optional value AES/DES/DESede  
      
  
    /**
     * 根据指定的key生成秘钥
     * @param key
     * @return
     * @throws Exception
     */
    public static Key getSecretKey(String key) throws Exception{  
        SecretKey securekey = null;  
        if(key == null){  
            key = "";  
        }  
        KeyGenerator keyGenerator = KeyGenerator.getInstance(DES);  
        keyGenerator.init(new SecureRandom(key.getBytes()));  
        securekey = keyGenerator.generateKey();  
        return securekey;  
    }  
      
    /**
     * 加密
     * @param data 要加密的数据
     * @param key  秘钥
     * @return
     * @throws Exception
     */
    public static String encrypt(String data,String key){  
        SecureRandom sr = new SecureRandom();  
		try {
			Key securekey = getSecretKey(key);
			Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM);  
			cipher.init(Cipher.ENCRYPT_MODE, securekey, sr);  
			byte[] bt = cipher.doFinal(data.getBytes());  
			String strs = new BASE64Encoder().encode(bt);  
			return strs;  
		} catch (Exception e) {
			e.printStackTrace();
		}  
		return null;
    }  
      
      
    /**
     * 解密
     * @param message 要解密的数据
     * @param key     秘钥
     * @return
     * @throws Exception
     */
    public static String detrypt(String message,String key){  
        SecureRandom sr = new SecureRandom(); 
        try {
        	Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM);  
        	Key securekey = getSecretKey(key);  
        	cipher.init(Cipher.DECRYPT_MODE, securekey,sr);  
        	byte[] res = new BASE64Decoder().decodeBuffer(message);  
        	res = cipher.doFinal(res);  
        	return new String(res);  
		} catch (Exception e) {
			e.printStackTrace();
		}
        return null;
    }  
      
    public static void main(String[] args)throws Exception{ 
    	
    	
        String message = "123456";
        String key = "syfp";
        String entryptedMsg = encrypt(message,key);  
        System.out.println("encrypted message is below :");  
        System.out.println(entryptedMsg);  
          
        String decryptedMsg = detrypt(entryptedMsg,key);  
        System.out.println("decrypted message is below :");  
        System.out.println(decryptedMsg);  
    }  
}  