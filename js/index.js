window.onload = function () {
    searchEffect();
    timeBack();
}

function searchEffect() {
    // 1.获取banner高度
    var banner = document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;
    var search = document.querySelector(".jd_search");
    //2.获取滑动时，移除屏幕banner的高度

    var opacity = 0;
    //3.计算比例，重新赋值
    window.onscroll = function () {
        // 获取body滚动像素值
        var offsetTop = document.body.scrollTop + document.documentElement.scrollTop;
        opacity = offsetTop / bannerHeight;
        if (opacity < 1) {

            search.style.backgroundColor = "rgba(233, 35,34, " + opacity + ")";
        }
    }
}

function timeBack() {
    var spans = document.querySelector(".sk_time").querySelectorAll("span");
    var totalTime = 4;
    var timeId = setInterval(() => {
        totalTime--;
        if (totalTime < 0) {
            clearInterval(timeId);
            return;
        }
        var hour = Math.floor(totalTime / 3600);
        var minute = Math.floor(totalTime % 3600 / 60);
        var second = Math.floor(totalTime % 60);
        spans[0].innerHTML = Math.floor(hour/10);
        spans[1].innerHTML = Math.floor(hour%10);
        spans[3].innerHTML = Math.floor(minute/10);
        spans[4].innerHTML = Math.floor(minute%10);
        spans[6].innerHTML = Math.floor(second/10);
        spans[7].innerHTML = Math.floor(second%10);

    }, 1000);
}