
大部分网站都是可以用cookie的方式去模拟登陆状态的。
打开需要模拟登陆的网站，登陆后，找到需要调用的链接，url。
按F12打开控制台，在网络那里可以看到

![](mk-2.jpg)

把红线框住的Cookie复制出来，放到请求Header里面即可。

```
conn.setRequestProperty("Cookie", Cookie);
```

具体代码如下：



```
import com.alibaba.fastjson.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.Charset;

public class PostUtil {

    static String postUrl = "http://www.xxx.com/api/get/list/xxx";
    static String Cookie = "xxxxxxxxxxxxxxxxx";


    public static void main(String[] args) {
//        请求参数，里面包含分页
        JSONObject params = JSONObject.parseObject("{\"size\": 15, \"page\": 1}");
        System.out.println(params);

        String result = loadData(postUrl, params.toJSONString());

        System.out.println("返回数据：" + result);
    }

    public static String loadData(String url, String params) {
        try {
            URL wsUrl = new URL(url);

            HttpURLConnection conn = (HttpURLConnection) wsUrl.openConnection();

            conn.setDoInput(true);
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
            conn.setRequestProperty("Cookie", Cookie);

            OutputStream os = conn.getOutputStream();
            os.write(params.getBytes(Charset.forName("UTF-8")));

            InputStream is = conn.getInputStream();

            byte[] b = new byte[1024];
            int len = 0;
            StringBuffer buffer = new StringBuffer();
            while ((len = is.read(b)) != -1) {
                String ss = new String(b, 0, len, "UTF-8");
                buffer.append(ss);
            }
            is.close();
            os.close();
            conn.disconnect();

            String resultStr = buffer.toString();
            return resultStr;
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}

```