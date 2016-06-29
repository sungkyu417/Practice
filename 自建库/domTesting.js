/**
 * Created by Administrator on 2016/6/8.
 */
ADS.addEvent(window,'load',function(){
    ADS.log.header('testNode');
    ADS.log.write('nodeName is:'+document.getElementById('firefox').nodeName);
    ADS.log.write('nodeValue is:'+document.getElementById('firefox').nodeValue);
    ADS.log.write('nodeType is:'+document.getElementById('firefox').nodeType);
    ADS.log.header('Attribute');
    var anchor=document.getElementById('firefox');
    for(var i=0;i<anchor.attributes.length;i++){
        ADS.log.write(
            anchor.attributes.item(i).nodeName+'='+anchor.attributes.item(i).nodeValue
        );
    }
});
