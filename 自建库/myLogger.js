/**
 * Created by Administrator on 2016/6/8.
 */
function myLogger(id){
    id=id||'ADSLogWindow';
    var logWindow=null;
    var createWindow=function(){
        var browserWindowSize=ADS.getBrowserWindowSize();
        var top=((browserWindowSize.height-200)/2)||0;
        var left=((browserWindowSize.width-200)/2)||0;
        logWindow=document.createElement('ul');
        logWindow.setAttribute('id',id);

        logWindow.style.position='absolute';
        logWindow.style.top=top+'px';
        logWindow.style.left=left+'px';

        logWindow.style.width='200px';
        logWindow.style.height='200px';
        logWindow.style.overflow='scroll';

        logWindow.style.padding='0';
        logWindow.style.margin='0';
        logWindow.style.border='1px solid black';
        logWindow.style.backgroundColor='white';
        logWindow.style.listStyle='none';
        logWindow.style.font='10px/10px Verdana,Tahoma,Sans';

        document.body.appendChild(logWindow);

    };
    this.writeRaw=function(message){
        if(!logWindow)createWindow();
        var li=document.createElement('li');
        li.style.padding='2px';
        li.style.border='0';
        li.style.borderBottom='1px solid black';
        li.style.margin='0';
        li.style.color='#000';
        li.style.font='9px/9px Verdana,Tahoma,Sans';
        if(typeof message=='undefined'){
            li.appendChild(document.createTextNode('Message is undefined'));
        }else if(typeof li.innerHTML!='undefined'){
            li.innerHTML=message;
        }else {
            li.appendChild(document.createTextNode(message));
        }
        logWindow.appendChild(li);
        return true;
    };
}
myLogger.prototype={
    write:function(message){
        if(typeof message=='string'&&message.length==0){
            return this.writeRaw('ADS.log:null message');
        }
        if(typeof message!='string'){
            if(message.toString)return this.writeRaw(message.toString());
            else return this.writeRaw(typeof message);
        }
        message=message.replace(/</g,"&lt").replace(/>/g,"&gt");
        return this.writeRaw(message);
    },
    header:function(message){
        message='<span style="color: white;background-color: black;font-weight: bold;padding: 0px 5px">'+message+'</span>'
        return this.writeRaw(message);
    }

};
window['ADS']['log']=new myLogger();