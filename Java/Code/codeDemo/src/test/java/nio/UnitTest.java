package nio;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by ZSX on 2018/7/18.
 *
 * @author ZSX
 */
public class Test1 {

    private static ThreadLocal<String> threadLocal = new ThreadLocal<String>();

    public static void main(String[] args) {
        final Test1 test1 = new Test1();

        ExecutorService executorService = Executors.newFixedThreadPool(10);

        while (true) {
            executorService.execute(new Runnable() {
                public void run() {
                    String key = "A";
                    setDataSourceKey(key);
                    String dataSourceKey = getDataSourceKey();
                    System.out.println("set key = " + key + "  get value = " + dataSourceKey);
                }
            });

            executorService.execute(new Runnable() {
                public void run() {
                    String key = "B";
                    setDataSourceKey(key);
                    String dataSourceKey = getDataSourceKey();
                    System.out.println("set key = " + key + "  get value = " + dataSourceKey);
                }
            });

//            try {
//                Thread.sleep(5 * 1000L);
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
        }


    }

    public static void setDataSourceKey(String key) {
        threadLocal.set(key);
    }

    /**
     * 获取数据源对应的key
     *
     * @return String 数据源对应的key
     */
    public static String getDataSourceKey() {
        return threadLocal.get();
    }
}
