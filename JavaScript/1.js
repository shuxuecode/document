
let weeks = new Array("日", "一", "二", "三", "四", "五", "六", "日");

function cala(year, mon, day, num) {

    let ttt = new Date(year, mon - 1, day).getTime() + num * 24000 * 3600;

    let theday = new Date();

    theday.setTime(ttt);

    console.log(theday.getFullYear())
    console.log(theday.getMonth())
    console.log()
    console.log(theday.getDay())
    console.log()

    var res = theday.getFullYear() + "年" + (theday.getMonth() + 1) + "月" + theday.getDate() + "日" + " 星期" + weeks[theday.getDay()]

    console.log(res)

}


cala(2019, 6, 5, 1);


