mod t1;
mod demo01;




mod study;

use study::demo01 as demo_01;
use study::demo02;


fn main() {
    println!("Hello, world!");

    t1::main();

    demo01::main();


    demo02::main();


    println!("square(2) == {}",square(2));

    // 下面这个方法的返回值类型是i32
    let res = demo_01::add_fun(1, 2);
    println!("add_fun(1,2) == {}",res);

}


fn square(x:i32)->i32{
    x*x
}





fn unitTest() {

}