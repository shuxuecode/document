package com.qding.monitor.util;

import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

/**
 * Created by QDHL on 2017/6/12.
 */
public class QuartzUtil {

    public static void main(String[] args) throws SchedulerException {

        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        /*
        <property name="corePoolSize" value="10"/>
        <property name="maxPoolSize" value="50"/>
        <property name="queueCapacity" value="100"/>
         */
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(50);
        executor.setQueueCapacity(100);

        //初始化一个Schedule工厂
        SchedulerFactory schedulerFactory = new StdSchedulerFactory();

        new SchedulerFactoryBean().setTaskExecutor(executor);

        //通过schedule工厂类获得一个Scheduler类
        Scheduler scheduler = schedulerFactory.getScheduler();
        //通过设置job name, job group, and executable job class初始化一个JobDetail
        JobDetail jobDetail =
                new JobDetail("jobDetail1", "jobDetailGroup1", SimpleQuartzJob.class);
        //设置触发器名称和触发器所属的组名初始化一个定时触发器
        CronTrigger cronTrigger = new CronTrigger("cronTrigger", "triggerGroup1");

        try {
            //设置定时器的触发规则
            CronExpression cexp = new CronExpression("0/1 * * * * ?");
            //注册这个定时规则到定时触发器中
//            cronTrigger.setCronExpression(cexp);
        } catch (Exception e) {
            e.printStackTrace();
        }

//        JobDetail jobDetail1 = scheduler.getJobDetail("jobDetail1", "jobDetailGroup1");
//        System.out.println(jobDetail1);

        //交给调度器调度运行JobDetail和Trigger
        scheduler.scheduleJob(jobDetail, cronTrigger);

//        JobDetail jobDetail2 = scheduler.getJobDetail("jobDetail1", "jobDetailGroup1");
//        System.out.println(jobDetail2.getJobClass().getName());

        //启动调度器
        scheduler.start();

//
        test1(scheduler);
        test2(scheduler, "jobDetail3", "jobDetailGroup333", "triggerGroup3", "0/3 * * * * ?");
        test2(scheduler, "jobDetail4", "jobDetailGroup4444", "triggerGroup4", "0/4 * * * * ?");
        test2(scheduler, "jobDetail5", "jobDetailGroup55555", "triggerGroup5", "0/5 * * * * ?");

    }


    public static void test1(Scheduler scheduler) throws SchedulerException {
        //通过设置job name, job group, and executable job class初始化一个JobDetail
        JobDetail jobDetail =
                new JobDetail("jobDetail2", "jobDetailGroup22", SimpleQuartzJob.class);
        //设置触发器名称和触发器所属的组名初始化一个定时触发器
        CronTrigger cronTrigger = new CronTrigger("cronTrigger", "triggerGroup2");
        try {
            //设置定时器的触发规则
            CronExpression cexp = new CronExpression("0/2 * * * * ?");
            //注册这个定时规则到定时触发器中
            cronTrigger.setCronExpression(cexp);
        } catch (Exception e) {
            e.printStackTrace();
        }
        scheduler.scheduleJob(jobDetail, cronTrigger);

        //启动调度器
        scheduler.start();
    }

    public static void test2(Scheduler scheduler, String jobName, String jobGroup, String triggerGroup, String cron) throws SchedulerException {
        //通过设置job name, job group, and executable job class初始化一个JobDetail
        JobDetail jobDetail =
                new JobDetail(jobName, jobGroup, SimpleQuartzJob.class);
        //设置触发器名称和触发器所属的组名初始化一个定时触发器
        CronTrigger cronTrigger = new CronTrigger("cronTrigger", triggerGroup);
        try {
            //设置定时器的触发规则
            CronExpression cexp = new CronExpression(cron);
            //注册这个定时规则到定时触发器中
            cronTrigger.setCronExpression(cexp);
        } catch (Exception e) {
            e.printStackTrace();
        }
        scheduler.scheduleJob(jobDetail, cronTrigger);

        //启动调度器
        scheduler.start();
    }
}
