/**
 * Created By WanXing 15/7/9 上午11:56
 * Summary:
 */
define(
    [],
    function(){
        var DomUtil={
            //创建Dom
            create:function(tagName){
                return document.createElement(tagName);
            },
            //显示DOM
            show:function(dom,params){
                dom.style.display=params||"";
            },
            //隐藏DOM
            hide:function(dom){
                dom.style.display="none";
            },
            //查找某个父元素
            findParent:function(dom,selector){
                var parentNode=dom.parentNode;
                //如果已经到达body
                if(parentNode==document.body){
                    return false;
                }
                else{
                    var className=parentNode.className;
                    //找到对应的父元素
                    if(className && className.indexOf(selector)>-1){
                        return parentNode;
                    }
                    else{
                        return DomUtil.findParent(parentNode,selector);
                    }
                }
            },
            //放置DOM
            place:function(node,refNode,position){
                //参数必须都有
                if(!node || !refNode) return;
                //是否DOM对象
                if(!refNode.appendChild) return;
                //是否设置了放置的位置
                position=position||"last";
                //按place的位置放置
                if(position=="last"){
                    refNode.appendChild(node);
                }
                else if(position=="first"){
                    if(refNode.firstChild) refNode.insertBefore(node,refNode.firstChild);
                }
                else if(position=="before"){
                    if(refNode.parentNode) refNode.parentNode.insertBefore(node,refNode);
                }
                else if(position=="after"){
                    var parent=refNode.parentNode;
                    if(parent){
                        if(parent.lastChild==refNode){
                            parent.appendChild(node);
                        }
                        else{
                            parent.insertBefore(node,refNode.nextSibling);
                        }
                    }
                }
            },
            //销毁DOM
            destroy:function(node){
                if(!node) return;
                node.parentNode && node.parentNode.removeChild(node);
            }
        };

        return DomUtil;
    }
);