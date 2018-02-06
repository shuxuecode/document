package com.qding.monitor.service.impl;

import com.alibaba.dubbo.common.Constants;
import com.alibaba.dubbo.common.URL;
import com.alibaba.dubbo.common.utils.ConcurrentHashSet;
import com.alibaba.dubbo.common.utils.NetUtils;
import com.alibaba.dubbo.registry.NotifyListener;
import com.alibaba.dubbo.registry.RegistryService;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import com.qding.monitor.dao.MonitorDubboReceiverMapper;
import com.qding.monitor.domain.MonitorDubboReceiver;
import com.qding.monitor.dto.dubbo.ApplicationHostDto;
import com.qding.monitor.dto.dubbo.DubboApplicationDto;
import com.qding.monitor.dto.dubbo.DubboServiceDto;
import com.qding.monitor.service.IMonitorDubboService;
import com.qding.wukong.common.ModelResult;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by ZSX on 2017/11/6.
 *
 * @author ZSX
 */
@Service("monitorDubboService")
public class IMonitorDubboServiceImpl implements IMonitorDubboService {

    final Set<String> applications = new ConcurrentHashSet<String>();
    final Set<String> services = new ConcurrentHashSet<String>();
    final Map<String, List<URL>> serviceProviders = new ConcurrentHashMap<String, List<URL>>();
    final Map<String, List<URL>> serviceConsumers = new ConcurrentHashMap<String, List<URL>>();

    @Resource
    private RegistryService registryService;

    @Resource
    private MonitorDubboReceiverMapper monitorDubboReceiverMapper;

    @Override
    public List<DubboApplicationDto> getDubboServiceList() {
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
        ArrayList<String> applicationList = Lists.newArrayList();
        for (String application : applications) {
            applicationList.add(application);
        }
//        排序
        Collections.sort(applicationList);
        /**
         *
         */
        ArrayList<DubboApplicationDto> dubboApplicationDtos = Lists.newArrayList();
        for (String application : applicationList) {
            DubboApplicationDto dubboApplicationDto = new DubboApplicationDto();
            dubboApplicationDto.setApplication(application);

            ArrayList<ApplicationHostDto> applicationHostDtos = Lists.newArrayList();
            Set<String> hosts = getHostsByApplication(application, serviceProviders, serviceConsumers);
            if (hosts != null && hosts.size() > 0) {
                for (String host : hosts) {
                    ApplicationHostDto applicationHostDto = new ApplicationHostDto();
                    applicationHostDto.setHost(host);

                    ArrayList<DubboServiceDto> dubboServiceDtos = Lists.newArrayList();
                    DubboServiceDto dubboServiceDto = new DubboServiceDto();
                    dubboServiceDto.setType("provider");
                    List<URL> providers = getProvidersOrConsumersByApplication(application, serviceProviders);
//                    ArrayList<MonitorDubboDto> monitorDubboDtos = Lists.newArrayList();
                    if (providers != null && providers.size() > 0) {
//                        for (URL url : providers) {
//                            if (!host.equals(url.getHost())) {
//                                continue;
//                            }
//                            String service = url.getServiceInterface();
//                            MonitorDubboDto monitorDubboDto = new MonitorDubboDto();
//                            monitorDubboDto.setType("provider");
//                            monitorDubboDto.setApplication(application);
//                            monitorDubboDto.setHost(host);
//                            monitorDubboDto.setService(service);
//
//                            monitorDubboDtos.add(monitorDubboDto);
//                        }
//                        dubboServiceDto.setMonitorDubboDtos(monitorDubboDtos);
                        // TODO: 2017/11/22
                        HashMap<String, Object> searchMap = Maps.newHashMap();
                        searchMap.put("application", application);
                        searchMap.put("ip", host);
                        searchMap.put("type", "provider");
                        MonitorDubboReceiver monitorDubboReceiver = monitorDubboReceiverMapper.getIds(searchMap);
                        if (monitorDubboReceiver != null) {
                            dubboServiceDto.setId(monitorDubboReceiver.getId());
                            dubboServiceDto.setIds(monitorDubboReceiver.getIds());
                        }
                        dubboServiceDto.setStr(application + "!@#" + host + "!@#provider");
                        dubboServiceDtos.add(dubboServiceDto);
                    }

//                    消费者
                    dubboServiceDto = new DubboServiceDto();
                    dubboServiceDto.setType("consumer");
                    List<URL> consumers = getProvidersOrConsumersByApplication(application, serviceConsumers);
//                    monitorDubboDtos = Lists.newArrayList();
                    if (consumers != null && consumers.size() > 0) {
//                        for (URL url : consumers) {
//                            if (!host.equals(url.getHost())) {
//                                continue;
//                            }
//                            String service = url.getServiceInterface();
//                            MonitorDubboDto monitorDubboDto = new MonitorDubboDto();
//                            monitorDubboDto.setType("consumer");
//                            monitorDubboDto.setApplication(application);
//                            monitorDubboDto.setHost(host);
//                            monitorDubboDto.setService(service);
//
//                            monitorDubboDtos.add(monitorDubboDto);
//                        }
//                        dubboServiceDto.setMonitorDubboDtos(monitorDubboDtos);
                        // TODO: 2017/11/22
                        HashMap<String, Object> searchMap = Maps.newHashMap();
                        searchMap.put("application", application);
                        searchMap.put("ip", host);
                        searchMap.put("type", "consumer");
                        MonitorDubboReceiver monitorDubboReceiver = monitorDubboReceiverMapper.getIds(searchMap);
                        if (monitorDubboReceiver != null) {
                            dubboServiceDto.setId(monitorDubboReceiver.getId());
                            dubboServiceDto.setIds(monitorDubboReceiver.getIds());
                        }
                        dubboServiceDto.setStr(application + "!@#" + host + "!@#consumer");
                        dubboServiceDtos.add(dubboServiceDto);
                    }

                    applicationHostDto.setDubboServiceDtos(dubboServiceDtos);

                    applicationHostDtos.add(applicationHostDto);
                }
            }
            dubboApplicationDto.setApplicationHostDtos(applicationHostDtos);

            dubboApplicationDtos.add(dubboApplicationDto);
        }
        return dubboApplicationDtos;
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

    private Set<String> getHostsByApplication(String application, Map<String, List<URL>> serviceProviders, Map<String, List<URL>> serviceConsumers) {
        HashSet<String> set = Sets.newHashSet();
        if (application != null && application.length() > 0) {
            for (List<URL> service : serviceProviders.values()) {
                for (URL url : service) {
                    if (application.equals(url.getParameter(Constants.APPLICATION_KEY))) {
                        set.add(url.getHost());
                    }
                }
            }
            for (List<URL> service : serviceConsumers.values()) {
                for (URL url : service) {
                    if (application.equals(url.getParameter(Constants.APPLICATION_KEY))) {
                        set.add(url.getHost());
                    }
                }
            }
        }
        return set;
    }

    @Override
    public ModelResult setDubboService(String str, String id, String ids) {
        ModelResult modelResult = new ModelResult(ModelResult.CODE_200);
        if (StringUtils.isBlank(str)) {
//            数据错误
            modelResult.setCode(ModelResult.CODE_500);
            modelResult.setMessage("dubbo服务有错误");
            return modelResult;
        }
        String[] split = str.split("!@#");
        if (StringUtils.isBlank(id) && StringUtils.isNotBlank(ids)) {
//            新增
            MonitorDubboReceiver mdr = new MonitorDubboReceiver();
            mdr.setApplication(split[0]);
            mdr.setIp(split[1]);
            mdr.setType(split[2]);
            mdr.setIds(ids);
            mdr.setCreateTime(new Date());
            monitorDubboReceiverMapper.insert(mdr);
            modelResult.setMessage("新增Dubbo监控成功");
            return modelResult;
        }
        if (StringUtils.isNotBlank(id) && StringUtils.isBlank(ids)) {
//            删除
            monitorDubboReceiverMapper.deleteByPrimaryKey(Integer.valueOf(id));
            modelResult.setMessage("删除Dubbo监控成功");
            return modelResult;
        }
        if (StringUtils.isNotBlank(id) && StringUtils.isNotBlank(ids)) {
//            修改
            MonitorDubboReceiver mdr = monitorDubboReceiverMapper.selectByPrimaryKey(Integer.valueOf(id));
            mdr.setIds(ids);
            monitorDubboReceiverMapper.updateByPrimaryKeySelective(mdr);
            modelResult.setMessage("修改Dubbo监控成功");
            return modelResult;
        }
        return modelResult;
    }
}
