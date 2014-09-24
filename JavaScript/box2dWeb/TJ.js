/**
 * JS端事件中心
 * Author By TonyJiang
 */
var TJEvent = {

	/**
	 * 可调用的事件对象
	 * eventNameKey:{ 'eventName':eventNameValue , 'defaultHandler':handlerName }
	 */
//	eventList : {},
	//存放事件的堆栈
	
	
	/** 
	 * 自定义事件机制，在系统内部添加不依靠于底层的事件机制，
	 * 自定义事件机制使用统一的事件，可在AS和JS端分别派发事件，使系统代码清晰，结构简单
	 *
	 * eventStack: {
	 * 			eventNameValue:handlerArray[handler1,handler2....],
	 * 			...
	 *		} 
	 */
	eventStack : {},
	
	delayStack : {
		js : [],
		as : []
	},
	
	addEvent: function(event){
		!this.eventStack[event] && (this.eventStack[event] = new Array());
	},
	
	/**
	 *自定义事件类，包装系统的event类，在其之上利用自己的事件名称来定义事件
	 * 
	 * @param {String} eName 	用于保存事件名称，在自定义事件系统中使用
	 * @  data  					用于保存自定义事件系统中，事件所伴随的值
	 * @  sourceEvent  			用来保存系统事件对象，保证可以获取事件所需的必要参数 
	 * 
	 **/
	EventObject : function(eName){
		this.eventName = eName;
		this.data = {};
		this.data.extraInfo = {};
		this.sourceEvent = null;
	},
	
	
	eventInit:function(){
		for(var k in this.eventList){
			this.addEvent(this.eventList[k].eventName);
		}
	},
	
	addListenerBase: function(eventName, listener, times, prepend){
		if(this.eventStack[eventName]==='undefined' || !this.eventStack[eventName]){
			this.eventStack[eventName] = [];
		}
		var handlerObject = new Object();
		handlerObject.handler = listener;
		handlerObject.times = times;
		if(prepend){
			this.eventStack[eventName] && this.eventStack[eventName].unshift(handlerObject);
		} else {
			this.eventStack[eventName] && this.eventStack[eventName].push(handlerObject);
		}
	},
	
	addListener: function(eventName,listener){
		this.addListenerBase(eventName, listener, -1, false);
	},
	
	addListenerOnce : function(eventName,listener){
		this.addListenerBase(eventName, listener, 1, false);
	},
	
	/** 
	 * 提供给内部使用, 保证事件处理在第一个执行
	 * @param {Object} eventName
	 * @param {Object} listener
	 */
	addListenerPrepend: function(eventName,listener){
		this.addListenerBase(eventName, listener, -1, true);
	},
	
	addListenerPrependOnce: function(eventName,listener){
		this.addListenerBase(eventName, listener, 1, true);
	},
	
	removeListener:function(event , listener){
		if(FBSEvent.eventStack[event]==='undefined' || !FBSEvent.eventStack[event]){
			return;
		}
		for(var i in FBSEvent.eventStack[event]){
			if (FBSEvent.eventStack[event][i].handler == listener) {
				FBSEvent.eventStack[event].splice(i, 1);
				return;
			}
		}
	},
	
	dispatch: function(eventObject, fromAS){
		var flag = true;
		var eventName = eventObject.eventName;
		if(!this.eventStack[eventName]){
			this.eventStack[eventName] = [];
		}
		var eventStackLength = this.eventStack[eventName].length;
		for(var i = 0 ; i < eventStackLength; i++){
			var handlerObject = this.eventStack[eventName].shift();
			if(handlerObject.times != 1){
				this.eventStack[eventName].push(handlerObject);
			}
			if(flag){
				try{
					var result = handlerObject.handler(eventObject);
					if(result===false){
						flag = false;
					}
				} catch(e){
					//捕获监听处理出错
				}
			}
		}
		if(!fromAS && flag){//如果不是从AS端派发的事件，而且中途没有终止，则派发给AS端
			try{
//				Global.AS_Object.dispatch(eventObject , true);
				FBS.AS_Object.dispatch(eventObject , true);
			}catch(e){
				this.delayStack.as.push(eventObject);
			}
		}
		return true;
	}
};

//数据分享中心
var TJDataCenter = {
	
	_urldata : {},	
		
	_data : {},
	
	set : function(key , value){
		this._data[key] = value;
	},
	
	get : function(key){
		return this._data[key] ? this._data[key] : 0;
	},
	
	_once_geturldata : function(){
			var _tmp = window.location.href.split('?')[1];
			
			if(_tmp){
				_tmp = _tmp.split('&');
			}else{
				_tmp = [];
			}
			
			
			for(var i = 0 ; i < _tmp.length ; i++){
				var _t = _tmp[i].split('=');
				this._urldata[_t[0]] = _t[1];
			}
			delete this._once_geturldata;
	}
		
};

TJDataCenter._once_geturldata();

//用于AJAX回调函数的堆栈
var TJAjaxCallbackStack = {
		_stack : {},
		addCallback : function(func){
			var name = '_'+new Date().getTime();
			this._stack[name] = func;
			return name;
		},
		
		finishCallback : function(name , result){
			try{
				this._stack[name](result);
			}catch(nothing){}
			
			this._stack[name] = null;
		}
		
		
		
};

var TJDebugger = {
	errorStack : [],
	
	push : function(info){
		this.errorStack.push(info);
	},
	
	show : function(){
		for(var i = 0 ; i < this.errorStack.length ; i++){
			console.log(this.errorStack[i]);
		}
	}
	
};


var TJExtends = {
	
	baseExtends : function(){
		
		Number.prototype.pad = function(n) {
		  return Array(n>(''+this).length?(n-(''+this).length+1):0).join(0)+this;
		}
		
	}
	
};

TJExtends.baseExtends();

