//主窗体
var mainWindow;
var ctx;
function MainWindow(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.mouseIn = false;
	this.mouseInX = -100;
	this.mouseInY = -100;
	this.layerIds = new Array();//弹出面板 stack 位于最上层的面板可接收鼠标事件
	this.stackTop = -1;//栈顶默认为-1
	this.scenes = new Array();//场景数组
	this.upPanel = new Array();//最上层面板，用于系统提示文字
	this.floatPanel = new Layer(0, 0, CENTER, false, 20);//mouseover 弹出面板
	//添加场景
	this.addScenes = function(scene) {
		this.scenes.push(scene);
	};
	//添加漂浮文字
	this.addFlyText = function(tx, ty, str, size, color){
		var fly = new FlyText(tx, ty, FLYTEXT, str, size, color, true);
		this.upPanel.push(fly);
	};
	//添加弹出面板元素
	this.addFloat = function(c){
		this.floatPanel.addContent(c);
	}
	this.flush = function(){
		//清除画布
		ctx.clearRect(xPoint, yPoint, WIDTH, HEIGHT);
		
		//绘制各场景组件
		for(var i=0; i<this.scenes.length; i++){
			var scene = this.scenes[i];
			if(currentScene != scene.id){
				continue;
			}
			for(var j=0; j<scene.layers.length; j++){
				var layer = scene.layers[j];
				//销毁
				if(layer.show == false){
					scene.layers.splice(j, 1);
					continue;
				}
				//绘制场景中 各panel组件
				draw(layer.contents, layer.x, layer.y);
			}
		}
		//绘制系统提示文字
		draw(this.upPanel, 0, 0);
		
		//绘制 mouseOver panel
		if(this.floatPanel.show == true){
			draw(this.floatPanel.contents, this.floatPanel.x, this.floatPanel.y);
		}
		
	};
	this.clickDown = function(ex, ey){
		if(this.scenes.length > 0){
			for(var i=0; i<this.scenes.length; i++){
				var scene = this.scenes[i];
				if(currentScene != scene.id){
					continue;
				}
				for(var j=0; j<scene.layers.length; j++){
					var layer = scene.layers[j];
					if(layer.show == false){
						continue;
					}
					if(mainWindow.layerIds[mainWindow.layerIds.length-1] != layer.id){
						continue;
					}
					for(var k=0; k<layer.contents.length; k++){
						var c = layer.contents[k];
							var c = layer.contents[k];
							if(c.show == false){
							continue;
						}
						if(c.type == BUTTON){
							if(ex > c.x + layer.x && ex < c.x + layer.x + c.defaultImage.width && ey > c.y + layer.y && ey < c.y + layer.y + c.defaultImage.height){
								c.clickDown();
							}
						}
					}
				}
			}
		}
	};
	this.clickUp = function(ex, ey){
		if(this.scenes.length > 0){
			for(var i=0; i<this.scenes.length; i++){
				var scene = this.scenes[i];
				if(currentScene != scene.id){
					continue;
				}
				for(var j=0; j<scene.layers.length; j++){
					var layer = scene.layers[j];
					if(layer.show == false){
						continue;
					}
					if(mainWindow.layerIds[mainWindow.layerIds.length-1] != layer.id){
						continue;
					}
					for(var k=0; k<layer.contents.length; k++){
						var c = layer.contents[k];
							if(c.show == false){
							continue;
						}
						if(c.type == BUTTON){
							if(ex > c.x + layer.x && ex < c.x + layer.x + c.defaultImage.width && ey > c.y + layer.y && ey < c.y + layer.y + c.defaultImage.height){
								c.clickUp();
								return;
							}
						}
						if(c.type == FLASH){
							if(ex > c.x + layer.x && ex < c.x + layer.x + c.imageArray[0].width && ey > c.y + layer.y && ey < c.y + layer.y + c.imageArray[0].height){
								c.clickUp();
								return;
							}
						}
					}
				}
			}
		}
	};
	this.mouseMove = function(ex, ey){
		for(var i=0; i<this.scenes.length; i++){
			var scene = this.scenes[i];
			if(currentScene != scene.id){
				continue;
			}
			for(var j=0; j<scene.layers.length; j++){
				var layer = scene.layers[j];
				if(layer.show == false){
					continue;
				}
				if(mainWindow.layerIds[mainWindow.layerIds.length-1] != layer.id){
					continue;
				}
				for(var k=0; k<layer.contents.length; k++){
					var c = layer.contents[k];
					if(c.show == false){
						continue;
					}
					if(c.type == BUTTON){
						if(ex < c.x + layer.x || ex > c.x + layer.x + c.defaultImage.width || ey < c.y + layer.y || ey > c.y + layer.y + c.defaultImage.height){
							c.defaultImage = c.oldImage;
						}
					}
					if(c.type == IMAGE){
						if(c.func == null){
							continue;
						}
						if(ex > c.x + layer.x && ex < c.x + layer.x + c.image.width && ey > c.y + layer.y && ey < c.y + layer.y + c.image.height){
							if(this.mouseIn == false){
								//创建面板
								c.mouseOver();
								//修改坐标
								this.floatPanel.x = ex;
								this.floatPanel.y = ey;
								//展示
								this.floatPanel.show = true;
								//修改状态
								this.mouseIn = true;
								this.mouseInX = c.x;
								this.mouseInY = c.y;
							}else{
								//改变坐标
								this.floatPanel.x = ex;
								this.floatPanel.y = ey;
							}
						}else{
							if(this.mouseIn == true && this.mouseInX == c.x && this.mouseInY == c.y){
								//隐藏
								this.floatPanel.show = false;
								this.mouseIn = false;
								//清空
								this.floatPanel.contents.splice(0, this.floatPanel.contents.length);
							}
						}
					}
				}
			}
		}
	};
}
/**
 * 绘制组件
 * @param {Object} array
 */
function draw(array, x, y, scene){
	for(var k=0; k<array.length; k++){
		var c = array[k];
		if(c.show == false){
			continue;
		}
		//文本
		if(c.type == TEXT){
			ctx.font = c.size + "px Courier New";
			ctx.fillStyle = c.color + " 1)";
			ctx.fillText(c.str, c.x + x, c.y + y);
		
		//滚动文字
		}else if(c.type == FLYTEXT){
			if(c.lastTime < 0){
				c.transparent -= 0.01;
				c.y -= 1;
				if(c.transparent <= 0){
					ctx.fillStyle = "rgba(200, 0, 0, 0)";
					array.splice(k, 1);
	  			}
			}else{
				c.lastTime -= 1;
			}
			ctx.fillStyle = c.color  + c.transparent +  ")";
			ctx.font = c.size + "px Courier New";
			ctx.fillText(c.str, c.x + x, c.y + y);
		
		//图片
		}else if(c.type == IMAGE){
			ctx.drawImage(c.image, c.x + x, c.y + y, c.image.width*c.scaleW, c.image.height*c.scaleH);
		
		//按钮
		}else if(c.type == BUTTON){
			ctx.drawImage(c.defaultImage, c.x + x, c.y + y, c.defaultImage.width, c.defaultImage.height);
		
		//动画
		}else if(c.type == FLASH){
			ctx.drawImage(c.imageArray[c.index], c.x + x, c.y + y, c.imageArray[c.index].width*c.scale, c.imageArray[c.index].height*c.scale);
			c.gap -= 20;
			if(c.gap <=0){
				c.index = (c.index + 1)%c.imageArray.length;
				c.gap = c.oldGap;
			}
		}
	}
}
function Scene(x, y, w, h, id) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.layers = new Array();
	this.addLayers = function(layer) {
		this.layers.push(layer);
		//layer排序
		for(var i=0; i<this.layers.length-1; i++){
			for(var j=0; j<this.layers.length - i - 1; j++){
				if(this.layers[j].id > this.layers[j+1].id){
					var temp = this.layers[j];
					this.layers[j] = this.layers[j+1];
					this.layers[j+1] = temp;
				}
			}
		}
	};
	this.show = function(){
		currentScene = this.id;
		mainWindow.layerIds.splice(0, mainWindow.layerIds.length);
		mainWindow.layerIds.push(this.layers[0].id);
	};
	this.out = function(){
		for(var i=0; i<this.layers.length; i++){
			this.layers[i].fadeOut();
		}
	}
	
}

function Layer(w, h, align, show, id) {
	this.id = id;
	this.x = 0;
	this.y = 0;
	this.w = w;
	this.h = h;
	this.align = align;
	this.show = show;
	this.contents = new Array();
	this.fadeOut = function() {
		this.show = false;
		if(mainWindow.layerIds.length > 1){
			mainWindow.layerIds.pop();
		}
	};
	this.fadeIn = function() {
		if(this.align == CENTER){
			this.x = (WIDTH - this.w)/2
			this.y = (HEIGHT - this.h)/2;
		}
		
		mainWindow.layerIds.push(this.id);
		this.show = true;
	};
	this.addContent = function(c) {
		this.contents.push(c);
	};
	this.clear = function(n){
		this.contents.splice(n-1, this.contents.length - n + 1);
	}
}

//文本 type 1
function Text(x, y, type, str, size, color, show) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
	this.type = type;
	this.str = str;
	this.show = show;
} 
//图片 type 2 p 图片放缩倍数
function Image(x, y, type, image, func, show) {
	this.x = x;
	this.y = y;
	this.scaleW = 1;
	this.scaleH = 1;
	this.type = type;
	this.image = image;
	this.func = func;
	this.show = show;
	this.mouseOver = function(){
		this.func();
	};
}
//按钮type 3
function Button(x, y, type, defaultImage, clickImage, func, show) {
	this.x = x;
	this.y = y;
	this.type = type;
	this.defaultImage = defaultImage;
	this.oldImage = defaultImage;
	this.clickImage = clickImage;
	this.show = show;
	this.func = func;
	this.clickDown = function() {
		this.defaultImage = this.clickImage;
	};
	this.clickUp = function() {
		this.defaultImage = this.oldImage;
		this.func();
	};
}
//漂浮文字4
function FlyText(x, y, type, str, size, color, show) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
	this.type = type;
	this.str = str;
	this.show = show;
	this.lastTime = 30;
	this.transparent = 1;
}
//flash5
function Flash(x, y, type, imageArray, gap, func, show){
	this.x = x;
	this.y = y;
	this.show = show;
	this.index = 0;
	this.type = type;
	this.imageArray = imageArray;
	this.gap = gap;
	this.oldGap = gap;
	this.scale = 1;
	this.func = func;
	this.clickDown = function() {
		
	};
	this.clickUp = function() {
		this.func();
	};
}

function start(){
	ctx = document.getElementById("canvas").getContext("2d");
	mainWindow = new MainWindow(xPoint, yPoint, WIDTH, HEIGHT);
	$("#canvas").mousedown(function(e){
		clickDown = true;
		var ex = e.clientX-this.offsetLeft;
		var ey = e.clientY-this.offsetTop + $(document).scrollTop();
		mainWindow.clickDown(ex, ey);
	});
	$("#canvas").mouseup(function(e){
		clickDown = false;
		var ex = e.clientX-this.offsetLeft;
		var ey = e.clientY-this.offsetTop + $(document).scrollTop();
		mainWindow.clickUp(ex, ey);

	});
	
	$("#canvas").mousemove(function(e){
		var ex = e.clientX-this.offsetLeft;
		var ey = e.clientY-this.offsetTop + $(document).scrollTop();
		mainWindow.mouseMove(ex, ey);
	});
	
	$("#canvas").mouseout(function(e){
		clickDown = false;
	});
	//刷新频率
	window.setInterval("mainWindow.flush()", 20);
	//心跳
	//heartBeat();
}