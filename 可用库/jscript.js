/**
 * Created by Administrator on 2016/5/30.
 */
if(typeof jscript=='undefined'){
    jscript=function(){}
}
//array
jscript.array=function(){}
jscript.array.copyArray= function (inSrcArray,inDestArray) {
    var i;
    for(i=0;i<inSrcArray.length;i++){
        inDestArray.push(inSrcArray[i]);
    }
    return inDestArray;
}
jscript.array.findInArray=function(inArray,inValue){
    var i;
    for(i=0;i<inArray.length;i++){
        if(inArray[i]==inValue){
            return i;
        }
    }
    return -1;
}
jscript.array.arrayAverage=function(inArray){
    var accumulator=0;
    for(var i=0;i<inArray.length;i++){
        accumulator+=inArray[i];
    }
    return accumulator/inArray.length;
}
//browser
jscript.browser=function(){}
jscript.browser.getBrowserIndentity=function(){
    return navigator.appName+" "+navigator.appVersion;
}
//datetime
jscript.dateTime=function(){}
//得到某月的天数
jscript.dateTime.getNumberDaysInMonth=function(inMonth,inYear){
    inMonth=inMonth-1;
    var leap_year=this.isLeapYear(inYear);
    if(leap_year){
        leap_year=1;
    }else {
        leap_year=0;
    }
    if(inMonth==3||inMonth==5||inMonth==8||inMonth==10){
        return 30;
    }else  if(inMonth==1){
        return 28+leap_year;
    }else {
        return 31;
    }
}
jscript.dateTime.isLeapYear=function(inYear){
    if((inYear%400==0)||(inYear%4==0&&inYear%100!=0)){
        return true
    }else {
        return false;
    }
}
jscript.dom=function(){}
//水平居中
jscript.dom.layerCenterH=function(inObj){
    var lca,lcb,lcx,iebody,dsocleft;
    if(window.innerWidth){
        lca=window.innerWidth;
    }else {
        lca=document.body.clientWidth;
    }
    lcb=inObj.offsetWidth;
    lcx=Math.round(lca/2)-Math.round(lcb/2);
    iebody=(document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body;
    dsocleft=document.all?iebody.scrollLeft:window.pageXOffset;
    inObj.style.left=lcx+dsocleft+"px";
}
//元素垂直居中
jscript.dom.layerCenterV=function(inObj){
    var lca,lcb,lcx,iebody,dsoctop;
    if(window.innerHeight){
        lca=window.innerHeight;
    }else {
        lca=document.body.clientHeight;
    }
    lcb=inObj.offsetHeight;
    lcx=Math.round(lca/2)-Math.round(lcb/2);
    iebody=(document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body;
    dsoctop=document.all?iebody.scrollTop:window.pageYOffset;
    inObj.style.left=lcx+dsoctop+"px";
}
//执行script代码
jscript.dom.execScripts=function(inText){
    var si=0;
    while (true){
        var ss=inText.indexOf("<"+"script"+">",si);
        if(ss==-1){
            return;
        }
        var se=inText.indexOf("<"+"/"+"script"+">",ss);
        if(se==-1){
            return;
        }
        si=se+9;
        var sc=inText.substring(ss+8,se);
        eval(sc);
    }
}
//得到dom元素
jscript.dom.getDOMElements=function(){
    if(arguments.length==0){
        return null;
    }
    if(arguments.length==1){
        return document.getElementById(arguments[0]);
    }
    var elems;
    for(var i=0;i<arguments.length;i++){
        elems.push(document.getElementById(arguments[i]));
    }
    return elems;
}
jscript.form=function(){}
//将form转化为xml格式
jscript.form.formToXML=function(inForm,inRootElement){
    if(inForm==null){
        return null;
    }
    if(inRootElement==null){
        return null;
    }
    var outXML="<"+inRootElement+">";
    var i;
    for(i=0;i<inForm.length;i++){
        var ofe=inForm[i];
        var ofeType=ofe.type.toLowerCase();
        var ofeName=ofe.name;
        var ofeValue=ofe.value;
        if(ofeType=="text"||ofeType=="hidden"||ofeType=="password"||ofeType=="select-one"||ofeType=="textarea"){
            outXML+="<"+ofeName+">"+ofeValue+"</"+ofeName+">";
        }
        if(ofeType=="radio"&&ofe.checked==true){
            outXML+="<"+ofeName+">"+ofeValue+"</"+ofeName+">";
        }
        if(ofeType=="checkbox"){
            if(ofe.checked==true){
                cbval="true";
            }else {
                cbval="false";
            }
            outXML=outXML+"<"+ofeName+">"+cbval+"</"+ofeName+">";
        }
        outXML+="";
    }
    outXML+="</"+inRootElement+">";
    return outXML;
}
//是否得到select的某个选项，inCaseInsensitive表示是否忽略大小写
jscript.form.selectLocateOption=function(inSelect,inValue,inJustFind,inCaseInsensitive){
    if(inSelect==null||inValue==0||inValue==""||inCaseInsensitive==null||inJustFind==null){
        return;
    }
    if(inCaseInsensitive){
        inValue=inValue.toLowerCase();
    }
    var found=false;
    var i;
    for(i=0;(i<inSelect.length)&&!found;i++){
        var nextVal=inSelect.options[i].value;
        if(inCaseInsensitive){
            nextVal=nextVal.toLowerCase();
        }
        if(nextVal==inValue){
            found=true;
            if(!inJustFind){
                inSelect.options[i].selected=true;
            }
        }
    }
    return found;
}
//得到select的所有属性
jscript.form.selectAll=function(inSelect){
    if(inSelect==null||!inSelect.options||inSelect.options.length==0){
        return;
    }
    var i;
    for(i=0;i<inSelect.options.length;i++){
        inSelect.options[i].selected=true;
    }
}
jscript.lang=function(){}
//复制属性，inOverride为是否覆盖原来的属性
jscript.lang.copyProperties=function(inSrcObj,inDestObj,inOverride){
    var prop;
    for(prop in inSrcObj){
        if(inOverride||!inDestObj[prop]){
            inDestObj[prop]=inSrcObj[prop];
        }
    }
    return inDestObj;
}
jscript.math={
    //得到inMin与inMax之间的随机数字
    genRandomNumber:function(inMin,inMax){
        if (inMax<inMin){
            return 0;
        }
        return Math.random()*(inMax-inMin)+inMin;
    }
}

jscript.page={
    //打印页面
    printPage:function(){
        if(parseInt(navigator.appVersion)>=4){
            window.print();
        }
    },
    //获得参数
    getParameter:function(inParamName){
        var retVal=null;
        var varvals=decodeURIComponent(location.search.substring(1));
        if(varvals){
            var search_array=varvals.split("&");
            var temp_array=new Array();
            var i,j=0;
            for(i=0;i<search_array.length;i++){

                temp_array=search_array[i].split("=");
                var pName=temp_array[0];
                var pVal=temp_array[1];
                if(inParamName==null){
                    if(retVal==null){
                        retVal=new Array();
                    }
                    retVal[j]=pName;
                    retVal[j+1]=pVal;
                    j=j+2;
                }else {
                    if(pName==inParamName){
                        retVal=pVal;
                        break;
                    }
                }
            }
        }
        return retVal;

    },
    //打破框架
    breakOutOfFrames:function(){
        if(self!=top){
            top.location=self.location;
        }
    }
}

jscript.storage={
    //创建及保存cookie
    setCookie:function(inName,inValue,inExpiry){
        if(typeof  inExpiry=="Date"){
            inExpiry=inExpiry.toGMTString();
        }
        document.cookie=inName+"="+encodeURIComponent(inValue)+"; expires="+inExpiry;
    },
    //获得cookie
    getCookie:function(inName){
        var docCookies=document.cookie;
        var cIndex=docCookies.indexOf(inName+"=");
        if(cIndex==-1){
            return null;
        }
        cIndex=docCookies.indexOf("=",cIndex)+1;//???
        var endStr=docCookies.indexOf(";",cIndex);
        if(endStr==-1){
            endStr=docCookies.length;
        }
        return decodeURIComponent(docCookies.substring(cIndex,endStr));

    },
    //删除cookie
    deleteCookie:function(inName){
    if(this.getCookie(inName)){
        this.setCookie(inName,null,"Thu, 01-Jan-1970 00:00:01 GMT");
    }
}
}
jscript.string={
    //查询某个子串的数量
    substrCount:function(inStr,inSearchStr){
        if(inStr==null||inStr==""||inSearchStr==null||inSearchStr==""){
            return 0;
        }
        var splitChars=inStr.split(inSearchStr);
        return splitChars.length-1;
    },
    stripChars:function(inStr,inStrpOrAllow,inCharList){
        if(inStr==null||inStr==""||inStrpOrAllow==null||inStrpOrAllow==""||inCharList==null||inCharList==""){
            return "";
        }
        inStrpOrAllow=inStrpOrAllow.toLowerCase();
        var outStr="", i, j,nextChar,keepChar,checkChar;
        for(i=0;i<inStr.length;i++){
            nextChar=inStr.substr(i,1);
            if(inStrpOrAllow=="allow"){
                keepChar=false;
            }else {
                keepChar=true;
            }
            for(j=0;j<inCharList.length;j++){
                checkChar=inCharList.substr(j,1);
                if(inStrpOrAllow=="allow"&&nextChar==checkChar){
                    keepChar=true;
                }
                if(inStrpOrAllow=="strip"&&nextChar==checkChar){
                    keepChar=false;
                }
            }
            if(keepChar==true){
                outStr=outStr+nextChar;
            }
        }

    }
}