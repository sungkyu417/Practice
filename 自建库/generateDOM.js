/**
 * Created by Administrator on 2016/6/8.
 */
(
    function(){
        function encode(str){
            if(!str)return null;
            str=str.replace(/\\/g,'\\\\');
            str=str.replace(/';/g,"\\'");
            str=str.replace(/\s+^/mg,"\\n");
        }
        function checkForVariable(v){
            if(v.indexOf('$')==-1){
                v='\''+v+'\'';
            }else {
                v= v.substring(v.indexOf('$')+1);
                requiredVariables+='var'+v+';\n';
            }
        }
        var domCode='';
        var nodeNameCounters=[];
        var requiredVariables='';
        var newVariables='';
        function generate(strHTML,strRoot){
            var domRoot=document.createElement('div');
            domRoot.innerHTML=strHTML;
            domCode='';
            nodeNameCounters=[];
            requiredVariables='';
            newVariables='';
            var node=domRoot.firstChild;
            while (node){
                ADS.walkTheDOMRecursive(processNode,node,0,strRoot);
                node=node.nextSibling;
            }
            domCode='/*requiredVariables in this code\n'+requiredVariables+'*/\n\n'+
                    domCode+'\n\n'+'/* new objects in this code\n'+newVariables+'*/\n\n';
            return domCode;
        }
        function processAttribute(tabCount,refParent){
            if(this.nodeType!=ADS.node.ATTRIBUTE_NODE)return;
            var attrValue=(this.nodeValue?encode(this.nodeValue.trim()):'');
            if(this.nodeName=='cssText')alert('true');
            if(!attrValue)return;
            var tabs=(tabCount?'\t'.repeat(parseInt(tabCount)):'');
            switch (this.nodeName){
                case 'class':
                    domCode+=tabs+refParent+'.className='+checkForVariable(attrValue)+';\n';
                    break;
                case 'style':
                    var style=attrValue.split(/\s*;\s*/);
                    if(style){
                        for (pair in style){
                            if(!style[pair])continue;
                            var prop=style[pair].split(/\s*:\s*/);
                            if(!prop[1])continue;
                            prop[0]=ADS.camelize(prop[0]);
                            var propValue=checkForVariable(prop[1]);
                            if(prop[0]=='float'){
                                domCode+=tabs+refParent+'.style.cssFloat='+propValue+';\n';
                                domCode+=tabs+refParent+'.style.styleFloat='+propValue+';\n';

                            }else {
                                domCode+=tabs+refParent+'.style.'+prop[0]+'='+propValue+';\n';
                            }
                        }
                    }
                default:
                    if(this.nodeName.substring(0,2)=='on'){
                        domCode+=tabs+refParent+'.'+this.nodeName+'=function(){'+attrValue+'}\n';

                    }else {
                        domCode+=tabs+refParent+'.setAttrbute(\''+this.nodeName+'\','+checkForVariable(attrValue)+');\n';

                    }
                    break;
            }
        }
        function processNode(tabCount,refParent){
            var tabs=(tabCount?'\t'.repeat(parseInt(tabCount)):'');
            switch (this.nodeType){
                case ADS.node.ELEMENT_NODE:
                    if(nodeNameCounters[this.nodeName]){
                        ++nodeNameCounters[this.nodeName];
                    }else {
                        nodeNameCounters[this.nodeName]=1;
                    }
                    var ref=this.nodeName.toLowerCase()+nodeNameCounters[this.nodeName];
                    domCode+=tabs+'var '+ref+'=document.createElement(\''+this.nodeName+'\');\n';
                    newVariables+=''+ref+';\n';
                    if(this.attributes){
                        for(var i=0;i<this.attributes.length;i++){
                            ADS.walkTheDOMRecursive(processAttribute,this.attributes[i],tabCount,ref);
                        }
                    }
                    break;
                case ADS.node.TEXT_NODE:
                    var value=(this.nodeValue?encode(this.nodeValue.trim()):'');
                    if(value){
                        if(nodeNameCounters['txt']){
                            ++nodeNameCounters['txt'];
                        }else {
                            nodeNameCounters['txt']=1;
                        }
                        var ref='txt'+nodeNameCounters['txt'];
                        value=checkForVariable(value);
                        domCode+=tabs+'var'+ref+'=document.createTextNode('+value+');\n';
                        newVariables+=''+ref+';\n';

                    }else {
                        return;
                    }
                    break;
                default:
                    break;
            }
            if(refParent){
                domCode+=tabs+refParent+'.appendChild('+ref+');\n';

            }
            return ref;
        }
        window['generateDOM']=generate;
    }
)();