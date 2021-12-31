/** 左闭右开 */
function rand(min, max){
    return Math.floor(min + Math.random() * (max - min));
}

//随机32位字符串
function nonce_str() {
    $result = '';
    $str = 'QWERTYUIOPASDFGHJKLZXVBNMqwertyuioplkjhgfdsamnbvcxz';
    for ($i = 0; $i < 32; $i++) {
        $result += $str[rand(0, 48)];
    }
    return $result;
}


//生成订单号 
function order_number(str) {
    //date('Ymd',time()).time().rand(10,99);//18位 return md5(str.time().rand(10,99));//32位
}



// console.warn(rand(2,2))

console.error(nonce_str())
