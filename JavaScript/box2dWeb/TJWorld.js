//世界原型接口，定义世界的模型对象（基于BOX2d）
var TJWorldPrototype = function(){
	//模型制作对象
	this.box2dObject = {
		Vec2 : Box2D.Common.Math.b2Vec2,
    	AABB : Box2D.Collision.b2AABB,
 		World : Box2D.Dynamics.b2World,
 		BodyDef : Box2D.Dynamics.b2BodyDef,
 		Body : Box2D.Dynamics.b2Body,
 		FixtureDef : Box2D.Dynamics.b2FixtureDef,
 		Fixture : Box2D.Dynamics.b2Fixture,
 		MassData : Box2D.Collision.Shapes.b2MassData,
 		PolygonShape : Box2D.Collision.Shapes.b2PolygonShape,
 		CircleShape : Box2D.Collision.Shapes.b2CircleShape,
		
		DistanceJointDef : Box2D.Dynamics.Joints.b2DistanceJointDef,
    	MouseJointDef : Box2D.Dynamics.Joints.b2MouseJointDef,
		
 		DebugDraw : Box2D.Dynamics.b2DebugDraw,
		BuoyancyController : Box2D.Dynamics.Controllers.b2BuoyancyController
		
		
	};
	
	
	this.drawScale = 30;
	
	//模型对象命名规范
	this.object = {};
	
	//默认设置
	this._defaultSetting = {};
	//创建设置
	this._setting = {};
	
};

//舞台对象，一般一个应用只有一个舞台对象
var TJStage = function(stageSetting){
	
	var _this = this;
	
	this._defaultSetting = {
		refreshRate : 200,
		canvasObject : null
	};
	
	if(!stageSetting){
		stageSetting = {};
	}
	
	//设置配置信息
	for(var i in this._defaultSetting){
		this._setting[i] =  stageSetting[i] ?  stageSetting[i] : this._defaultSetting[i];
	}
	
	this._renderTimer = false;
	
	this.canvasContext = this._setting.canvasObject.getContext('2d');
	
	this.location = function(){
		return {
			height : this.canvasContext.height,
			width : this.canvasContext.width,
			x : this.canvasContext.offsetLeft,
			y : this.canvasContext.offsetTop
		};
	}
	
	this.worlds = [];
	
	this.init = function(){
		  //setup debug draw
     	this.debugDraw = new Box2D.Dynamics.b2DebugDraw();
		this.debugDraw.SetSprite(this._setting.canvasObject.getContext("2d"));
		this.debugDraw.SetDrawScale(this.drawScale);
		this.debugDraw.SetFillAlpha(0.5);
		this.debugDraw.SetLineThickness(1.0);
		this.debugDraw.SetFlags(this.box2dObject.DebugDraw.e_shapeBit | this.box2dObject.DebugDraw.e_jointBit);
	};
	
	this.addWorld = function(tjWorld){
		this.worlds.push(tjWorld);
		
		tjWorld.canvasContext = this.canvasContext;
		
		tjWorld.object.SetDebugDraw(this.debugDraw);
	};
	
	this._render = function(){
		for(var i =0 ; i < _this.worlds.length ; i++){
//			console.log(_this.frameRate);
			_this.worlds[i].object.Step(1 / _this._setting.refreshRate, 10, 10);
            _this.worlds[i].object.DrawDebugData();
			
			
			//如果有图片，则对图片进行重新渲染
			for(var b = _this.worlds[i].object.m_bodyList; b != null; b = b.m_next){
				//对所有物体进行渲染
				var e = new TJEvent.EventObject('refresh_box2d_object');
				e.data.object = b;
				TJEvent.dispatch(e);
			    
			}
			
			var e = new TJEvent.EventObject('refresh_extends');
			TJEvent.dispatch(e);
			
            _this.worlds[i].object.ClearForces();
		}
	};
	
	this.init();
	
	this._renderTimer = setInterval(this._render, 1000/this._setting.refreshRate);
};
TJStage.prototype = new TJWorldPrototype;

//世界对象，一般一个舞台中只有一个世界
var TJWorld = function(worldSetting){
	var _this = this;
	
	this.controller = {};
	
	//设置世界边框宽度
	this.sideWidth = 40;
	
	//配置信息
	this._defaultSetting = {
		
			width : 400,				//宽度
			height : 300,			//高度
			x : 10,						//定位X
			y : 10,						//定位Y
			gravity : 9.8,			//重力系数
			density : 0.5,			//密度系数
			friction : 0.5,			//摩擦系数
			restitution : 0.3,		//弹性系数
			doSleep : true			//空闲时间是否允许休眠
		
	};
	
	if(!worldSetting){
		worldSetting = {};
	}
	
	
	//设置配置信息
	for(var i in this._defaultSetting){
		this._setting[i] =  worldSetting[i] != undefined ?  worldSetting[i] : this._defaultSetting[i];
	}
	
	this.publicBodySetting = new this.box2dObject.BodyDef;
	this.publicPhsicalSetting = new this.box2dObject.FixtureDef;
	
	//密度
	 this.publicPhsicalSetting.density = this._setting.density;
	 //摩擦系数
     this.publicPhsicalSetting.friction = this._setting.friction;
	 //弹性
     this.publicPhsicalSetting.restitution = this._setting.restitution;
	 
	//鼠标指针，一个世界暂定只有一个
	this.mouseJoint = false;
	
	this.transformXY = function(x , y){
		return {
			x : this._setting.x + this.sideWidth + x,
			y : this._setting.y + this.sideWidth + y
		};
	}
	
	this.init = function(){
		
		//重力设置
		this.gravity = new this.box2dObject.Vec2(0 , this._setting.gravity);
		
		//创建世界边框
		this.object = new this.box2dObject.World(this.gravity , this._setting.doSleep);
		
		 //设置上边框大小
		 //设置上边框的位置,设置的点为模型中心，所以要在X基础上加上半个宽度
		this.addBox({
		 	width: this._setting.width + this.sideWidth*2,
		 	height: this.sideWidth,
		 	locationX:  this._setting.x+this._setting.width/2 + this.sideWidth,
		 	locationY:  this._setting.y + this.sideWidth/2,
		 	friction: this._setting.friction,
		 	density: this._setting.density,
			restitution : this._setting.restitution,
			type : this.box2dObject.Body.b2_staticBody
		 });
		 
		 //设置下边框位置,X位置同上
		 this.addBox({
		 	width: this._setting.width + this.sideWidth*2,
		 	height: this.sideWidth ,
		 	locationX:  this._setting.x+this._setting.width/2 + this.sideWidth,
		 	locationY:  this._setting.y + +this.sideWidth/2 + this._setting.height + this.sideWidth,
		 	friction: this._setting.friction,
		 	density: this._setting.density,
			restitution : this._setting.restitution,
			type : this.box2dObject.Body.b2_staticBody
		 });
		 
		 //设置左边框位置和大小
		this.addBox({
			width: this.sideWidth,
			height: this._setting.height + this.sideWidth*2,
			locationX:  this._setting.x  + this.sideWidth/2,
			locationY:  this._setting.y + this._setting.height/2 + this.sideWidth,
			friction: this._setting.friction,
			density: this._setting.density,
			restitution : this._setting.restitution,
			type : this.box2dObject.Body.b2_staticBody
		});
		
		 //设置右边框位置和大小
		this.addBox({
			width: this.sideWidth,
			height: this._setting.height + this.sideWidth*2,
			locationX:  this._setting.x + this.sideWidth/2 + this._setting.width + this.sideWidth,
			locationY:  this._setting.y + this._setting.height/2  + this.sideWidth,
			friction: this._setting.friction,
			density: this._setting.density,
			restitution : this._setting.restitution,
			type : this.box2dObject.Body.b2_staticBody
		});
		 
	};
	
	this.initListener = function(){
		var _this = this;
		
		var _isDown = false;
		
		TJEvent.addListener('refresh_box2d_object' , function(e){
//			console.log(e);
				//物体对象
				var object = e.data.object;
				
				//物体对象个性化信息
				var userData = object.GetUserData();
				
	            _this.canvasContext.save();
	            _this.canvasContext.translate(object.GetPosition().x*_this.drawScale,object.GetPosition().y*_this.drawScale);
//				console.log(object.GetFixtureList());
				
				//先显示提示框，再进行旋转
				if(userData.showTips){
//					console.log(object.GetPosition().x * 30 , object.GetPosition().y * 30);
					showTips( userData.width/2 ,  -userData.height/2 );
//					showTips(object.GetPosition().x  , object.GetPosition().y  );
				}
				
	            _this.canvasContext.rotate(object.GetAngle());
				
//				console.log(object.GetUserData());
				if(userData.image){
		            _this.canvasContext.drawImage(userData.image,- userData.image.width/2,- userData.image.height/2);
			    }
				
				
	            _this.canvasContext.restore();
			
		});
		
		TJEvent.addListener('world_mouse_down' , function(e){
			isDown = true;

			if(!_this.mouseJoint){

				var body = _this._getBodyByMouse( e.data.x / _this.drawScale , e.data.y / _this.drawScale );

				if(body){
					var mouseJointDef = new _this.box2dObject.MouseJointDef;
					mouseJointDef.bodyA = _this.object.GetGroundBody();
					mouseJointDef.bodyB = body;
					mouseJointDef.target.Set( e.data.x / _this.drawScale , e.data.y / _this.drawScale );
					mouseJointDef.collideConnected = true;
					mouseJointDef.maxForce = 10000.0 * body.GetMass();
					_this.mouseJoint = _this.object.CreateJoint(mouseJointDef);
					body.SetAwake(true);
				}
			}
			
		});
		
		TJEvent.addListener('world_mouse_move' , function(e){
			if(isDown && _this.mouseJoint){
				_this.mouseJoint.SetTarget(new _this.box2dObject.Vec2(e.data.x / _this.drawScale, e.data.y / _this.drawScale));
			}
		});
		
		TJEvent.addListener('world_mouse_up' , function(e){
			isDown = false;
			if(_this.mouseJoint){
				_this.object.DestroyJoint(_this.mouseJoint);
				_this.mouseJoint = false;
			}
		});
		
	};
	
	this.render = function(){
		
	};
	
	this._getBodyByMouse = function( x , y ){

		var mouseVec = new this.box2dObject.Vec2( x , y );
		TJDataCenter.set('current_mouse_location' , mouseVec);
		var aabb = new this.box2dObject.AABB();
		aabb.lowerBound.Set( x - 0.001 , y - 0.001 );
		aabb.upperBound.Set( x + 0.001 , y + 0.001 );

		this.object.QueryAABB(this._getBodyCallBack , aabb);
		var body =  TJDataCenter.get('current_mouse_body');

		TJDataCenter.set('current_mouse_body' , 0);
		return body;
	};
	
	this._getBodyCallBack = function(fixture){
		
		if(fixture.GetBody().GetType() != _this.box2dObject.Body.b2_staticBody) {

//			if(true){
	       if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), TJDataCenter.get('current_mouse_location'))) {

	   			TJDataCenter.set('current_mouse_location' , 0);
	          	TJDataCenter.set('current_mouse_body', fixture.GetBody());
	          return false;
	       }
	    }

	    return true;
	};
	
	this.addCircle = function( objectDefine ){
		
		var _define = TJWorldObject.getInstance(objectDefine);
		
		if(!_define){
			TJDebugger.push('create worldObject failed @ TJWorld.addCircle');
			return false;
		}
		console.log(_define);
		this.publicBodySetting.type = _define.type
	    this.publicBodySetting.position.x = _define.locationX / this.drawScale;
	    this.publicBodySetting.position.y = _define.locationY / this.drawScale;
		this.publicBodySetting.userData = {
			image : _define.image  
		};
		 
	 	this.publicPhsicalSetting.shape = new this.box2dObject.CircleShape(_define.r/this.drawScale);
		var _body = this.object.CreateBody(this.publicBodySetting);
	    _body.CreateFixture(this.publicPhsicalSetting);
		
		_body.SetLinearVelocity(new this.box2dObject.Vec2(_define.speedX , _define.speedY));  
		
		_body.SetAngle(_define.angle);  
    	_body.SetAngularDamping(2);  
		
		
		return _body;
		
	};
	
	this.addBox = function( objectDefine ){
		
		var _define = TJWorldObject.getInstance(objectDefine);
		
		if(!_define){
			TJDebugger.push('create worldObject failed @ TJWorld.addBox');
			return false;
		}
		
		//设置位置和图片
		this.publicBodySetting.type = _define.type;
	    this.publicBodySetting.position.x = _define.locationX / this.drawScale;
	    this.publicBodySetting.position.y = _define.locationY /  this.drawScale;
		this.publicBodySetting.userData = {
			image : _define.image , 
			width : _define.width , 
			height : _define.height,
			showTips : _define.showTips
		};
		
		//设置物理属性
		this.publicPhsicalSetting.density = _define.density;
		this.publicPhsicalSetting.friction = _define.friction;
		this.publicPhsicalSetting.restitution = _define.restitution;
		
		//设置形状
		this.publicPhsicalSetting.shape = new this.box2dObject.PolygonShape;
		this.publicPhsicalSetting.shape.SetAsBox( _define.width/2/this.drawScale , _define.height/2/this.drawScale );
		
		var _body = this.object.CreateBody(this.publicBodySetting);
		_body.CreateFixture(this.publicPhsicalSetting);
		
		_body.SetLinearVelocity(new this.box2dObject.Vec2(_define.speedX , _define.speedY));  
		
		_body.SetAngle(_define.angle);  
    	_body.SetAngularDamping(2);  
		
		return _body;
		
	};
	
	this.addVertices = function( objectDefine ){
		
		var _define = TJWorldObject.getInstance(objectDefine);
		
		if(!_define){
			TJDebugger.push('create worldObject failed @ TJWorld.addCircle');
			return false;
		}
		
		var verticeArray = [];
		if(_define.vertices.length < 3){
			TJDebugger.push('veritices.length < 3 @ TJWorld.addCircle');
			return false;
		}
		
		for(var i = 0 ; i < _define.vertices.length ; i++){
			verticeArray.push(new this.box2dObject.Vec2(_define.vertices[i][0] / this.drawScale , _define.vertices[i][1] / this.drawScale ));
		}
		
		this.publicBodySetting.type = _define.type;
	    this.publicBodySetting.position.x = _define.locationX / this.drawScale;
	    this.publicBodySetting.position.y = _define.locationY / this.drawScale;
		this.publicBodySetting.userData = {
			image : _define.image  
		};
		
		//设置物理属性
		this.publicPhsicalSetting.density = _define.density;
		this.publicPhsicalSetting.friction = _define.friction;
		this.publicPhsicalSetting.restitution = _define.restitution;
		
		this.publicPhsicalSetting.shape = new this.box2dObject.PolygonShape;
		this.publicPhsicalSetting.shape.SetAsArray(verticeArray , 0);
		
		var _body = this.object.CreateBody(this.publicBodySetting);
		_body.CreateFixture(this.publicPhsicalSetting);
		
		_body.SetLinearVelocity(new this.box2dObject.Vec2(_define.speedX , _define.speedY));  
		
		_body.SetAngle(_define.angle);  
    	_body.SetAngularDamping(2);  
		
		return _body;
		
	};
	
	this.addBuoyancyController = function(offset , density , linearDrag , angularDrag , key){
		
		//将sideWith考虑进去
//		arguments[0] += this.sideWidth + this._setting.y;

		

		
		var _controller = TJController.getBuoyancyController(this._setting.y + this.sideWidth + offset , density , linearDrag , angularDrag , key);
		this.object.AddController(_controller);
		
		this.controller[key] = _controller;
		
		TJEvent.addListener('refresh_extends',function(){
			
			
			
    	_this.canvasContext.strokeStyle ='blue';//线条颜色：绿色
		
//			_this.canvasContext.strokeRect(0,200,1200,300);

		_this.canvasContext.lineWidth = 0.1;
		_this.canvasContext.moveTo(_this._setting.x + _this.sideWidth , _this._setting.y + _this.sideWidth + offset );
	    _this.canvasContext.lineTo(_this._setting.x + _this.sideWidth + _this._setting.width , _this._setting.y + _this.sideWidth + offset);
		_this.canvasContext.stroke();//画线
		_this.canvasContext.fillStyle ='rgba(56,139,255,0.2)';//填充颜色：红色，半透明
		
		_this.canvasContext.fillRect( 
			_this._setting.x + _this.sideWidth ,
			_this._setting.y + _this.sideWidth + offset , 
			_this._setting.width , 
			_this._setting.height - offset
		);
			
		});
		
		
		return _controller;
		
	};
	
	this.addControlStack = function(key , body){
		this.controller[key].AddBody(body);
	}
	
	this.addDistanceJoint= function(body1 , body2){
		var distanceJointDef = new this.box2dObject.DistanceJointDef;
		distanceJointDef.Initialize( body1 , body2 , body1.GetWorldCenter() , body2.GetWorldCenter()  );
		this.object.CreateJoint(distanceJointDef);
	}
	
	this.init();
	this.initListener();
	
};
TJWorld.prototype = new TJWorldPrototype;

var TJController = function(){
	this.getBuoyancyController = function(offset , density , linearDrag , angularDrag){
		var _controller = new this.box2dObject.BuoyancyController;
		_controller.normal.Set(0 , -1);
		_controller.offset = -offset/30;
		_controller.density = density;
		_controller.linearDrag = linearDrag;
		_controller.angularDrag = angularDrag;
		return _controller;
	};
};
TJController.prototype = new TJWorldPrototype;

TJController = new TJController;


var TJWorldObject = function(){
	
	this.getInstance = function(baseAttribute){
		
		var pass = false;
		for(var i = 0 ; i < this.requiredAttr.length ; i++){
			var _p = true;
			for(var j = 0 ; j < this.requiredAttr[i].length ; j++){
				if(baseAttribute[this.requiredAttr[i][j]] == undefined){
					_p =false;
					break;
				}
			}
			pass = pass || _p;
		}
		
		if(!pass){
			TJDebugger.push('required attribute missed @ TJWorldObject.getInstance');
			return false;
		}
		
		var _obj = {};
		for(var i in this.totalAttr){
			
			_obj[this.totalAttr[i]] = baseAttribute[this.totalAttr[i]] != undefined ? baseAttribute[this.totalAttr[i]] : this[this.totalAttr[i]];
			
		}
		return _obj;
	}
	
};

//世界中对象的原型属性，包括创建位置、物体大小、图片、密度系数、摩擦系数、弹性系数、初速度
var TJWorldObjectPrototype = function(){
	
	/**  物理属性 */
	this.locationX = 0;
	this.locationY = 0;
	this.width = 0;
	this.height = 0;
	this.r = 0;
	this.vertices = [];
	this.image = null;
	this.density = 0.5;			//密度系数
	this.friction = 0.5;			//摩擦系数
	this.restitution = 0.3;		//弹性系数
	this.speedX = 0;
	this.speedY = 0;
	this.angle = 0;
	
	/** 应用属性 */
	this.showTips = false;
	
	
	this.type = this.box2dObject.Body.b2_dynamicBody;
	
	this.totalAttr = [
		'locationX' , 'locationY' , 'width' , 'height' , 'r' , 'vertices' , 'image' , 'density' , 'friction' , 'restitution' , 'speedX' , 'speedY' , 'type' , 'angle' , 
		'showTips'
	];
	
	this.requiredAttr = [
		['locationX' , 'locationY' , 'width' , 'height'], //矩形
		['locationX' , 'locationY' , 'r'],						//圆形
		['locationX' , 'locationY' , 'vertices']			//多边形
	];
	
}

TJWorldObjectPrototype.prototype =  new TJWorldPrototype;

TJWorldObject.prototype = new TJWorldObjectPrototype;

TJWorldObject = new TJWorldObject;