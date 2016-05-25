/**
 * Created by Administrator on 2016/3/12.
 */
function addLoadEvent(func){
    var oldOnLoad=window.onload;
    if(typeof window.onload!="function"){
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
function  showPic(whichPic){
    // if(!document.getElementById("placeholder"))return true;
    var source=whichPic.getAttribute("href");
    //  if(!document.getElementById("description"))return false;
    var text=whichPic.getAttribute("title")?whichPic.getAttribute("title"):"";
    var description=document.getElementById("description");
    //  if(placeholder.nodeName!="IMG")return true;
    var placeholder=document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    if(description.firstChild.nodeType==3){
        description.firstChild.nodeValue=text;
    }
    return false;

}
function countBodyChildren(){
    var body_element=document.getElementsByTagName("body")[0];
    alert(body_element.childNodes.length);
}
function preparePic(){
    // if(!document.getElementById)return false;
    // if(!document.getElementsByName)return false;
    // if(!document.getElementById("Pictures"))return false;
    var pictures=document.getElementById("Pictures");
    var links=pictures.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onclick=function(){
            return showPic(this);
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
function preparePlaceholder(){
    var description=document.createElement("p");
    description.setAttribute("id","description");
    var placeHolder=document.createElement("img");
    placeHolder.setAttribute("id","placeholder");
    placeHolder.setAttribute("src","../sk/6.jpg");
    placeHolder.setAttribute("alt","sungkyu");
    var txt=document.createTextNode("Choose a picture");
    description.appendChild(txt);
    var pictures=document.getElementById("Pictures");
    insertAfter(placeHolder,pictures);
    insertAfter(description,placeHolder)
}

addLoadEvent(preparePlaceholder);
addLoadEvent(preparePic);
/*window.onload=function(){
    preparePlaceholder();
    preparePic();
}*/
