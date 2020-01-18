//舞台
var runPlace = 2;// 1手机 2浏览器
var res = new Map();
var stage;
var clickDown = false;
var ctx;
function Stage() {
	this.x = 0;
	this.y = 0;
	this.scenes = new Array();//场景数组

	//添加场景
	this.addScenes = function(scene) {
		this.scenes.push(scene);
	};

	this.flush = function(){
		
		//刷新游戏逻辑
		gameFlush();
		
		//清除画布
		ctx.clearRect(0, 0, STAGEW, STAGEH);
		
		//绘制各场景组件
		for(var i=0; i<this.scenes.length; i++){
			var scene = this.scenes[i];
			if(scene.show == false){
				continue;
			}
			for(var j=0; j<scene.layers.length; j++){
				var layer = scene.layers[j];
				if(layer.show == false){
					continue;
				}
				//绘制场景中 各panel组件
				draw(layer.contents, layer.x + this.x, layer.y + this.y, scene);
			}
		}
		//绘制系统提示文字
		//draw(this.upPanel, 0, 0);
		
		//绘制 mouseOver panel
		//if(this.floatPanel.show == true){
		//	draw(this.floatPanel.contents, this.floatPanel.x, this.floatPanel.y);
		//}
		
	};
	this.clickDown = function(ex, ey){
		if(this.scenes.length > 0){
			for(var i=0; i<this.scenes.length; i++){
				var scene = this.scenes[i];
				
				for(var j=0; j<scene.layers.length; j++){
					var layer = scene.layers[j];
					if(layer.show == false){
						continue;
					}
					//if(mainWindow.layerIds[mainWindow.layerIds.length-1] != layer.id){
					//	continue;
					//}
					
					var objArray = layer.contents.getEntrys();
					for(var k=0; k<objArray.length; k++){
						var c = objArray[k].value;
						if(c.show == false){
						continue;
						}
						if(c.type == BUTTON){
							if(ex > (c.x + layer.x + scene.x)*scene.sScale && ex < (c.x + layer.x + scene.x)*scene.sScale + c.defaultImage.width*scene.sScale && ey > (c.y + layer.y + scene.y)*scene.sScale && ey < (c.y + layer.y + scene.y)*scene.sScale + c.defaultImage.height*scene.sScale){
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
				
				for(var j=0; j<scene.layers.length; j++){
					var layer = scene.layers[j];
					if(layer.show == false){
						continue;
					}
					//if(mainWindow.layerIds[mainWindow.layerIds.length-1] != layer.id){
					//	continue;
					//}
					
					var objArray = layer.contents.getEntrys();
					for(var k=0; k<objArray.length; k++){
						var c = objArray[k].value;
						if(c.show == false){
							continue;
						}
						if(c.type == BUTTON){
							if(ex > (c.x + layer.x + scene.x)*scene.sScale && ex < (c.x + layer.x + scene.x)*scene.sScale + c.defaultImage.width*scene.sScale && ey > (c.y + layer.y + scene.y)*scene.sScale && ey < (c.y + layer.y + scene.y)*scene.sScale + c.defaultImage.height*scene.sScale){
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
		if(this.scenes.length > 0){
			for(var i=0; i<this.scenes.length; i++){
				var scene = this.scenes[i];
				
				for(var j=0; j<scene.layers.length; j++){
					var layer = scene.layers[j];
					if(layer.show == false){
						continue;
					}
					//if(mainWindow.layerIds[mainWindow.layerIds.length-1] != layer.id){
					//	continue;
					//}
					
					var objArray = layer.contents.getEntrys();
					for(var k=0; k<objArray.length; k++){
						var c = objArray[k].value;
						if(c.show == false){
							continue;
						}
						if(c.type == BUTTON){
							if(c.press == false){
								continue;
							}
							if(ex < (c.x + layer.x + scene.x)*scene.sScale || ex > (c.x + layer.x + scene.x + c.defaultImage.width)*scene.sScale || ey < (c.y + layer.y + scene.y)*scene.sScale || ey > (c.y + layer.y + scene.y + c.defaultImage.height)*scene.sScale){
								c.clickUp();
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
function draw(map, x, y, scene){
	var array = map.getEntrys();
	for(var k=0; k<array.length; k++){
		var item = array[k].value;
		
		var c = item;
		if(c.show == false){
			continue;
		}
		//文本
		if(c.type == TEXT){
			ctx.font = c.size + "px Courier New";
			ctx.fillStyle = c.color + " 1)";
			ctx.fillText(c.str, scene.x + (c.x + x)*scene.sScale, scene.y + (c.y + y)*scene.sScale);
		
		//图片
		}else if(c.type == IMAGE){
			ctx.drawImage(c.image, scene.x + (c.x + x)*scene.sScale, scene.y + (c.y + y)*scene.sScale, c.image.width*c.p*scene.sScale, c.image.height*c.p*scene.sScale);
		
		//按钮
		}else if(c.type == BUTTON){
			ctx.drawImage(c.defaultImage, scene.x + (c.x + x)*scene.sScale, scene.y + (c.y + y)*scene.sScale, c.defaultImage.width*scene.sScale, c.defaultImage.height*scene.sScale);
		
		//动画
		}else if(c.type == SPRITE){
			ctx.drawImage(c.imageArray[c.index], scene.x + (c.x + x)*scene.sScale, scene.y + (c.y + y)*scene.sScale, c.imageArray[c.index].width*c.scale*scene.sScale, c.imageArray[c.index].height*c.scale*scene.sScale);
			if(c.start == 0){
				continue;
			}
			c.gap -= 20;
			if(c.gap <=0){
				//c.func();
				c.index = (c.index + 1)%c.imageArray.length;
				c.gap = c.oldGap;
			}
		}
	}
}
function Scene(id) {
	this.id = id;
	this.show = false;
	this.sScale = 1;
	this.x = 0;
	this.y = 0;
	
	this.layers = new Array();
	
	this.addLayers = function(layer) {
		this.layers.push(layer);
		//layer排序  根据id做升序排列 id小的显示在下层 id大的显示在最上层
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
}

function Layer(x, y, id) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.show = true;
	this.contents = new Map();
	this.fadeOut = function() {
		this.show = false;
	};
	this.fadeIn = function() {
		this.show = true;
	};
	this.addContent = function(key, value) {
		this.contents.put(key, value);
	};
	this.get = function(key) {
		return this.contents.get(key);
	};
	this.remove = function(key) {
		this.contents.remove(key);
	};
	this.clear = function(){
		this.contents.clear();
	}
}

//文本 type 1
function Text(x, y, str) {
	this.x = x;
	this.y = y;
	this.size = 10;
	this.color = BLACK;
	this.type = TEXT;
	this.str = str;
	this.show = true;
} 
//图片 type 2 p 图片放缩倍数
function Img(x, y, image) {
	this.x = x;
	this.y = y;
	this.p = 1;
	this.w = image.width;
	this.h = image.height;
	this.type = IMAGE;
	this.image = image;
	this.show = true;
}
//按钮type 3
function Button(x, y, defaultImage, clickImage, func) {
	this.data = 0;
	this.x = x;
	this.y = y;
	this.type = BUTTON;
	this.press = false;
	this.defaultImage = defaultImage;
	this.oldImage = defaultImage;
	this.clickImage = clickImage;
	this.show = true;
	this.func = func;
	this.clickDown = function() {
		this.defaultImage = this.clickImage;
		this.press = true;
		this.func();

	};
	this.clickUp = function() {
		this.defaultImage = this.oldImage;
		this.press = false;
	};
}

/**
 * 
 * @param {Object} x
 * @param {Object} y
 * @param {Object} imageArray 精灵图片数组
 * @param {Object} gap 每一帧间隔时间 ms
 * @memberOf {TypeName} 
 */
function Sprite(x, y,imageArray, gap){
	this.x = x;//游戏世界碰撞检测
	this.y = y;
	this.show = true;
	this.index = 0;	//默认显示第一张
	this.type = SPRITE;
	this.imageArray = imageArray;
	this.gap = gap;
	this.oldGap = gap;
	this.scale = 1; //放缩
	this.start = 1;
	this.func = function(){
		
	};
}

var loadTool = { 
	loaded:false, 
	allCount:0,
	loadCount:0,
	load:function(key, url){
		
		this.allCount++;
		var img = new Image();
	    img.src = url;
	    res.put(key, img);
	    
	    img.onload = function(){
	           loadTool.loadCount++;
	           if(loadTool.loadCount == loadTool.allCount){
	        	   loadTool.loaded = true;
	           }
	    };
		return img;
	}
}

function Map(){  
    this._entrys = new Array();  
      
    this.put = function(key, value){  
        if (key == null || key == undefined) {  
            return;  
        }  
        var index = this._getIndex(key);  
        if (index == -1) {  
            var entry = new Object();  
            entry.key = key;  
            entry.value = value;  
            this._entrys[this._entrys.length] = entry;  
        }else{  
            this._entrys[index].value = value;  
        }          
    };  
    this.get = function(key){  
        var index = this._getIndex(key);  
        return (index != -1) ? this._entrys[index].value : null;  
    };  
    this.remove = function(key){  
        var index = this._getIndex(key);  
        if (index != -1) {  
            this._entrys.splice(index, 1);  
        }  
    };  
    this.clear = function(){  
        this._entrys.length = 0;;  
    };  
    this.contains = function(key){  
        var index = this._getIndex(key);  
        return (index != -1) ? true : false;  
    };  
    this.getCount = function(){  
        return this._entrys.length;  
    };  
    this.getEntrys =  function(){  
        return this._entrys;  
    };  
   this._getIndex = function(key){  
        if (key == null || key == undefined) {  
            return -1;  
        }  
        var _length = this._entrys.length;  
        for (var i = 0; i < _length; i++) {  
            var entry = this._entrys[i];  
            if (entry == null || entry == undefined) {  
                continue;  
            }  
            if (entry.key === key) {//equal  
                return i;  
            }  
        }  
        return -1;  
    };  
}


function start(){
	//加载资源
	loadRes();
	
	ctx = document.getElementById("canvas").getContext("2d");
	stage = new Stage();
	
	if(runPlace == 1){
		//touch事件
		$("#canvas").bind("touchstart", function(e){
			var _touch = e.originalEvent.targetTouches[0]; 
		    var ex = _touch.pageX - this.offsetLeft;
		    var ey = _touch.pageY - this.offsetTop + $(document).scrollTop();
			stage.clickDown(ex, ey);
		});
		$("#canvas").bind("touchend", function(e){
			clickDown = false;
			var _touch =  e.originalEvent.changedTouches[0]; 
		    var ex = _touch.pageX - this.offsetLeft;
		    var ey = _touch.pageY - this.offsetTop + $(document).scrollTop();
			stage.clickUp(ex, ey);
		});
		
		$("#canvas").bind("touchmove", function(e){
			var _touch =  e.originalEvent.changedTouches[0]; 
		    var ex = _touch.pageX - this.offsetLeft;
		    var ey = _touch.pageY - this.offsetTop + $(document).scrollTop();
			stage.mouseMove(ex, ey);
		});
	}else{
		//点击事件
		$("#canvas").bind("mousedown", function(e){
			var ex = e.clientX-this.offsetLeft;
			var ey = e.clientY-this.offsetTop + $(document).scrollTop();
			stage.clickDown(ex, ey);
		});
		$("#canvas").bind("mouseup", function(e){
			clickDown = false;
			var ex = e.clientX-this.offsetLeft;
			var ey = e.clientY-this.offsetTop + $(document).scrollTop();
			stage.clickUp(ex, ey);
	
		});
		
		$("#canvas").bind("mousemove", function(e){
			var ex = e.clientX-this.offsetLeft;
			var ey = e.clientY-this.offsetTop + $(document).scrollTop();
			stage.mouseMove(ex, ey);
			//leftLayer.get("test").str = e.clientX;
		});
		
	}
	

	//检查资源是否加载完毕
	var id_ = window.setInterval(function(){
		if(loadTool.loaded == true){
			window.clearInterval(id_);
			
			//创建游戏
			create();
			
			//刷新频率
			window.setInterval("stage.flush()", 1000/60);
		}
	},10);
}