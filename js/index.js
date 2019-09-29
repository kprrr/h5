window.onload = function () {
    searchEffect();
    timeBack();
    bannerEffect()
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
        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = Math.floor(hour % 10);
        spans[3].innerHTML = Math.floor(minute / 10);
        spans[4].innerHTML = Math.floor(minute % 10);
        spans[6].innerHTML = Math.floor(second / 10);
        spans[7].innerHTML = Math.floor(second % 10);

    }, 1000);
}

// 轮播图
function bannerEffect() {
    // 1.设置轮播图的页面结构
    //a.在开始位置添加原始的最后一张图片
    //b.在结束位置添加原始的第一张图片
    //1.1获取最外部轮播图结构
    var banner = document.querySelector(".jd_banner");
    var bannerWidth = banner.offsetWidth;
    //1.2获取图片容器
    var imgBox = banner.querySelector(".jd_bannerImg");
    //1.3获取原始的第一张图片
    var first = imgBox.querySelector("li:first-of-type");
    //1.4获取原始的最后一张图片
    var last = imgBox.querySelector("li:last-of-type");
    //1.5在首尾插入两张图片 cloneNode：复制一个dom元素
    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);

    //2.因为给容器插入了2张图，所以要重新设置样式
    var imgList = imgBox.querySelectorAll("li");
    var countImg = imgList.length;
    imgBox.style.width = bannerWidth * countImg;
    // imgBox.style.left = -2*bannerWidth+"px";
    //默认左偏移一个banner的长度
    imgBox.style.left = -bannerWidth + "px";
    //4.当屏幕变化的时候，重新计算宽度
    // window.onresize = function () {

    // }
    var index = 1 ;
    setInterval(() => {
        //5.2添加过度动画效果
        imgBox.style.transition = "left 0.5s ease-in-out";
        imgBox.style.left = -((index++)*bannerWidth) + "px";

        if(index == countImg -1 ){ 
            setTimeout(() => {
                index = 1;
                imgBox.style.transition = "none";
                // imgBox.classList.add("noTransition");
                // imgBox.setAttribute("class","noTransition");
                imgBox.style.left = -bannerWidth + "px";
            }, 500);
        }
        
       
    }, 1000);

}