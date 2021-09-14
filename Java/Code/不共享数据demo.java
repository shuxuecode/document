package com.zhao.test.a;

public class 不共享数据demo {

	public static void main(String[] args) {
		Mythread1 mythread1 = new Mythread1("A");
		Mythread1 mythread2 = new Mythread1("B");
		Mythread1 mythread3 = new Mythread1("C");
		Mythread1 mythread4 = new Mythread1("D");
		
		mythread1.start();
		mythread2.start();
		mythread3.start();
		mythread4.start();
	}

}


class Mythread1 extends Thread {
	private int num = 5;
	public Mythread1(String name) {
		super();
		this.setName(name); // 设置线程名称

	}
	
	public void run() {
		super.run();
		while (num > 0) {
			num --;
			System.out.println("线程名称 ： " + this.currentThread().getName() + " ---  运行结果： " + num);
			
		}
	}
}