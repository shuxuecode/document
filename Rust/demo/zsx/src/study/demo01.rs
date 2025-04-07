/**
基本类型
*/

fn demo01() {
    /*
    变量在默认情况下是不可变的。
    通过mut关键字让变量变为可变的。
    常量不仅仅默认不可变，而且自始至终不可变，且值的类型必须标注。
    */

    // 不可变的变量
    let x: i32 = 5;

    // 可变的变量
    let mut y: i32 = 6;

    // 常量
    const MY_CONST: u32 = 90;




    let a = 'a'; // 字符用''
    let b = "b"; // 字符串用""


}

pub fn add_fun(a: i32, b: i32) -> i32 {
    let a = a + 1;
    let b = b + 2;
    a + b // 返回值, 函数体最后一条语句就是返回值
}

fn odd_fun(a: i32) -> bool {
    // 三元运算符
    if a % 2 == 1 { true } else { false }
}
