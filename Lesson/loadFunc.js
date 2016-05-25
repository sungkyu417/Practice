/**
 * Created by Administrator on 2016/3/12.
 */
function addLoadEvent(func){
    var oldOnLoad=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else{
        window.onload=function(){
            oldOnLoad();
            func();
        }
    }

}