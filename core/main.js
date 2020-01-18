var sprite;
var currentDir = -1;

var currentFloot = 0;
var maxFloot = 0;
var speed = 4;

var battleState = false;

var testStr;

var N = 0;
var monsterData;
var flootData;
var flootLayer;

var mainScenes;
var leftScenes;
var leftLayer;
var monsterInfoLayer;
var skipLayer;
var npcLayer;

function create(){
	//资源初始化
	monsterResIni();
	keyResIni();
	colorDoorResIni();
	bottleResIni();
	spriteResIni();
	diamondResIni();
	toolResIni();
	npcResIni();
	npc_shop3_ini();
	
	maxFloot = currentFloot;
	
  	mainScenes = new Scene(1);
  	stage.addScenes(mainScenes);
  		
  	for(var k=0; k<flootData.length; k++){
  		flootLayer[k] = new Layer(0, 0, k);
  		
  		var layerBg = new Img(0, 0, res.get("bg"));
	  	flootLayer[k].addContent("bg", layerBg);
	  		
	  	//添加每一层的数据
	  	for(var i=0; i<flootData[k].length; i++){
	  		var item = flootData[k][i];
	  		
	  		for(var j=0; j<item.length; j++){
	  			//block
	  			if(item[j] == BLOCK){
	  				var block = new Img(j*BLOCK_W, i*BLOCK_H, res.get("block"));
	  				flootLayer[k].addContent(i+"_"+j, block);
	  			}
	  			
	  			//block2
	  			if(item[j] == BLOK2){
	  				var block2 = new Sprite(j*BLOCK_W, i*BLOCK_H, [res.get("block_0"), res.get("block_1")], 300);
	  				flootLayer[k].addContent(i+"_"+j, block2);
	  			}
	  			
	  			//怪物
	  			if(item[j] >= 100 && item[j] < 140){
	  				
	  				var monster = new Sprite(j*BLOCK_W, i*BLOCK_H, monsterRes[item[j]-100], 300);
	  				flootLayer[k].addContent(i+"_"+j, monster);
	  				var monster_data;
	  				
	  				if(item[j] == M20){
	  					monster_data = new m20();
	  				}else if(item[j] == M43){
	  					monster_data = new m43();
	  				}else if(item[j] == M49){
	  					monster_data = new m49();
	  				}else if(item[j] == M78){
	  					monster_data = new m78();
	  				}else if(item[j] == M32){
	  					monster_data = new m32();
	  				}else if(item[j] == M47){
	  					monster_data = new m47();
	  				}else if(item[j] == M1){
	  					monster_data = new m1();
	  				}else if(item[j] == M2){
	  					monster_data = new m2();
	  				}else if(item[j] == M43){
	  					monster_data = new m43();
	  				}else if(item[j] == M88){
	  					monster_data = new m88();
	  				}else if(item[j] == M34){
	  					monster_data = new m34();
	  				}
	  				else if(item[j] == M10){monster_data = new m10();}
					else if(item[j] == M11){monster_data = new m11();}
					else if(item[j] == M15){monster_data = new m15();}
					else if(item[j] == M21){monster_data = new m21();}
					else if(item[j] == M29){monster_data = new m29();}
					else if(item[j] == M31){monster_data = new m31();}
					else if(item[j] == M3 ){monster_data = new m3();}
					else if(item[j] == M41){monster_data = new m41();}
					else if(item[j] == M45){monster_data = new m45();}
					else if(item[j] == M46){monster_data = new m46();}
					else if(item[j] == M47){monster_data = new m47();}
					else if(item[j] == M50){monster_data = new m50();}
					else if(item[j] == M55){monster_data = new m55();}
					else if(item[j] == M56){monster_data = new m56();}
					else if(item[j] == M65){monster_data = new m65();}
					else if(item[j] == M67){monster_data = new m67();}
					else if(item[j] == M68){monster_data = new m68();}
					else if(item[j] == M73){monster_data = new m73();}
					else if(item[j] == M76){monster_data = new m76();}
					else if(item[j] == M77){monster_data = new m77();}
					else if(item[j] == M79){monster_data = new m79();}
					else if(item[j] == M88){monster_data = new m88();}
					else if(item[j] == M90){monster_data = new m90();}
					else if(item[j] == M91){monster_data = new m91();}
					else if(item[j] == M94){monster_data = new m94();}
					else if(item[j] == M95){monster_data = new m95();}
	  				else if(item[j] == M44){monster_data = new m44();}
	  				
	  				monsterData.put(k+"_"+i+"_"+j, monster_data);
	  			}
	  			
	  			//钥匙
	  			if(item[j] >= RKEY && item[j] <= OKEY){
	  				var key = new Img(j*BLOCK_W, i*BLOCK_H, keyRes[item[j]-60]);
	  				flootLayer[k].addContent(i+"_"+j, key);
	  			}
	  			
	  			//钻石
	  			if(item[j] >= RDIAM && item[j] <= BDIAM){
	  				var diamond = new Img(j*BLOCK_W, i*BLOCK_H, diamondRes[item[j]-70]);
	  				flootLayer[k].addContent(i+"_"+j, diamond);
	  			}
	  			
	  			//道具
	  			if(item[j] >= 1000 && item[j] < 1500){
	  				var tool = new Img(j*BLOCK_W, i*BLOCK_H, toolRes[item[j]-1000]);
	  				flootLayer[k].addContent(i+"_"+j, tool);
	  			}
	  			
	  			//npc
	  			if(item[j] >= 1500 && item[j] < 1600){
  					var npc = new Img(j*BLOCK_W, i*BLOCK_H, npcRes[item[j]-1500]);
  					flootLayer[k].addContent(i+"_"+j, npc);
	  			}
	  			
	  			
	  			//血瓶
	  			if(item[j] >= BOTT1 && item[j] <= BOTT2){
	  				var bottle = new Img(j*BLOCK_W, i*BLOCK_H, bottleRes[item[j]-65]);
	  				flootLayer[k].addContent(i+"_"+j, bottle);
	  			}
	  			
	  			//钥匙对应的门
	  			if(item[j] >= RDOOR && item[j] <= ODOOR){
	  				var colorDoor = new Sprite(j*BLOCK_W, i*BLOCK_H, colorDoorRes[item[j]-52], 300);
	  				colorDoor.start = 0;
	  				flootLayer[k].addContent(i+"_"+j, colorDoor);
	  			}
	  			
	  			
	  			//传送
	  			if(item[j] == DOOR1 || item[j] == DOOR2){
	  				var block = new Img(j*BLOCK_W, i*BLOCK_H, res.get("door"));
	  				flootLayer[k].addContent(i+"_"+j, block);
	  			}
	  		}
	  	}
	  	flootLayer[k].show = false;
	  	mainScenes.addLayers(flootLayer[k]);
  	}
  		
  	flootLayer[currentFloot].show = true;
  	//精灵
	sprite = new Sprite(5*BLOCK_W, 10*BLOCK_H, spriteRes[0], 200);
	flootLayer[currentFloot].addContent(10000, sprite);
	
	
	postionSprite(sprite);
	//移动stage使其位置合适
	stagePositon();
	
	
	mainScenes.sScale = scale;
	mainScenes.x = LEFT_WIDTH;
  	
  	mainScenes.show = true;
  	
  	//---------------------------------左侧面板-------------------------------
  	var sData = monsterData.get(10000);
  	
  	leftScenes = new Scene(2);
  	stage.addScenes(leftScenes);
  	
  	leftLayer = new Layer(0,0,100);
	leftScenes.addLayers(leftLayer);
	
	var s_scale = 0.6;
	
	var s_h = res.get("s_floot").height*s_scale + 10;
	var s_h_t = s_h - 20;
	
	//楼层
	var flootBg = new Img(25, 20, res.get("s_floot"));
	flootBg.p = s_scale;
	leftLayer.addContent("flootBg", flootBg);
	
	var floot = new Text(flootBg.x + res.get("s_floot").width*s_scale, flootBg.y + s_h_t, " " + (currentFloot+1));
  	floot.size = FONTA;
  	leftLayer.addContent("floot", floot);
	
	//英雄属性
  	var levelBg = new Img(flootBg.x, s_h + 20, res.get("s_level"));
	levelBg.p = s_scale;
	leftLayer.addContent("levelBg", levelBg);
	
  	var level = new Text(flootBg.x + res.get("s_level").width*s_scale, levelBg.y + s_h_t, " " + sData.level);
  	level.size = FONTA;
  	leftLayer.addContent("level", level);
  	
  	var attackBg = new Img(flootBg.x, 2*s_h + 20, res.get("s_attack"));
	attackBg.p = s_scale;
	leftLayer.addContent("attackBg", attackBg);
  	
  	var attack = new Text(flootBg.x + res.get("s_attack").width*s_scale, attackBg.y + s_h_t, " " + sData.attack);
  	attack.size = FONTA;
  	leftLayer.addContent("attack", attack);
  	
  	var defendBg = new Img(flootBg.x, 3*s_h + 20, res.get("s_defend"));
	defendBg.p = s_scale;
	leftLayer.addContent("defendBg", defendBg);
  	
  	var deffend = new Text(flootBg.x + res.get("s_defend").width*s_scale, defendBg.y + s_h_t, " " + sData.defend);
  	deffend.size = FONTA;
  	leftLayer.addContent("defend", deffend);
  	
  	
  	var bloodBg = new Img(flootBg.x, 4*s_h + 20, res.get("s_blood"));
	bloodBg.p = s_scale;
	leftLayer.addContent("bloodBg", bloodBg);
  	
  	var blood = new Text(flootBg.x + res.get("s_blood").width*s_scale, bloodBg.y + s_h_t, " " + sData.blood);
  	blood.size = FONTA;
  	leftLayer.addContent("blood", blood);
  	
  	
  	var goldBg = new Img(flootBg.x, 5*s_h + 20, res.get("s_gold"));
	goldBg.p = s_scale;
	leftLayer.addContent("goldBg", goldBg);
	
   	var gold = new Text(flootBg.x + res.get("s_gold").width*s_scale, goldBg.y + s_h_t, " " + sData.gold);
  	gold.size = FONTA;
  	leftLayer.addContent("gold", gold);
  	
  	
  	var expBg = new Img(flootBg.x, 6*s_h + 20, res.get("s_exp"));
	expBg.p = s_scale;
	leftLayer.addContent("expBg", expBg);
  	
   	var exp = new Text(flootBg.x + res.get("s_exp").width*s_scale, expBg.y + s_h_t, " " + sData.exp);
  	exp.size = FONTA;
  	leftLayer.addContent("exp", exp); 	
  	
  	
  	var rKeyBg = new Img(160, 20, res.get("rkey"));
	rKeyBg.p = s_scale;
	leftLayer.addContent("rKeyBg", rKeyBg);
  	
  	var rKey = new Text(rKeyBg.x + res.get("rkey").width*s_scale, rKeyBg.y + s_h_t, " " + sData.rKey);
  	rKey.size = FONTA;
  	leftLayer.addContent("rKey", rKey);
  	
  	
  	var bKeyBg = new Img(rKeyBg.x, s_h + 20, res.get("bkey"));
	bKeyBg.p = s_scale;
	leftLayer.addContent("bKeyBg", bKeyBg);
	
    var bKey = new Text(rKeyBg.x + res.get("rkey").width*s_scale, bKeyBg.y + s_h_t, " " + sData.bKey);
  	bKey.size = FONTA;
  	leftLayer.addContent("bKey", bKey);
  	
  	var oKeyBg = new Img(rKeyBg.x, 2*s_h + 20, res.get("okey"));
	oKeyBg.p = s_scale;
	leftLayer.addContent("oKeyBg", oKeyBg);
  	
  	var oKey = new Text(rKeyBg.x + res.get("rkey").width*s_scale, oKeyBg.y + s_h_t, " " + sData.oKey);
  	oKey.size = FONTA;
  	leftLayer.addContent("oKey", oKey);
  	
  	//查看楼层怪物数据
  	var monsterInfo = new Button(190, oKey.y + 50, res.get("monsterInfo_0"), res.get("monsterInfo_1"), flootMonsterInfo);
	leftLayer.addContent("monsterInfo", monsterInfo);
	monsterInfo.show = false;
	
	//跳楼层
  	var skip = new Button(190, monsterInfo.y + res.get("monsterInfo_0").height + 20, res.get("skip_0"), res.get("skip_1"), skipFloot);
	leftLayer.addContent("skip", skip);
	skip.show = false;
	
	//按钮 上
  	var uR = new Button(DIR_WIDTH, STAGEH - DIR_WIDTH*3, res.get("up1"), res.get("up2"), function(){
  		clickDown = true;
  		if(fixSpritePosition()){
  			currentDir = UP;
  		}else{
  			if(currentDir != UP){
  				clickDown = false;
  			}
  		}
  	});
  	leftLayer.addContent("up", uR);
  	
  	//按钮 下
  	var dR = new Button(uR.x, uR.y+DIR_WIDTH*2, res.get("down1"), res.get("down2"), function(){
  		clickDown = true;
  		if(fixSpritePosition()){
  			currentDir = DOWN;
  		}else{
  			if(currentDir != DOWN){
  				clickDown = false;
  			}
  		}
  	});
  	leftLayer.addContent("down", dR);
  			
  	//按钮 左
  	var bL = new Button(uR.x-DIR_WIDTH, uR.y+DIR_WIDTH, res.get("left1"), res.get("left2"), function(){
  		clickDown = true;
  		if(fixSpritePosition()){
  			currentDir = LEFT;
  		}else{
  			if(currentDir != LEFT){
  				clickDown = false;
  			}
  		}
  	});
  	leftLayer.addContent("left", bL);
  			
  	//按钮 右
  	var bR = new Button(uR.x+DIR_WIDTH, uR.y+DIR_WIDTH, res.get("right1"), res.get("right2"), function(){
  		clickDown = true;
  		if(fixSpritePosition()){
  			currentDir = RIGHT;
  		}else{
  			if(currentDir != RIGHT){
  				clickDown = false;
  			}
  		}
  	});
  	leftLayer.addContent("right", bR);
  	
  	var success = new Img((LEFT_ALL_WIDTH - res.get("savesucess").width)/2,(STAGEH - res.get("savesucess").height)/2, res.get("savesucess"));
	leftLayer.addContent("success", success);
  	success.show  = false;
  	
  	//菜单
  	var menu = new Button(uR.x, uR.y+DIR_WIDTH, res.get("menu_0"), res.get("menu_1"), function(){
  		save();
  		success.show  = true;
  		window.setTimeout(function(){
		  		success.show  = false;
		},1000);
  	});
	leftLayer.addContent("menu", menu);
  	
  	
  	
  	//怪物详情面板
  	monsterInfoLayer = new Layer((LEFT_ALL_WIDTH - res.get("monsterInfoBg").width)/2,0,101);
	leftScenes.addLayers(monsterInfoLayer);
	monsterInfoLayer.show = false;
	
	//跳楼层面板
	skipLayer = new Layer((LEFT_ALL_WIDTH - res.get("monsterInfoBg").width)/2,0,102);
	leftScenes.addLayers(skipLayer);
	skipLayer.show = false;
 
	//npc面板
	npcLayer = new Layer((LEFT_ALL_WIDTH - res.get("npcBg").width)/2,(STAGEH - res.get("npcBg").height)/2,103);
	leftScenes.addLayers(npcLayer);
	npcLayer.show = false;
	
  	leftScenes.sScale = leftScale;
  	leftScenes.show = true;
}

function stagePositon(){
	mainScenes.x = LEFT_WIDTH;
	mainScenes.y = 0;
	
	if(((sprite.x+BLOCK_W)*scale - SCREEN_WIDTH) > 0){
		mainScenes.x = mainScenes.x - ((sprite.x+BLOCK_W)*scale - SCREEN_WIDTH);
	}
	if(((sprite.y+BLOCK_H)*scale - SCREEN_HEIGHT) > 0){
		mainScenes.y = mainScenes.y - ((sprite.y+BLOCK_H)*scale - SCREEN_HEIGHT);
	}
}

//战斗面板
function openBattleLayer(row, col){
	/*主角数据*/
  	var sData = monsterData.get(10000);
	
  	/*怪物数据*/
  	var monsterType = flootData[currentFloot][row][col];
  	var mData = monsterData.get(currentFloot + "_" +row + "_" + col);
  	
  	if(mData.defend >= sData.attack){
  		//音效
		musicOk("3");
  		return;
  	}
  	
  	//战斗次数
  	var times = parseInt(mData.blood/(sData.attack - mData.defend));
  	
  	//怪物每次掉血    怪物生命÷（勇士攻击－怪物防御)
  	var mBlood = sData.attack - mData.defend;
  	
  	//勇士每次掉血   （怪物攻击－勇士防御）×怪物进攻
  	var sBlood = (mData.attack - sData.defend)*1;
  	
  	//勇士总共掉血
  	var allBlood = sBlood * times;
  	
  	if(allBlood > sData.blood){
  		//音效
		musicOk("3");
  		return;
  	}
  	
	if(battleState == true){
		return;
	}
	battleState = true;
	
	if(runPlace == 1){
		//战斗音乐
		// JA.battlePlay();
	}
	
	
	$("#battleP").css("display","block");
  	
  	$("#mName").html(mData.name);
  	$("#mImg").attr("src", monsterRes[monsterType-100][0].src);
  	$("#mBlood").html("血 量 " + mData.blood);
  	$("#mAttack").html("攻 击 " + mData.attack);
  	$("#mDeffend").html("防 御 " + mData.defend);
  	
  	$("#sName").html(sData.name);
  	$("#sImg").attr("src", spriteRes[0][0].src);
  	$("#sBlood").html("血 量 " + sData.blood);
  	$("#sAttack").html("攻 击 " + sData.attack);
  	$("#sDeffend").html("防 御 " + sData.defend);

  	
  	if(sBlood < 0){
  		sBlood = 0;
  	}
  	
  	var tempId = window.setInterval(function(){
  		
  		mData.blood = mData.blood - mBlood;
  		if(mData.blood < 0){
  			mData.blood = 0;
  		}
  		$("#mBlood").html("血 量 " + mData.blood);
  		
  		//主角胜利
  		if(mData.blood <= 0){
  			window.clearInterval(tempId);
  			
  			//移除怪物
  			flootLayer[currentFloot].remove(row + "_" + col);
  			flootData[currentFloot][row][col] = SPACE;
  			
  			//改变血量
  			leftLayer.get("blood").str = " " +sData.blood;
  			
  			//改变经验
  			sData.exp += mData.exp;
  			leftLayer.get("exp").str = " " +sData.exp;
  			
  			//改变金币
  			sData.gold += mData.gold;
  			leftLayer.get("gold").str = " " +sData.gold;
  			
  			//战斗结果
  			$("#success").css("display", "block");
		  	window.setTimeout(function(){
		  		$("#success").css("display", "none");
		  		$("#battleP").css("display", "none");
		  		
		  		battleState = false;//战斗状态
		  		
		  		if(runPlace == 1){
		  			//战斗音乐
		  			// JA.battleStop();
		  		}
		  		
		  	},1000);
  			return;
  		}
  		
  		sData.blood = sData.blood - sBlood;
  		$("#sBlood").html("血 量 " + sData.blood);
  		
  	},200);
  	
}

function gameFlush(){
	if(clickDown == false){
		fixSpritePosition();
		if(runPlace == 1){
			//音乐结束
			// JA.walkStop();
		}
		
		return;
	}
	if(!fixSpritePosition()){
		return;
	}
	
	if(currentDir != -1){
		if(runPlace == 1){
			//音乐开始
			// JA.walkPlay();
		}
	}

	
	if(currentDir == UP){
		up();
	}else if(currentDir == DOWN){
		down();
	}else if(currentDir == LEFT){
		left();
	}else if(currentDir == RIGHT){
		right();
	}
}

function fixSpritePosition(){
	//保证sprite在正确的位置
	if(sprite.x%BLOCK_W != 0){
		if(currentDir == LEFT){
			sprite.x = sprite.x - speed;
		}else if(currentDir == RIGHT){
			sprite.x = sprite.x + speed;
		}
		
		return false;
	}else if(sprite.y%BLOCK_H != 0){
		if(currentDir == UP){
			sprite.y = sprite.y - speed;
			stageY(speed);
		}else if(currentDir == DOWN){
			sprite.y = sprite.y + speed;
			stageY(-speed);
		}
		return false;
	}else{
		//currentDir = -1;
		return true;
	}
}
function battlePIni(){
	$("#battleP").css("left", (SCREEN_WIDTH-272)/2 + LEFT_WIDTH);
	$("#battleP").css("top", (SCREEN_HEIGHT-168)/2);
}

function menuIni(){
	
	$("#menu").css("width", $(window).width());
	$("#menu").css("height", $(window).height());
	
	var oldH = $("#menuBg").height();
	
	$("#menuBg").attr("height", $(window).height());
	var l = ($(window).width() - $("#menuBg").width())/2;
	$("#menuBg").css("left", l);
	
	
	var newH = $("#menuBg").height();
	
	var p = newH/oldH;
	
	$("#about").attr("height", $("#about").height()*p);
	$("#load").attr("height", $("#load").height()*p);
	$("#start").attr("height", $("#start").height()*p);
	
	var startTop = $(window).height() - $("#start").height() - 20;
	
	var startLeft = ($(window).width() - 3*$("#start").width())/4;
	$("#start").css("left", startLeft);
	$("#start").css("top", startTop);
	
	var loadLeft = startLeft*2 + $("#start").width();
	$("#load").css("left", loadLeft);
	$("#load").css("top", startTop);
	
	var aboutLeft = startLeft*3 + $("#start").width()*2;
	$("#about").css("left", aboutLeft);
	$("#about").css("top", startTop);
	
	$("#start").bind("mousedown", function(){
		$(this).attr("src", "images/m_start2.png");
	})
	$("#start").bind("mouseup", function(){
		$(this).attr("src", "images/m_start1.png");
	})
	
	$("#load").bind("mousedown", function(){
		$(this).attr("src", "images/m_load2.png");
	})
	$("#load").bind("mouseup", function(){
		$(this).attr("src", "images/m_load1.png");
	})
	
	$("#about").bind("mousedown", function(){
		$(this).attr("src", "images/m_about2.png");
	})
	$("#about").bind("mouseup", function(){
		$(this).attr("src", "images/m_about1.png");
	})
	
	var jinzhi = 1;
	$("#menu").live("touchmove",function(e){
		if(jinzhi == 1){
			e.preventDefault();
			e.stopPropagation();
		}
	},false);
	
}