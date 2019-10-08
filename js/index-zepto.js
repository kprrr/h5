$(function(){
    var banner = $(".jd_banner");
    var bannerWidth = banner.width();
    var imgBox = banner.find("ul:eq(0)");
    var firstLi = imgBox.find("li:first");
    var lastLi = imgBox.find("li:last");
    var indicators = banner.find("ul:eq(1)").find("li");
    
    imgBox.append(firstLi.clone());
    lastLi.clone().insertBefore(firstLi);

    var countImg = imgBox.find("li").length;
    // 设置默认偏移
    imgBox.css("left",-bannerWidth);

    //定义图片索引
    var index = 1;
    var imgAnimation = function(index){
        imgBox.animate(
            {"left":-index*bannerWidth},
            500,
           "ease-in-out",
           function(){
             //当到倒数第二张时，回到第一张
            if (index == countImg - 1) {
                index = 1;
                imgBox.css("left",-bannerWidth);
            }

            //设置点标记
            indicators.removeClass("active").eq(index - 1).addClass("active");
           }

        );
    }
    var timer = function () {
        return setInterval(() => {
            index++;
            imgAnimation(index);
        }, 1000);
    }

    var timeId = timer();

    //向左滑动
    imgBox.on("swipeLeft",function () {
        clearInterval(timeId);
        index++;
        imgAnimation(index);
        timeId = timer();
        
    });
    //向右滑动
    imgBox.on("swipeRight",function(){
        clearInterval(timeId);
        index--;
        imgAnimation(index);
        timeId = timer();
    });
});