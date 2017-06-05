window.onload=function () {

    // 运动公式
    function animate(obj,json,fn) {
        clearInterval(obj.timer);
        obj.timer=setInterval(function () {
            var fag=true;
            for(var attr in json){
                var current=0;
                if(attr=='opacity'){
                    current=Math.round(parseInt(getStyle(obj,attr)*100))||0;
                }else {
                    current=parseInt(getStyle(obj,attr))
                }
                var step=(json[attr]-current)/10;
                step=step>0?Math.ceil(step):Math.floor(step);
                if(attr=='opacity'){
                    if('opacity' in obj.style){
                        obj.style.opacity=(current+step)/100
                    }else {
                        obj.style.filter='alpha(opacity=('+(current+step)*10+')'
                    }
                }else if(attr=='zIndex'){
                    obj.style.zIndex=json[attr]
                }else {
                    obj.style[attr]=current+step+'px'
                }
                if(current!=json[attr]){
                    fag=false
                }
            }
            if(fag==true){
                clearInterval(obj.timer)
                if(fn){
                    fn()
                }
            }
        },20)
    }
    function getStyle(obj, attr) {
        if(obj.currentStyle){
            return obj.currentStyle[attr]
        }else {
            return window.getComputedStyle(obj,null)[attr]
        }
    }
    // 轮播图开始
    var lb=document.getElementById('lbs');
    var slider=document.getElementById('sliders');
    var control=document.getElementById('controls');
    var ul=slider.children[0]
    var imgs=ul.children;
    var ol=document.createElement('ol');
    lb.appendChild(ol)
    for(var i=0;i<imgs.length;i++){
        var olli=document.createElement('li');
        olli.innerHTML=i+1;
        ol.appendChild(olli)
    }
    ol.children[0].className='current'
    var inow=0;
    var sliderWIdth=slider.offsetWidth;
    var lis=ol.children;
    for(var i=1;i<lis.length;i++){
        imgs[i].style.left=sliderWIdth+'px'
    }
    var controls=control.children;
    for(var i in controls){
        controls[i].onclick=function () {
            if(this.className=='pre'){
                animate(imgs[inow],{left:sliderWIdth});
                --inow<0?inow=imgs.length-1:inow;
                imgs[inow].style.left=-sliderWIdth+'px';
                animate(imgs[inow],{left:0})
                circle()
            }else {
                hss()
            }
        }
    }
    for(var j=0;j<lis.length;j++){
        lis[j].onmouseover=function () {
            var that=this.innerHTML-1;
            if(that>inow){
                animate(imgs[inow],{left:-sliderWIdth});
                imgs[that].style.left=sliderWIdth+'px'
            }else if(that<inow){
                animate(imgs[inow],{left:sliderWIdth});
                imgs[that].style.left=-sliderWIdth+'px'
            }
            inow=that;
            animate(imgs[inow],{left:0})
            circle()
        }
    }
    function circle() {
        for(var i=0;i<lis.length;i++){
            lis[i].className=''
        }
        lis[inow].className='current'
    }
    /*var timers=null;
    timers=setInterval(hss,3000)*/
    function hss() {
        animate(imgs[inow],{left:-sliderWIdth});
        ++inow>imgs.length-1?inow=0:inow;
        imgs[inow].style.left=sliderWIdth+'px';
        animate(imgs[inow],{left:0})
        circle()
    }
}
