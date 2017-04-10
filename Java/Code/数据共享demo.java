package com.zhao.test.a;

public class 数据共享demo {

	public static void main(String[] args) {
//		mythread2 mythread2 = new mythread2();
		mythread3 mythread2 = new mythread3();
		
		Thread thread1 = new Thread(mythread2, "a");
		Thread thread2 = new Thread(mythread2, "b");
		Thread thread3 = new Thread(mythread2, "c");
		Thread thread4 = new Thread(mythread2, "d");
		Thread thread5 = new Thread(mythread2, "e");
		
		thread1.start();
		thread2.start();
		thread3.start();
		thread4.start();
		thread5.start();
		
	}

}



/**
 * 这个结果是有重复值的，即线程同时访问同一个导致线程不安全
 * @author zhaosx
 *
 */
class mythread2 extends Thread {
	private int num = 5;
	public void run() {
		super.run();
		num -- ;
		/*
		 * 此示例不要用for语句，因为使用同步后其他线程就得不到运行的机会了，
		 * 一直由一个线程进行减法运算
		 */
		System.out.println(this.currentThread().getName() + " --- " + num);
	}
}

/**
 * 加上  synchronized 关键字
 * @author zhaosx
 *
 */
class mythread3 extends Thread {
	private int num = 5;
	synchronized public void run() {
		super.run();
		num -- ;
		/*
		 * 此示例不要用for语句，因为使用同步后其他线程就得不到运行的机会了，
		 * 一直由一个线程进行减法运算
		 */
		System.out.println(this.currentThread().getName() + " --- " + num);
	}
}




