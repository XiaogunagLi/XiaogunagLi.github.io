function Tween(){
	this.queue = new Array();
	this.tempQueue = new Array();
	this.add = function(item){
		this.tempQueue.push(item);
	};
	this.update = function(){
		//add
		if(this.tempQueue.length != 0){
			Array.prototype.push.apply(this.queue, this.tempQueue);
			this.tempQueue = [];
		}
		//update
		for(var i=0; i<this.queue.length; i++){
			if(this.queue[i].state){
				if(this.queue[i].check()){
					this.queue[i].update();
				}else{
					this.queue[i].state = false;
				}
			}
		}
		//remove
		var available = new Array();
		var remove = 0;
		for(var i=0; i<this.queue.length; i++){
			if(this.queue[i].state){
				available.push(this.queue[i]);
			}else{
				remove = 1;
			}
		}
		if(remove != 0){
			this.queue = [];
			Array.prototype.push.apply(this.queue, available);
		}
	};
}

function BaseTween(){
	this.state = 0;
	this.count = 0;
	this.state = true;
	this.flag1 = false;
	this.flag2 = false;
}

function SynQueue(){
	BaseTween.call(this);
	this.queue = new Array();
	this.check = function(){
		return this.queue.size != 0;
	};
	this.add = function(item){
		this.queue.push(item);
	};
	this.update = function(){
		this.state = false;
		for(var i=0; i<this.queue.length; i++){
			if(this.queue[i].state){
				this.state = true;
				this.queue[i].update();
				break;
			}
		}
	}
}

function BatchQueue(){
	BaseTween.call(this);
	this.queue = new Array();
	this.check = function(){
		return this.queue.size != 0;
	};
	this.add = function(item){
		this.queue.push(item);
	};
	this.update = function(){
		this.state = false;
		for(var i=0; i<this.queue.length; i++){
			if(this.queue[i].state){
				this.state = true;
				this.queue[i].update();
			}
		}
	}
}

function log(s){
	console.log(s);
}

function Move_un(obj, x, y, time, callback, args){
	BaseTween.call(this);
	this.obj = obj;
	this.finalX = 0;
	this.finalY = 0;
	this.check = function(){
		return x!=0||y!=0;
	};
	this.speedX = function(){
		if(this.finalX == 0){
			this.finalX = this.obj.x + x;
		}
		return x/(time*60/1000);
	};
	this.speedY = function(){
		if(this.finalY == 0){
			this.finalY = this.obj.y + y;
		}
		return y/(time*60/1000);
	};
	this.update = function(){
		if(Math.abs(this.speedX()) >= Math.abs(this.finalX - this.obj.x)){
			this.obj.x = this.finalX;
			this.flag1 = true;
		}else{
			this.obj.x += this.speedX();
		}
		if(Math.abs(this.speedY()) >= Math.abs(this.finalY - this.obj.y)){
			this.obj.y = this.finalY;
			this.flag2 = true;
		}else{
			this.obj.y += this.speedY();
		}
		
		if(this.flag1 == true && this.flag2 == true){
			this.state = false;
			if(callback != null){
				callback(args);
			}
		}
	}
}

function Move_ac(obj, x, y, time, callback, args){
	BaseTween.call(this);
	this.obj = obj;
	this.finalX = 0;
	this.finalY = 0;
	this.check = function(){
		return x!=0||y!=0;
	};	
	this.acX = function(){
		if(this.finalX == 0){
			this.finalX = this.obj.x + x;
		}
		return ac = 2*x/((time*60/1000)*(time*60/1000));
	};
	this.acY = function(){
		if(this.finalY == 0){
			this.finalY = this.obj.y + y;
		}
		return ac = 2*y/((time*60/1000)*(time*60/1000));
	};
	this.update = function(){
		this.count++;
		if(Math.abs(this.acX()*this.count) >= Math.abs(this.finalX - this.obj.x)){
			obj.x = this.finalX;
			this.flag1 = true;
		}else{
			this.obj.x += this.acX()*this.count;
		}
		if(Math.abs(this.acY()*this.count) >= Math.abs(this.finalY - this.obj.y)){
			this.obj.y = this.finalY;
			this.flag2 = true;
		}else{
			this.obj.y += this.acY()*this.count;
		}
		if(this.flag1 == true && this.flag2 == true){
			this.state = false;
			if(callback != null){
				callback(args);
			}
		}
	}
}

function Scale(obj, scaleX, scaleY, time, callback, args){
	BaseTween.call(this);
	this.obj = obj;
	this.gapX_ = 0;
	this.gapY_ = 0;
	this.finalScaleX = 1;
	this.finalScaleY = 1;
	this.check = function(){
		return scaleX!=0||scaleY!=0;
	};	
	this.gapX = function(){
		if(this.gapX_ == 0){
			this.gapX_ = scaleX/(time*60/1000);
			this.finalScaleX = this.obj.scaleX + scaleX;
		}
		return this.gapX_;
	};
	this.gapY = function(){
		if(this.gapY_ == 0){
			this.gapY_ = scaleY/(time*60/1000);
			this.finalScaleY = this.obj.scaleY + scaleY;
		}
		return this.gapY_;
	};
	this.update = function(){
		if(Math.abs(this.gapX()) >= Math.abs(this.obj.scaleX - this.finalScaleX)){
			this.obj.scaleX = this.finalScaleX;
			this.flag1 = true;
		}else{
			this.obj.scaleX += this.gapX();
		}
		
		if(Math.abs(this.gapY()) >= Math.abs(this.obj.scaleY - this.finalScaleY)){
			this.obj.scaleY = this.finalScaleY;
			this.flag2 = true;
		}else{
			this.obj.scaleY += this.gapY();
		}
		
		if(this.flag1 == true && this.flag2 == true){
			this.state = false;
			if(callback != null){
				callback(args);
			}
		}
	}
}

function Rotate(obj, angle, time, callback, args){
	BaseTween.call(this);
	this.obj = obj;
	this.finalAngle = 0;
	this.gap_ = 0;
	this.check = function(){
		return angle!=0;
	};
	this.gap = function(){
		if(this.gap_ == 0){
			this.gap_ = angle/(time*60/1000);
			this.finalAngle = this.obj.angle + angle;
		}
		return this.gap_;
	};
	this.update = function(){
		if(Math.abs(this.gap()) >= Math.abs(this.obj.angle - this.finalAngle)){
			this.obj.angle = this.finalAngle;
			this.state = false;
		}else{
			this.obj.angle += this.gap();
		}
		if(!this.state){
			if(callback != null){
				callback(args);
			}
		}
	};
}

function Flip(obj, x, y, time, callback, args){
	BaseTween.call(this);
	this.obj = obj;
	this.finalFlipX = 0;
	this.finalFlipY = 0;
	this.gapX_ = 0;
	this.gapY_ = 0;
	this.check = function(){
		return x!=0||y!=0;
	};
	this.gapX = function(){
		if(this.gapX_ == 0){
			this.gapX_ = x/(time*60/1000);
			this.finalFlipX = this.obj.flipX + x;
		}
		return this.gapX_;
	};
	this.gapY = function(){
		if(this.gapY_ == 0){
			this.gapY_ = y/(time*60/1000);
			this.finalFlipY = this.obj.flipY + y;
		}
		return this.gapY_;
	};
	this.update = function(){
		if(Math.abs(this.gapX()) >= Math.abs(this.obj.flipX - this.finalFlipX)){
			this.obj.flipX = this.finalFlipX;
			this.flag1 = true;
		}else{
			this.obj.flipX += this.gapX();
		}
		if(Math.abs(this.gapY()) >= Math.abs(this.obj.flipY - this.finalFlipY)){
			this.obj.flipY = this.finalFlipY;
			this.flag2 = true;
		}else{
			this.obj.flipY += this.gapY();
		}		
		
		if(this.flag1 == true && this.flag2 == true){
			this.state = false;
			if(callback != null){
				callback(args);
			}
		}
	};
}

function Fade(obj, alpha, time, callback, args){
	BaseTween.call(this);
	this.obj = obj;
	this.finalAlpha = 0;
	this.gap_ = 0;
	this.check = function(){
		if(alpha == 0){
			return false;
		}
		if(alpha > 0){
			return this.obj.alpha!=1;
		}else{
			return this.obj.alpha!=0;
		}
		
	};
	this.gap = function(){
		if(this.gap_ == 0){
			if(this.obj.alpha + alpha > 1){
				alpha = 1-this.obj.alpha;
			}
			if(this.obj.alpha + alpha < 0){
				alpha = 0-this.obj.alpha;
			}
			
			this.gap_ = alpha/(time*60/1000);
			this.finalAlpha = this.obj.alpha + alpha;
		}
		return this.gap_;
	};
	this.update = function(){
		if(Math.abs(this.gap()) >= Math.abs(this.obj.alpha - this.finalAlpha)){
			this.obj.alpha = this.finalAlpha;
			this.state = false;
		}else{
			this.obj.alpha += this.gap();
		}
		if(!this.state){
			if(callback != null){
				callback(args);
			}
		}
	};
}