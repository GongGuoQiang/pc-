(function($){
    function slider(options){
        this.opts=$.extend({},slider,slider.defaluts,options);
        console.log(this.opts)
        this._imgSlider(this.opts);
        this.bindTouchEvn(this.opts)
    }
    slider.defaluts={
        imgElement:null,
        liElement:null,
        leftBtn:null,
        rightBtn:null,
        time:2000,
    }
    slider.prototype._imgSlider=function(){
        var opts=this.opts,
        index=0,
        len=opts.imgElement.length,
        timeInter=null;
        if (opts.imgElement=='') {
            return
        }
        opts.imgElement.eq(0).show();
        showTime();
        // 点击li显示对应的图片
        opts.liElement.click(function(){
            var id=$(this).index();
            show(id);
        });
        // rightBtn
        opts.rightBtn.click(function(){
            clearInterval(timeInter);
            index++;
            if (index>len-1) {
                index=0;
            }
            show(index);
            showTime();
        });
        opts.leftBtn.click(function(){
            clearInterval(timeInter);
            index--;
            if (index<0) {
                index=len-1;
            }
            show(index);
            showTime();
        });
        opts.imgElement.hover(function(){
            clearInterval(timeInter);
        },function(){
            showTime();
        })
    function showTime(){
        timeInter=setInterval(function(){
            index++;
            if (index>len) {
                index=0;
            }
            show(index);
        },opts.time)
    }
    function show(index){
        opts.imgElement.eq(index).fadeIn(1000).siblings('img').fadeOut(1000);
        opts.liElement.eq(index).addClass('active').siblings('li').removeClass('active');
    }

}
    slider.prototype.bindTouchEvn = function() {
        var opts=this.opts;
        var ready_moved=true;
        var touch;
        var len=opts.imgElement.length;
        var startPos = {};//开始位置
        var endPos={};
        var index=0;
        var scrollDirection;//滚动方向
        opts.imgbox[0].addEventListener('touchstart',touchstart, false);
        opts.imgbox[0].addEventListener('touchmove',touchmove, false);
        opts.imgbox[0].addEventListener('touchend',touchend, false);
        function touchstart(e){
            // clearInterval(timeInter);
            touch = event.targetTouches[0];//取得第一个touch的坐标值
            startPos = {x:touch.pageX,y:touch.pageY}
            scrollDirection = 0;
        };
        function touchmove(e){
            // 如果有多个地方滑动，我们就不发生这个事件
                if(event.targetTouches.length > 1){
                    return
                }
                touch = event.targetTouches[0];
                endPos = {x:touch.pageX,y:touch.pageY}
                // 判断出滑动方向，向右为1，向左为-1
                scrollDirection = touch.pageX-startPos.x > 0 ? 1 : -1;
                console.log(scrollDirection)
        };
        function touchend(e){
            if (scrollDirection == -1) {
                index--;
                if (index<0) {
                    index=len-1;
                }
                show(index);
            } else if(scrollDirection == 1){
                index++;
                if (index>len-1) {
                    index=0;
                }
                show(index);
            }else{
                return
            }
        };
        function show(index){
            opts.imgElement.eq(index).fadeIn(1000).siblings('img').fadeOut(1000);
            opts.liElement.eq(index).addClass('active').siblings('li').removeClass('active');
        }
    }
    $.extend({
        slider:function(options){
            new slider(options);
        }
    })
})(jQuery);
