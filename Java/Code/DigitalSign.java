package com.zhao.test;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class DigitalSign {

	public static String getDigitalSign(Object arg, String secretKey)
			throws Exception {
		String digitalSign = "";

		// 获取参与加密的值
		Map<String, String> params = new HashMap<String, String>();// 参与加密的各项值存储在params中
		objectToMap(arg, params);

		String[] keys = new String[params.size()];
		int keys_idx = 0;
		for (Map.Entry<?, ?> keyEntry : params.entrySet()) {
			keys[keys_idx] = (String) keyEntry.getKey();
			keys_idx++;
		}

		// 排序
		Bubble_sort(keys);

		// 拼装数字签名内容
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < keys.length; i++) {
			sb.append(keys[i]).append(params.get(keys[i]));
		}
		SimpleDateFormat sdf_yyyyMMdd = new SimpleDateFormat("yyyyMMdd");
		sb.append(sdf_yyyyMMdd.format(new Date())).append(secretKey);
		// 加密
//		System.out.println("MD5加密报文："+URLEncoder.encode(sb.toString(),"UTF-8").toLowerCase());
//		System.out.println("MD5加密报文："+sb.toString());
		digitalSign = MD5.md5Encode(sb.toString());
//		System.out.println("MD5加密后报文："+digitalSign);
		return digitalSign;
	}

	private static boolean isPrimitives(Class<?> cls) {
		if (cls.isArray()) {
			return isPrimitive(cls.getComponentType());
		}
		return isPrimitive(cls);
	}

	private static boolean isPrimitive(Class<?> cls) {
		return cls.isPrimitive() || cls.getClass().equals(String.class)
				|| cls.getClass().equals(Integer.class)
				|| cls.getClass().equals(Byte.class)
				|| cls.getClass().equals(Long.class)
				|| cls.getClass().equals(Double.class)
				|| cls.getClass().equals(Float.class)
				|| cls.getClass().equals(Character.class)
				|| cls.getClass().equals(Short.class)
				|| cls.getClass().equals(BigDecimal.class)
				|| cls.getClass().equals(BigInteger.class)
				|| cls.getClass().equals(Boolean.class)
				|| Number.class.isAssignableFrom(cls)
				|| Date.class.isAssignableFrom(cls);
	}

	public static void objectToMap(Object arg, Map<String, String> params)
			throws Exception {

		if (arg != null && !isPrimitives(arg.getClass())) {

			if (Map.class.isInstance(arg)) {
				for (Map.Entry<?, ?> entry : ((Map<?, ?>) arg).entrySet()) {
					try {
						params.put((String) entry.getKey(),
								(String) entry.getValue());// 无法强转为String类型的参数不参与加密
					} catch (Exception e) {
						continue;
					}
				}
			} else {
				Class<?> cls = arg.getClass();

				Field[] fs = cls.getDeclaredFields();
				Field[] superfs = cls.getSuperclass().getDeclaredFields();

				for (int i = 0; i < superfs.length; i++) {
					objectToMap_field(arg,superfs[i],params);
				}

				for (int i = 0; i < fs.length; i++) {
					objectToMap_field(arg,fs[i],params);
				}

			}
		}
	}
	
	private static void objectToMap_field(Object arg, Field f,Map<String, String> params) {

		try {
			f.setAccessible(true); // 设置该属性是可以访问的
			Object val = f.get(arg);// 得到此属性的值
			if(val==null){
				params.put(f.getName(), String.valueOf(val));
			} else if (val.getClass().isPrimitive()
					|| val.getClass().equals(String.class)
					|| val.getClass().equals(Integer.class)
					|| val.getClass().equals(Byte.class)
					|| val.getClass().equals(Long.class)
					|| val.getClass().equals(Double.class)
					|| val.getClass().equals(Float.class)
					|| val.getClass().equals(Character.class)
					|| val.getClass().equals(Short.class)
					|| val.getClass().equals(BigDecimal.class)
					|| val.getClass().equals(BigInteger.class)
					|| val.getClass().equals(Boolean.class)
					|| Number.class
							.isAssignableFrom(val.getClass())) {
				params.put(f.getName(), String.valueOf(val));
			} else if (val instanceof Date) {
				Date val_date = (Date) val;
				SimpleDateFormat sdf = new SimpleDateFormat(
						"yyyyMMddHHmm");
				params.put(f.getName(), sdf.format(val_date));
			} else if (Collection.class.isAssignableFrom(val
					.getClass())) {
				Collection collection = (Collection<?>) val;
				StringBuffer sb = new StringBuffer();
				int j = 0;
				for (Object s : collection) {
					j++;
					sb.append(String.valueOf(s));
					if (j < collection.size()) {
						sb.append(",");
					}
				}
				params.put(f.getName(), sb.toString());
			} else if (Object[].class.isInstance(val)) {
				StringBuffer sb = new StringBuffer();
				int j = 0;
				for (Object s : (Object[]) val) {
					j++;
					sb.append(String.valueOf(s));
					if (j < ((Object[]) val).length) {
						sb.append(",");
					}
				}
				params.put(f.getName(), sb.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	
	}

	/**
	 * 冒泡排序
	 * 
	 * @param strDate
	 */
	private static void Bubble_sort(String[] strDate) {
		for (int i = 0; i < strDate.length; i++) {
			for (int j = strDate.length - 1; j > i; j--) {
				if (strDate[j].compareTo(strDate[j - 1]) < 0) {
					String temp = strDate[j - 1];
					strDate[j - 1] = strDate[j];
					strDate[j] = temp;
				}
			}
		}
	}

	
}
