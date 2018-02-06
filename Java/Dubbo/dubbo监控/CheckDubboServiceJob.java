package com.qding.monitor.job;

import com.alibaba.dubbo.common.Constants;
import com.alibaba.dubbo.common.URL;
import com.alibaba.dubbo.common.utils.ConcurrentHashSet;
import com.alibaba.dubbo.common.utils.NetUtils;
import com.alibaba.dubbo.registry.NotifyListener;
import com.alibaba.dubbo.registry.RegistryService;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.qding.monitor.dao.IMonitorAlarmReceiverDao;
import com.qding.monitor.dao.MonitorDubboReceiverMapper;
import com.qding.monitor.domain.MonitorAlarmReceiver;
import com.qding.monitor.domain.MonitorDubboReceiver;
import com.qding.wukong.util.MailUtil;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by QDHL on 2017/10/10.
 */
@Component
public class CheckDubboServiceJob {

    private static Log mylogger = LogFactory.getLog("mylogger");
    static final String STAR = "★";
    static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    static final String lineBreak = "<br>";

    final Set<String> applications = new ConcurrentHashSet<String>();
    final Set<String> services = new ConcurrentHashSet<String>();
    final Map<String, List<URL>> serviceProviders = new ConcurrentHashMap<String, List<URL>>();
    final Map<String, List<URL>> serviceConsumers = new ConcurrentHashMap<String, List<URL>>();

    @Resource
    private RegistryService registryService;

    @Resource
    private MonitorDubboReceiverMapper monitorDubboReceiverMapper;
    @Resource(name = "monitorAlarmReceiverDao")
    private IMonitorAlarmReceiverDao monitorAlarmReceiverDao;


    @Scheduled(cron = "25 0/2 * * * ?")
    public void run() {
        System.out.println(sdf.format(new Date()) + "  开始检测Dubbo服务");
//        MonitorUtil.warningReport(monitorId, ExLevelEnum.HIGH, "检测到监控项【" + monitor.getTitle() + "】心跳发生异常，" +
//                "相关配置信息为：" + JSON.toJSONString(config), null, null, null);
        URL subscribeUrl = new URL(Constants.ADMIN_PROTOCOL, NetUtils.getLocalHost(), 0, "",
                Constants.INTERFACE_KEY, Constants.ANY_VALUE,
                Constants.GROUP_KEY, Constants.ANY_VALUE,
                Constants.VERSION_KEY, Constants.ANY_VALUE,
                Constants.CLASSIFIER_KEY, Constants.ANY_VALUE,
                Constants.CATEGORY_KEY, Constants.PROVIDERS_CATEGORY + ","
                + Constants.CONSUMERS_CATEGORY,
                Constants.CHECK_KEY, String.valueOf(false));
        //
        registryService.subscribe(subscribeUrl, new NotifyListener() {
            @Override
            public void notify(List<URL> urls) {
                if (urls == null || urls.size() == 0) {
                    return;
                }
                Map<String, List<URL>> proivderMap = new HashMap<String, List<URL>>();
                Map<String, List<URL>> consumerMap = new HashMap<String, List<URL>>();
                for (URL url : urls) {
                    String application = url.getParameter(Constants.APPLICATION_KEY);
                    if (application != null && application.length() > 0) {
                        applications.add(application);
                    }
                    String service = url.getServiceInterface();
                    services.add(service);
                    String category = url.getParameter(Constants.CATEGORY_KEY, Constants.DEFAULT_CATEGORY);
                    if (Constants.PROVIDERS_CATEGORY.equals(category)) {
                        if (Constants.EMPTY_PROTOCOL.equals(url.getProtocol())) {
                            serviceProviders.remove(service);
                        } else {
                            List<URL> list = proivderMap.get(service);
                            if (list == null) {
                                list = new ArrayList<URL>();
                                proivderMap.put(service, list);
                            }
                            list.add(url);

                        }
                    } else if (Constants.CONSUMERS_CATEGORY.equals(category)) {
                        if (Constants.EMPTY_PROTOCOL.equals(url.getProtocol())) {
                            serviceConsumers.remove(service);
                        } else {
                            List<URL> list = consumerMap.get(service);
                            if (list == null) {
                                list = new ArrayList<URL>();
                                consumerMap.put(service, list);
                            }
                            list.add(url);
                        }
                    }

                }
                if (proivderMap != null && proivderMap.size() > 0) {
                    serviceProviders.putAll(proivderMap);
                }
                if (consumerMap != null && consumerMap.size() > 0) {
                    serviceConsumers.putAll(consumerMap);
                }
            }
        });
        // 获取所有信息完毕
//        System.out.println(applications);
        List<MonitorDubboReceiver> monitorDubbos = Lists.newArrayList();
        MonitorDubboReceiver monitorDubbo = null;
        for (String application : applications) {
            List<URL> providers = this.getProvidersOrConsumersByApplication(application, serviceProviders);
            for (URL url : providers) {
                monitorDubbo = new MonitorDubboReceiver();
                String ip = url.getHost();
                monitorDubbo.setApplication(application);
                monitorDubbo.setIp(ip);
                monitorDubbo.setType("provider");

                monitorDubbos.add(monitorDubbo);
            }

            List<URL> consumers = this.getProvidersOrConsumersByApplication(application, serviceConsumers);

            for (URL url : consumers) {
                monitorDubbo = new MonitorDubboReceiver();
                String ip = url.getHost();
//                String service = url.getServiceInterface();
                monitorDubbo.setApplication(application);
                monitorDubbo.setIp(ip);
                monitorDubbo.setType("consumer");

                monitorDubbos.add(monitorDubbo);
            }
        }
//        monitorDubbos
        List<MonitorDubboReceiver> monitorDubboReceivers = monitorDubboReceiverMapper.getAll(Maps.<String, Object>newHashMap());
        if (CollectionUtils.isNotEmpty(monitorDubboReceivers)) {
            for (MonitorDubboReceiver monitorDubboReceiver : monitorDubboReceivers) {
                boolean flag = false;
                for (MonitorDubboReceiver dubboService : monitorDubbos) {
                    if (dubboService.getApplication().equals(monitorDubboReceiver.getApplication())
                            &&
                            dubboService.getIp().equals(monitorDubboReceiver.getIp())
                            &&
                            dubboService.getType().equals(monitorDubboReceiver.getType())
                            ) {
                        flag = true;
//                        找到服务的话直接逃过
                        break;
                    }
                }
                if (!flag){
                    String ids = monitorDubboReceiver.getIds();
                    StringBuilder emailSb = new StringBuilder();
                    String[] split = ids.split(",");
                    for (String id : split) {
                        MonitorAlarmReceiver monitorAlarmReceiver = monitorAlarmReceiverDao.selectById(id);
                        String email = monitorAlarmReceiver.getEmail();
                        emailSb.append(",").append(email);
                    }
                    String mailList = emailSb.toString();
                    if (StringUtils.isNotBlank(mailList)) {
                        mailList = mailList.substring(1);
                    }
                    StringBuffer sb = new StringBuffer(STAR + STAR + STAR);
                    sb.append("【");
                    sb.append("检测不到 [ip] 上 [app] 的Dubbo服务（[type]）");
                    sb.append("】");

                    String title = sb.toString().replace("[ip]", monitorDubboReceiver.getIp());
                    title = title.replace("[app]", monitorDubboReceiver.getApplication());
                    title = title.replace("[type]", monitorDubboReceiver.getType());

                    StringBuffer content = new StringBuffer();
                    content.append("报警类型：Dubbo服务监控").append(lineBreak);
                    content.append("报警时间：").append(sdf.format(new Date())).append(lineBreak);
                    content.append("服务名称：").append(monitorDubboReceiver.getApplication()).append(lineBreak);
                    content.append("ip地址：").append(monitorDubboReceiver.getIp()).append(lineBreak);
                    content.append("服务类型：").append(monitorDubboReceiver.getType()).append(lineBreak);
                    MailUtil.sendMail(mailList, content.toString(), title);

                    mylogger.info("发送报警邮件给：" + mailList);
                }
            }
        }
        System.out.println(sdf.format(new Date()) + "  检测Dubbo服务任务结束");
    }

    private List<URL> getProvidersOrConsumersByApplication(String application, Map<String, List<URL>> services) {
        List<URL> urls = new ArrayList<URL>();
        if (application != null && application.length() > 0) {
            for (List<URL> service : services.values()) {
                for (URL url : service) {
                    if (application.equals(url.getParameter(Constants.APPLICATION_KEY))) {
                        urls.add(url);
                    }
                }
            }
        }
        return urls;
    }

}
