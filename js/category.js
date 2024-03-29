// 左侧导航栏事件-重点
// 1.实现滑动
// 2.静止状态下的滑动区间
// 3.手动拖动的状态下的滑动区间
// 4.实现单击操作
//     1.修改当前被点击的li元素的样式
//     2.将li元素移动到最顶部，但是不能超出之前设置的精致状态下的最小区间
//     3.在移动端，pc端的click等事件会有延迟，因为移动设备需要去判断用户是进行单击操作还是双击操作，所以在用户第一次单击后，会延迟300ms来执行，以便观察和判断用户是否需要执行双击操作。所以我们会使用移动端优先响应的touch事件来模拟click事件。
$(function() {
	var myScroll = new IScroll('.ct_hotCategory', {
        mouseWheel: true,
        scrollbars: true
    
    });

    //ct_cLeft
    var myScroll_cLeft = new IScroll('.ct_cLeft', {
        mouseWheel: true,
        // scrollbars: true
    
    });
    FastClick.attach(document.body);

    $(".ct_cLeft").on("click",function (e) {
        //查找子元素
        $(this).find("li").each(function(index,e){
           $(e).removeClass("active")
        });
        var liDom  = e.target.parentNode;
        $(liDom).addClass("active");
    })

});
