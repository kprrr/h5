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

    //轮播图点标记设置函数
    var setIndicator = function(index){
        var indicators = banner.querySelector(".jd_bannerIndicator")
        .querySelectorAll("li");
        for(var i = 0 ;i< indicators.length;i++) {
            indicators[i].classList.remove("active");
        }
        indicators[index-1].classList.add("active");
    };



    var index = 1;
    var timer = function () {
        return setInterval(() => {
            index++
            //5.2添加过度动画效果
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = -(index * bannerWidth) + "px";
            // console.log("当前index:" + index);

            //当到倒数第二张时，回到第一张
            if (index == countImg - 1) {
                setTimeout(() => {
                    index = 1;
                    imgBox.style.transition = "none";
                    // imgBox.classList.add("noTransition");
                    // imgBox.setAttribute("class","noTransition");
                    imgBox.style.left = -bannerWidth + "px";
                }, 500);
            }


        }, 1000);
        // return timeId;
    }

    var timeId = timer();

    //滑动操作

    //2.给imgBox清楚浮动，用于增加宽度的，否则无法触发touch事件
    //3.监听touch事件
    var startX, moveX, distanceX, currentLeftX;
    //3.1 开始滑动
    imgBox.addEventListener("touchstart", function (e) {
        //1.清除定时器
        clearInterval(timeId);
        startX = e.targetTouches[0].clientX;
        currentLeftX = imgBox.offsetLeft;
        console.log("当前index:"+index);

        // console.log("当前left值："+imgBox.offsetLeft+";"+"index计算后的left值"+-index*bannerWidth);

    });
    //3.2 滑动中
    imgBox.addEventListener("touchmove", function (e) {
        moveX = e.targetTouches[0].clientX;
        distanceX = moveX - startX;
        imgBox.style.transition = "none";
        // imgBox.style.left = (imgBox.offsetLeft + distanceX)+"px";
        imgBox.style.left = (currentLeftX + distanceX) + "px";

    });
    //3.3 滑动结束
    imgBox.addEventListener("touchend", function (e) {
        //3.3.1 如果滑动但没达到翻页距离，则回弹
        // console.log("滑动距离："+distanceX+";判断标准"+bannerWidth / 3);
        var standard = bannerWidth / 3;
        var absDistance = Math.abs(distanceX);
        if (absDistance > 0 && absDistance < standard) {
            imgBox.style.transition = "none";
            imgBox.style.left = -index * bannerWidth + "px";
        }
        //3.3.2 如果滑动并且达到翻页距离，则翻页
        if (absDistance >= standard) {
            imgBox.style.transition = "none";
            if (distanceX > 0) { //3.3.2.1 手往右滑，翻到前面一页
                //注意：这里不能这样计算，需要用index来计算，否则后续使用index时就会失败
                // imgBox.style.left = -(index - 1) * bannerWidth + "px";

                //如果到了第一页,则跳转到最后一页
                if (index == 1) {
                    index = countImg - 1;
                    imgBox.style.left = -index * bannerWidth + "px";
                } else {
                    index--;
                    //滑动效果
                    imgBox.style.transition = "left 0.5s ease-in-out";
                    imgBox.style.left = -index * bannerWidth + "px";
                }

            } else { //3.3.2.2 手往坐滑，翻到后面一页
                //注意：这里不能这样计算，需要用index来计算，否则后续使用index时就会失败
                // imgBox.style.left = -(index + 1) * bannerWidth + "px";
                //如果到了最后一页，则跳转到第一页
                if (index == countImg - 2) {
                    index = 1;
                    imgBox.style.left = -index * bannerWidth + "px";
                } else {
                    index++;
                    imgBox.style.transition = "left 0.5s ease-in-out";
                    imgBox.style.left = -index * bannerWidth + "px";
                }

            }

        }
        //3.3.3 如果没有滑动 ，则不做任何处理
        if (absDistance == 0) {

        }
        timeId = timer();
    });

    //使用 webkitTransitionEnd ，可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕后，会触发这个事件
    imgBox.addEventListener("webkitTransitionEnd",function () {
       setIndicator(index); 
    });

}