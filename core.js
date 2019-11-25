var ctx;
var WIDTH = 1200;
var HEIGHT = 1200;
var RATE = 1;
var lastTime = 0;
var framT = new TSprite("", -100, -200);

var stage = new Stage(0, 0,600, 800);
var tween = new Tween();

function Stage(x, y, w, h) {
	BaseObj.call(this);
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	this.scenes = new Array();
	this.addScene = function(scene) {
		scene.parent = this;
		this.scenes.push(scene);
	};
	this.render = function(){
		ctx.clearRect(-WIDTH/RATE/2, -HEIGHT/RATE/2, WIDTH/RATE, HEIGHT/RATE);
		//ctx.save();
		//ctx.scale(stage.scaleX, stage.scaleY);
		for(var i=0; i<this.scenes.length; i++){
			var scene = this.scenes[i];
			for(var j=0; j<scene.items.length; j++){
				var item = scene.items[j];
				ctx.save();
				//item.scale();
				item.alph();
				item.rotate();
				item.flip();
				item.render();
				ctx.restore();
			}
		}
		//ctx.restore();
	};
}
function Scene(x, y, w, h){
	BaseObj.call(this);
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.items = new Array();
	this.add = function(item) {
		item.parent = this;
		this.items.push(item);
	};
}

function BaseObj(x, y){
	this.depth = 1;
	this.parent = null;
	this.x = x;
	this.y = y;
	this.scaleX = 1;
	this.scaleY = 1;
	this.angle = 0;  
	this.flipX = 0;//0-180
	this.flipY = 0;
	this.alpha = 1;
	this.realAlpha = function(){
		if(this.parent != null){
			return this.alpha*this.parent.realAlpha();
		}else{
			return this.alpha;
		}
	}
	this.realX = function(){
		if(this.parent != null){
			return this.x*this.parent.realScaleX() + this.parent.realX();
		}else{
			return this.x;
		}
	};
	this.realY = function(){
		if(this.parent != null){
			return this.y*this.parent.realScaleY() + this.parent.realY();
		}else{
			return this.y;
		}
	}
	this.realScaleX = function(){
		if(this.parent != null){
			return this.scaleX*this.parent.realScaleX();
		}else{
			return this.scaleX;
		}
	}
	this.realScaleY = function(){
		if(this.parent != null){
			return this.scaleY*this.parent.realScaleY();
		}else{
			return this.scaleY;
		}
	}
	this.alph = function(){
		ctx.globalAlpha = this.realAlpha();
	};
	this.rotate = function(){
		if(this.angle != 0){
			ctx.translate(this.realX(), this.realY());
			ctx.rotate(this.angle*Math.PI/180);
			ctx.translate(-this.realX(), -this.realY());
		}
	};
	this.flip = function(){
		ctx.translate(this.realX(), this.realY());
		var flipX_ = this.flipX%361;
		var flipY_ = this.flipY%361;
		var fx = 0;
		var fy = 0;
		if(flipX_ <=180){
			fx = 1-flipX_/90;
		}else{
			fx = -(1- (flipX_-180)/90);
		}
		if(flipY_ <=180){
			fy = 1-flipY_/90;
		}else{
			fy = -(1- (flipY_-180)/90);
		}
		ctx.scale(fx, fy);
		ctx.translate(-this.realX(), -this.realY());
	};
	//this.scale = function(){
	//	ctx.scale(this.scaleX, this.scaleY);
	//}
	
	
}
function Layer(x, y, w, h){
	BaseObj.call(this);
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.items = new Array();
	this.add = function(item){
		item.parent = this;
		this.items.push(item);
	};
	this.render = function(){
		for(var i=0; i<this.items.length; i++){
			var item = this.items[i];
			ctx.save();
			//item.scale();
			item.alph();
			item.rotate();
			item.flip();
			item.render();
			ctx.restore();
		}
	};
}
function ISprite(img, x, y){
	BaseObj.call(this);
	this.x = x;
	this.y = y;
	this.img = img;
	this.getW = function(){
		return this.img.width*this.realScaleX();
	};
	this.getH = function(){
		return this.img.height*this.realScaleY();
	};
	this.render = function(){
		ctx.drawImage(img, this.realX()-this.getW()/2, this.realY()-this.getH()/2
					 , this.getW(), this.getH());
	};
}

function TSprite(str, x, y){
	BaseObj.call(this);
	this.x = x;
	this.y = y;
	this.str = str;
	this.size = 20;
	this.font = "Arial";
	this.color = "#ff0000";
	this.textAlign = "start";
	this.textBaseline = "top";
	this.getW = function(){
		ctx.font = this.size + "px " + this.font;
		return ctx.measureText(this.str).width*this.scaleX;
	};
	this.getH = function(){
		return this.size*this.scaleY;
	};
	this.render = function(){
		ctx.fillStyle = this.color;
		ctx.font = this.size + "px " + this.font;
		ctx.textAlign = this.textAlign;
		ctx.textBaseline = this.textBaseline;
		ctx.fillText(this.str, pX + this.x-this.getW()/2, pY + this.y-this.getH()/2);
	};
}

function initial(){
	var browserW = document.documentElement.clientWidth;
	var browserH = document.documentElement.clientHeight;
	if(browserH/browserW >= 1.5){
		RATE = browserW/stage.w;
		var rate = stage.w/stage.h;
		stage.w = browserW;
		stage.h = stage.w/rate;
		
	}else{
		RATE = browserH/stage.h;
		var rate = stage.w/stage.h;
		stage.h = browserH;
		stage.w = stage.h*rate;
	}
	stage.scaleX = RATE;
	stage.scaleY = RATE;
	
	var canvas = document.getElementById("canvas");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	
	canvas.style.left = (browserW-WIDTH)/2;
	canvas.style.top = (browserH-HEIGHT)/2;
	
	ctx = canvas.getContext("2d");
	ctx.translate(WIDTH/2, HEIGHT/2);

	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame || 
			  window.webkitRequestAnimationFrame || 
			  window.mozRequestAnimationFrame || 
			  window.oRequestAnimationFrame || 
			  window.msRequestAnimationFrame || 
			  function(callback){
				window.setTimeout(callback, 1000/1000);
			  };
	})();
	update();
}

function loadImages(sources,callback){   
	load(0, sources,  callback);
}

function load(index, sources,  callback){
	var img = new Image();
	img.src = sources[index];  
	img.onload = function(){
		images.push(img);
		if (index+1 < sources.length) {
			load(index+1, sources, callback);
		}else{
			callback();
		}
	}
}

function update(){
	
	//frameUpdate();
	tween.update();
	stage.render();
	ctx.strokeRect(-stage.w/2, -stage.h/2, stage.w, stage.h);
	requestAnimFrame(update);  
}

function frameUpdate(){
	if(lastTime == 0){
		lastTime = Date.now();
	}else{
		var now = Date.now();
		var f = 1000/(now-lastTime);
		
		f = f.toFixed(2);
		framT.str = f;
		lastTime = Date.now();
	}
}