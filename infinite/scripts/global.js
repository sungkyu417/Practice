/**
 * Created by Administrator on 2016/3/14.
 */
function addLoadEvent(func){
    var oldOnLoad=window.onload;
    if(typeof window.onload!='function'){
        window.onload=function(){
            func();
        }
    }else{
        window.onload=function(){
            oldOnLoad();
            func();
        }
    }

}
function insertAfter(newElement,targetElement){
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    }else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addClass(element,value){
    if(!element.className){
        element.className=value;
    }else{
        newClassName=element.className;
        newClassName+=" ";
        newClassName+=value;
        element.className=newClassName
    }
}

function highlightPage(){
    if(!document.getElementById)return false;
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById("navigation"))return false;
    var nav=document.getElementById("navigation");
    var links=nav.getElementsByTagName("a");
    var len=links.length;
    for(var i=0;i<len;i++){
        var linkUrl=links[i].getAttribute("href");
        var currentUrl=window.location.href;
        if(currentUrl.substring(linkUrl)!=-1){
            links[i].className="here";
            var linkText=links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linkText);
        }
    }
}
function moveElement(elementID,final_x,final_y,interval){
    if(!document.getElementById)return false;
    if(!document.getElementsByTagName)return false;
    var elem=document.getElementById(elementID);
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left="0px";
    }
    if(!elem.style.top){
        elem.style.top="0px";
    }
    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);
    if(xpos==final_x&&ypos==final_y){
        return true;
    }
    if(xpos<final_x){
        var dist=Math.ceil((final_x-xpos)/10);
        xpos+=dist;
    }
    if(xpos>final_x){
        var dist=Math.ceil((xpos-final_x)/10);
        xpos-=dist;
    }
    if(ypos<final_y){
        var dist=Math.ceil((final_y-ypos)/10);
        ypos+=dist;
    }
    if(ypos>final_y){
        var dist=Math.ceil((ypos-final_y)/10);
        ypos-=dist;
    }
    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement=setTimeout(repeat,interval);
}

function prepareSlideshow(){
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById("intro")) return false;
    var intro=document.getElementById("intro");
    var slideshow=document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var preview=document.createElement("img");
    preview.setAttribute("src","images/1.jpg");
    preview.setAttribute("alt","infinite");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);

    var links=intro.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onmouseover=function(){
            var dest=this.getAttribute("href");
            if(dest.indexOf("index.html")!=-1){
                moveElement("preview",0,0,5);
            }
            if(dest.indexOf("about.html")!=-1){
                moveElement("preview",-150,0,5);
            }
            if(dest.indexOf("photo.html")!=-1){
                moveElement("preview",-300,0,5);
            }
            if(dest.indexOf("live.html")!=-1){
                moveElement("preview",-450,0,5);
            }
            if(dest.indexOf("contact.html")!=-1){
                moveElement("preview",-600,0,5);
            }
        }
    }
}

function showSection(id){
    var divs=document.getElementsByTagName("div");
    for(var i=0;i<divs.length;i++){
        if(divs[i].className.indexOf("section")==-1)continue;
        if(divs[i].getAttribute("id")!=id){
            divs[i].style.display="none";
        }else{
            divs[i].style.display="block";
        }
    }
}
function prepareInternalnav(){
    var nav=document.getElementById("navigation");
    var links=nav.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        var sectionId=links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId))continue;
        document.getElementById(sectionId).style.display="none";
        links[i].destination=sectionId;
        links[i].onclick=function(){
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);