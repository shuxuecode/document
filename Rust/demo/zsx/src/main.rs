mod t1;
mod demo01;





fn main() {
    println!("Hello, world!");

    t1::main();

    demo01::main();





    println!("square(2) == {}",square(2));

}


fn square(x:i32)->i32{
    x*x
}