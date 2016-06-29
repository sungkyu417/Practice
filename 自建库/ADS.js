/**
 * Created by Administrator on 2016/6/7.
 */
(
    function(){
        if(!window.ADS){
            window['ADS']={}
        }
        function isCompatible(other) {
            if(other==false||!Array.prototype.push||!Object.hasOwnProperty
            ||!Document.createElement||!Document.getElementsByTagName){
                return false;
            }
            return true;

        }
        window['ADS']['isCompatible']=isCompatible;

        function $(){
            var elements=new Array();
            for(var i=0;i<arguments.length;i++){
                var element=arguments[i];
                if(typeof  element =="string"){
                    element=document.getElementById(element);
                }
                if(arguments.length==1){
                    return element;
                }
                elements.push(element);
            }
            return elements;
        }
        window['ADS']['$']=$;

        function exampleLibraryMethod(obj){
            if(!(obj=$(obj)))return false;
        }
        window['ADS']['exampleLibraryMethod']=exampleLibraryMethod;

        function addEvent(node,type,listener){
            if(!isCompatible)return false;
            if(!(node=$(node)))return false;
            if(node.addEventListener){
                node.addEventListener(type,listener,false);
                return true;
            }else if(node.attachEvent){
                node['e'+type+listener]=listener;
                node[type+listener]=function(){
                    node['e'+type+listener](window.event);
                }
                node.attachEvent('on'+type,node[type+listener]);
                return true;
            }
            return false;
        }
        window['ADS']['addEvent']=addEvent;

        function removeEvent(node,type,listener){
            if(!(node=$(node)))return false;
            if(node.removeEventListener){
                node.removeEventListener(type,listener,false);
                return true;
            }else if(node.detachEvent){
                node.detachEvent('on'+type,node[type,listener]);
                node[type+listener]=null;
                return true;
            }
            return false;
        }
        window['ADS']['removeEvent']=removeEvent;

        function getElementByClassName(className,tag,parent){
            parent=parent||document;
            if(!(parent=$(parent)))return false;
            var allTags=(tag=="*"&&parent.all)?parent.all:parent.getElementsByTagName(tag);
            var matchingElements=new Array();
            className=className.replace(/\-/g,"\\-");
            var regex=new RegExp("(^|\\s)"+className+"(\\s|$)");
            var element;
            for(var i=0;i<allTags.length;i++){
                element=allTags[i];
                if(regex.test(element.className)){
                    matchingElements.push(element);
                }
            }
            return matchingElements;
        }
        window['ADS']['getElementByClassName']=getElementByClassName;

        function toggleDisplay(node,value){
            if(!(node=$(node)))return false;
            if(node.style.display!='none'){
                node.style.display='none';
            }else {
                node.style.display=value||'';
            }
            return true;
        };
        window['ADS']['toggleDisplay']=toggleDisplay;

        function insertAfter(node,referenceNode){
            if(!(node=$(node)))return false;
            if(!(referenceNode=$(referenceNode)))return false;
            return referenceNode.parentNode.insertBefore(node,referenceNode.nextSibling);
        };
        window['ADS']['insertAfter']=insertAfter;

        function removeChildren(parent){
            if(!(parent=$(parent)))return false;
            while (parent.firstChild){
                parent.firstChild.parentNode.removeChild(parent.firstChild);
            }
            return parent;


        };
        window['ADS']['removeChildren']=removeChildren;

        function prependChild(parent,newChild){
            if(!(parent=$(parent)))return false;
            if(!(newChild=$(newChild)))return false;
            if(parent.firstChild){
                parent.insertBefore(newChild,parent.firstChild);
            }else {
                parent.appendChild(newChild);
            }
            return parent;
        };
        window['ADS']['prependChild']=prependChild;
        //绑定事件
        function bindFunction(obj,func){
            return function (){
                func.apply(obj,arguments);
            }
        }
        window['ADS']['bindFunction']=bindFunction;

        function getBrowserWindowSize(){
            var de=document.documentElement;
            return{
                'width':(window.innerWidth||(de&&de.clientWidth)||document.body.clientWidth),
                'height':(window.innerHeight||(de&&de.clientHeight)||document.body.clientHeight)
            }
        }
        window['ADS']['getBrowserWindowSize']=getBrowserWindowSize;

        window['ADS']['node']={
            ELEMENT_NODE:1,
            ATTRIBUTE_NODE:2,
            TEXT_NODE:3,
            CDATA_SECTION_NODE:4,
            ENTITY_REFERENCE_NODE:5,
            ENTITY_NODE:6,
            PROCESSING_INSTRUCTION_NODE:7,
            COMMENT_NODE:8,
            DOCUMENT_NODE:9,
            DOCUMENT_TYPE_NODE:10,
            DOCUMENT_FRAGMENT_NODE:11,
            NOTATION_NODE:12
        };

        function walkElementLinear(func,node){
            var root=node||window.document;
            var nodes=root.getElementsByTagName("*");
            for(var i=0;i<nodes.length;i++){
                func.call(nodes[i]);
            }
        }
        window['ADS']['walkElementLinear']=walkElementLinear;

        function walkTheDOMRecursive(func,node,depth,returnedFromParent){
            var root=node||window.document;
            var returnedFromParent=func.call(root,depth++,returnedFromParent);
            var node=root.firstChild;
            while (node){
                walkTheDOMRecursive(func,node,depth,returnedFromParent);
                node=node.nextSibling;
            }
        }
        window['ADS']['walkTheDOMRecursive']=walkTheDOMRecursive;

        function walkTheDOMWithAttributes(node,func,depth,returnedFromParent){
            var root=node||window.document;
            returnedFromParent=func(root,depth++,returnedFromParent);
            if(root.attributes){
                for(var i=0;i<root.attributes.length;i++){
                    walkTheDOMWithAttributes(root.attributes[i],func,depth-1,returnedFromParent);

                }
            }
            if(root.nodeType!=ADS.node.ATTRIBUTE_NODE){
                node=root.firstChild;
                while(node){
                    walkTheDOMWithAttributes(node,func,depth,returnedFromParent);
                    node=node.nextSibling;
                }
            }
        }
        window['ADS']['walkTheDOMWithAttributes']=walkTheDOMWithAttributes;
        //将“-”命名改为驼峰命名
        function camelize(s){
            return s.replace(/-(\w)/g,function(strMatch,p1){
                return p1.toUpperCase();
            });
        }
        window['ADS']['camelize']=camelize;
        //停止事件流
        function stopPropagation(eventObject){
            eventObject=eventObject||getEventObject(eventObject);
            if(eventObject.stopPropagation){
                eventObject.stopPropagation();
            }else {
                eventObject.cancelBubble=true;
            }
        }
        window['ADS']['stopPropagation']=stopPropagation;
        //取消默认行为
        function preventDefault(eventObject){
            eventObject=eventObject||getEventObject(eventObject);
            if(eventObject.preventDefault){
                eventObject.preventDefault();
            }else {
                eventObject.returnValue=false;
            }
        }
        window['ADS']['preventDefault']=preventDefault;
        //更为精细的事件加载监听器
        function addLoadEvent(loadEvent,waitForImages){
            if(!isCompatible())return false;
            if(waitForImages){
                return addEvent(window,'load',loadEvent);
            }
            var init=function(){
                if(arguments.callee.done)return;
                arguments.callee.done=true;
                loadEvent.apply(document,arguments);
            };
            if(document.addEventListener){
                document.addEventListener("DOMContentLoaded",init,false);
            }
            //对于safafi，使用setInterval检测
            if(/WebKit/i.test(navigator.userAgent)){
                var _timer=setInterval(function(){
                    if(/loaded|complete/.test(document.readyState)){
                        clearInterval(_timer);
                        init();
                    }
                },10);
            }
            //对于IE，附加一个在载入过程中最后执行的脚本，并检测该脚本是否载入完成
            document.write("<script id='_ie_onload' defer src=javascript:void(0)></script>");
            var script=document.getElementById("_ie_onload");
            script.onreadystatechange=function(){
                if(this.readyState=="complete"){
                    init();
                }
            };
            return true;
        }
        window['ADS']['addLoadEvent']=addLoadEvent;
        //获得事件对象
        function getEventObject(W3CEvent){
            return W3CEvent||window.event;
        }
        window['ADS']['getEventObject']=getEventObject;

        //针对不同浏览器获得给定事件的目标
        function getTarget(eventObject){
            eventObject=eventObject||getEventObject(eventObject);
            var target=eventObject.target||eventObject.srcElement;
            if(target.nodeType==ADS.node.TEXT_NODE){
                target=node.parentNode;
            }
            return target;
        }
        window['ADS']['getTarget']=getTarget;

        //针对不同的浏览器获得鼠标按钮
        function getMouseButton(eventObject){
            eventObject=eventObject||getEventObject(eventObject);
            var buttons={
                'left':false,
                'middle':false,
                'right':false
            };
            if (eventObject.toString&&eventObject.toString().indexOf('MouseEvent')!=-1){
                //W3C方法
                switch (eventObject.button){
                    case 0:buttons.left=true;break;
                    case 1:buttons.middle=true;break;
                    case 2:buttons.right=true;break;
                    default:break;
                }
            }else if(eventObject.button){
                //MSIE方法
                switch (eventObject.button){
                    case 1:buttons.left=true;break;
                    case 2:buttons.right=true;break;
                    case 3:buttons.left=true;buttons.right=true;break;
                    case 4:buttons.middle=true;break;
                    case 5:buttons.left=true;buttons.middle=true;break;
                    case 6:buttons.middle=true;buttons.right=true;break;
                    case 7:buttons.left=true;buttons.middle=true;buttons.right=true;break;
                    default:break;
                }
            }else {
                return false;
            }
            return buttons;

        }
        window['ADS']['getMouseDown']=getMouseButton;
        //获得鼠标坐标
        function getPointerPosition(eventObject){
            eventObject=eventObject||getEventObject(eventObject);
            var x=eventObject.pageX||(eventObject.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft));
            var y=eventObject.pageY||(eventObject.clientY+(document.documentElement.scrollTop||document.body.scrollTop));
            return {'x':x,'y':y};
        }
        window['ADS']['getPointerPosition']=getPointerPosition;

        function getKeyPressed(eventObject){
            eventObject=eventObject||getEventObject(eventObject);
            var code=eventObject.keyCode;
            var value=String.fromCharCode(code);
            return {'code':code,'value':value};
        }
        window['ADS']['getKeyPressed']=getKeyPressed;
        //通过ID修改单个元素的样式
        function setStyleById(element,styles){
            if(!(element=$(element))) return false;
            for(property in styles){
                if(!styles.hasOwnProperty(property)){
                    continue;
                }
                if(element.style.setProperty){
                    element.style.setProperty(uncamelize(property,'-'),styles[property],null);
                }else {
                    element.style[camelize(property)]=styles[property];
                }
            }
            return true;
        }
        window['ADS']['setStyleById']=setStyleById;

        //通过类名修改多个元素样式
        function setStyleByClassName(parent,tag,className,styles){
            if(!(parent=$(parent)))return false;
            var elements=getElementByClassName(className,tag,parent);
            for(var e=0;e<elements.length;e++){
                setStyleById(elements[e],styles);
            }
            return true;
        }
        window['ADS']['setStyleByClassName']=setStyleByClassName;

        //通过标签名修改多个元素的样式
        function setStyleByTagName(tagname,styles,parent){
            parent=$(parent)||document;
            var elements=parent.getElementsByTagName(tagname);
            for(var e=0;e<elements.length;e++){
                setStyleById(elements[e],styles);
            }
        }
        window['ADS']['setStyleByTagName']=setStyleByTagName;

        //获得类名
        function getClassNames(element){
            if(!(element=$(element))) return false;
            return element.className.replace(/\s+/,' ').split(' ');
        }
        window['ADS']['getClassNames']=getClassNames;

        //判断是否有某个类
        function hasClassName(element,className){
            if(!(element=$(element))) return false;
            var classes=getClassNames(element);
            for(var i=0;i<classes.length;i++){
                if(classes[i]===className) return true;
            }
            return false;
        }
        window['ADS']['hasClassName']=hasClassName;

        //添加类
        function addClassName(element,className){
            if(!(element=$(element))) return false;
            element.className+=(element.className?' ':'')+className;
            return true;
        }
        window['ADS']['addClassName']=addClassName;

        //移除类
        function removeClassName(element,className){
            if(!(element=$(element))) return false;
            var classes=getClassNames(element);
            var length=classes.length;
            for(var i=length-1;i>=0;i--){
                if(classes[i]===className){
                    delete (classes[i]);
                }
            }
            element.className=classes.join(' ');
            return (length==classes.length?false:true);
        }
        window['ADS']['removeClassName']=removeClassName;

        function toggleClassName(element,className){
        if(!hasClassName(element,className)){
            addClassName(element,className);
        }else {
            removeClassName(element,className);
        }
        }
        window['ADS']['toggleClassName']=toggleClassName;

        function addStyleSheet(url,media){
            media=media||'screen';
            var link=document.createElement('link');
            link.setAttribute('rel','stylesheet');
            link.setAttribute('type','text/css');
            link.setAttribute('href',url);
            link.setAttribute('media',media);
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        window['ADS']['addStyleSheet']=addStyleSheet;

        function removeStyleSheet(url,media){
            var styles=getStyleSheets(url,media);
            for(var i=0;i<styles.length;i++){
                var node=styles[i].ownerNode||styles[i].owningElement;
                styles[i].disabled=true;
                node.parentNode.removeChild(node);
            }
        }
        window['ADS']['removeStyleSheet']=removeStyleSheet;

        //根据href和media属性返回包含匹配样式表的数组
        function getStyleSheets(url,media){
            var sheets=[];
            for(var i=0;i<document.styleSheets.length;i++){
                if(url&&document.styleSheets[i].href.indexOf(url)==-1)continue;
                if(media){
                    media=media.replace(/,\s*/,',');
                    var sheetMedia;
                    if(document.styleSheets[i].media.mediaText){
                        sheetMedia=document.styleSheets[i].media.mediaText.replace(/,\s*/,',');
                        sheetMedia=sheetMedia.replace(/,\s*$/,'');
                    }else {
                        sheetMedia=document.styleSheets[i].media.replace(/,\s*/,',');
                    }
                    if(media!=sheetMedia)continue;
                }
                sheets.push(document.styleSheets[i]);
            }
            return sheets;
        }
        window['ADS']['getStyleSheets']=getStyleSheets;

        //编辑修改样式规则
        function editCSSRule(selector,styles,url,media){
            var styleSheets=(typeof url=='array')?url:getStyleSheets(url,media);
            for(var i=0;i<styleSheets.length;i++){
                //取得规则列表
                var rules=styleSheets[i].cssRules||styleSheets[i].rules;
                if(!rules)continue;
                selector=selector.toUpperCase();
                for(var j=0;j<rules.length;j++){
                    if(rules[j].selectorText.toUpperCase()==selector){
                        for(property in styles){
                            if(!styles.hasOwnProperty(property))continue;
                            //设置新的样式属性
                            rules[j].style[camelize(property)]=styles[property];
                        }
                    }
                }
            }
        }
        window['ADS']['editCSSRule']=editCSSRule;

        //增加一个CSS规则
        function addCSSRule(selector,styles,index,url,media){
            var declaration='';
            for(property in styles){
                if(!styles.hasOwnProperty(property)){
                    continue;
                }
                declaration+=property+':'+styles[property]+';';
            }
            var styleSheets=(typeof url=='array')?url:getStyleSheets(url,media);
            var newIndex;
            for(var i=0;i<styleSheets.length;i++){
                if(styleSheets[i].insertRule){
                    newIndex=(index>=0?index:styleSheets[i].cssRules.length);
                    styleSheets[i].insertRule(selector+'{'+declaration+'}',newIndex);
                }else if(styleSheets[i].addRule){
                    newIndex=(index>=0?index:-1);
                    styleSheets[i].addRule(selector,declaration,newIndex);
                }
            }
        }
        window['ADS']['addCSSRule']=addCSSRule;

        function getStyle(element,property){
            if(!(element=$(element))||!property) return false;
            var value=element.style[camelize(property)];
            if(!value){
                if(document.defaultView&&document.defaultView.getComputedStyle){
                    var css=document.defaultView.getComputedStyle(element,null);
                    value=css?css.getPropertyValue(property):null;
                }else if(element.currentStyle){
                    value=element.currentStyle[camelize(property)];
                }
            }
            return value=='auto'?'':value;
        }
        window['ADS']['getStyle']=getStyle;
        window['ADS']['getStyleById']=getStyle;

        function parseJSON(string,filter){
            var j;
            function walk(k,v){
                var i;
                if(v&&typeof v==='object'){
                    for(i in v){
                        if(v.hasOwnProperty(i)){
                            v[i]=walk(i,k[v]);
                        }
                    }
                }
                return filter(k,v);
            }
            if(/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(s)){
                try{
                    j=eval('('+s+')');
                }catch (e){
                    throw new SyntaxError("parseJSON");
                }
            }else {
                throw new SyntaxError("parseJSON");
            }
            if(typeof filter=='function'){
                j=walk('',j);
            }
            return j;
        }
        function getRequestObject(url,options){
            var req=false;
            if(window.XMLHttpRequest){
                var req=new window.XMLHttpRequest();
            }else if(window.ActiveXObject){
                var req=new window.ActiveXObject('Microsoft.XMLHTTP');
            }
            if(!req)return false;
            options=options||{};
            options.method=options.method||'GET';
            options.send=options.send||null;
            req.onreadystatechange=function(){
                switch (req.readyState){
                    case 1:
                        if(options.loadListener){
                            options.loadListener.apply(req,arguments);
                        }
                        break;
                    case 2:
                        if(options.loadedListener){
                            options.loadedListener.apply(req,arguments);
                        }
                        break;
                    case 3:
                        if(options.ineractiveListener){
                            options.ineractiveListener.apply(req,arguments);
                        }
                        break;
                    case 4:
                        try {
                            if(req.status&&req.status==200){
                                var contentType=req.getResponseHeader('Content-Type');
                                var mimeType=contentType.match(/\s*([^;]+)\s*(;|$)/i)[1];
                                switch (mimeType){
                                    case 'text/javascript':
                                    case 'application/javascript':
                                        if(options.jsResponseListener){
                                            options.jsResponseListener.call(req,req.responseText);
                                        }
                                        break;
                                    case 'application/json':
                                        if(options.jsonResponseListener){
                                            try{
                                                var json=parseJSON(req.responseText);
                                            }catch (e){
                                                var json=false;
                                            }
                                            options.jsonResponseListener.call(req,json);
                                        }
                                        break;
                                    case 'text/xml':
                                    case 'application/xml':
                                    case 'application/xhtml+xml':
                                        if(options.xmlResponseListener){
                                            options.xmlResponseListener.call(req,req.responseXML);
                                        }
                                        break;
                                    case 'text/html':
                                        if(options.htmlResponseListener){
                                            options.htmlResponseListener.call(req,req.responseText);
                                        }
                                        break;
                                }
                                if(options.completeListener){
                                    options.completeListener.apply(req,arguments);
                                }
                            }else {
                                if(options.errorListener){
                                    options.errorListener.apply(req,arguments);
                                }
                            }
                        }catch (e){}
                        break;
                }
            };
            req.open(options.method,url,true);
            req.setRequestHeaders('X-ADS-Ajax-Request','AjaxRequest');
            return req;

        }
        window['ADS']['getRequestObject']=getRequestObject;

        function ajaxRequest(url,options){
            var req=getRequestObject(url,options);
            return req.send(options.send);
        }
        window['ADS']['ajaxRequest']=ajaxRequest;

        var XssHttpRequestCount=0;
        var XssHttpRequest=function(){
            this.requestID='XSS_HTTP_REQUEST_'+(++XssHttpRequestCount);
        }

    })();
if(!String.repeat){
    String.prototype.repeat=function(l){
        return new Array(l+1).join(this);
    }
}
if(!String.trim){
    String.prototype.trim=function(){
        return this.replace(/^\s+|\s+$/g,'');
    }
}
