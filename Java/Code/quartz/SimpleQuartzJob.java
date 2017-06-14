package com.qding.monitor.util;

import com.qding.monitor.service.IMonitorService;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Created by QDHL on 2017/6/12.
 */
@Component
public class SimpleQuartzJob implements Job {

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        System.out.print(new Date());
        System.out.print(context.getJobDetail().getJobDataMap().getString("zhao"));
        System.out.print(context.getTrigger().getJobKey());
        System.out.print("    ");
        System.out.println(context.getTrigger().getKey());

//        context.getJobDetail().getKey()


        IMonitorService monitorListService = (IMonitorService) ApplicationUtil.getBean("monitorListService");

//        Monitor m = monitorListService.getById("1");
//        System.out.println(m.getTitle());
//        System.out.println();

    }

//    @Override
//    public void execute(JobExecutionContext context) throws JobExecutionException {
////        System.out.println("In SimpleQuartzJob - executing its JOB at "
////                + new Date() + " by " + context.getTrigger().getName());
//
////        System.out.println(new Date() + " by " + context.getTrigger().getJobName() + context.getTrigger().getJobGroup());
//        System.out.println(JSON.toJSONString(context));
//
////        String s = System.getProperty("line.separator");
////
////        System.out.println(s);
////        System.out.println(JSON.toJSONString(s));
//    }
}
