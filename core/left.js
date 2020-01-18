var runState = false;
var doorFlashFinishend = true;
var nextDir;

function stageX(len){
//	if(len > 0){
//		if(mainScenes.x + speed <= 0){
//			mainScenes.x += speed;
//		}
//	}else{
//		if((REALY_STAGE_WIDTH + mainScenes.x*scale + len) >= SCREEN_WIDTH){
//			mainScenes.x += len;
//		}
//	}
}

function stageY(len){
	if(len > 0){
		if(sprite.y >= STAGEH*2/3){
			return;
		}
		if(mainScenes.y + speed*mainScenes.sScale <= 0){
			mainScenes.y += speed*mainScenes.sScale;
		}
	}else{
		if(sprite.y <= STAGEH/3){
			return;
		}
		if(STAGEH*mainScenes.sScale + mainScenes.y + len*mainScenes.sScale >= SCREEN_HEIGHT){
			mainScenes.y += len*mainScenes.sScale;
		}
	}
}


function left(){
	sprite.imageArray = spriteRes[currentDir];
	
	//到达左边界
	var nextP = sprite.x - speed;
	if(nextP < 0){
		return;
	}
	
	//左侧有障碍
	if(sprite.x % BLOCK_W == 0){
		var col = (sprite.x - BLOCK_W)/BLOCK_W;
		var row = sprite.y/BLOCK_H;
		
		if(check(row,col) == 0){
			return;
		}
	}
	sprite.x = sprite.x - speed;
	//场景移动
	stageX(speed);
}

function right(){
	sprite.imageArray = spriteRes[currentDir];
	
	//达到右边界
	if(sprite.x + BLOCK_W + speed > STAGEW){
		return;
	}
	
	//右侧侧有障碍
	if(sprite.x % BLOCK_W == 0){
		var col = (sprite.x + BLOCK_W)/BLOCK_W;
		var row = sprite.y/BLOCK_H;
		
		if(check(row,col) == 0){
			return;
		}
	}
	sprite.x = sprite.x + speed;
	//场景移动
	stageX(-speed);
}

function up(){
	sprite.imageArray = spriteRes[currentDir];
	
	//上侧到边界
	if(sprite.y - speed < 0){
		return;
	}
	
	//上侧侧有障碍
	if(sprite.y % BLOCK_H == 0){
		var col = sprite.x/BLOCK_W;
		var row = (sprite.y - BLOCK_H)/BLOCK_H;
		
		if(check(row,col) == 0){
			return;
		}
	}
	sprite.y = sprite.y - speed;
	
	//移动场景
	stageY(speed);
}

function down(){
	sprite.imageArray = spriteRes[currentDir];
	
	//下侧到边界
	if(sprite.y + BLOCK_H + speed > STAGEH){
		return;
	}
	
	//下侧侧有障碍
	if(sprite.y % BLOCK_H == 0){
		var col = sprite.x/BLOCK_W;
		var row = (sprite.y + BLOCK_H)/BLOCK_H;
		
		if(check(row,col) == 0){
			return;
		}
	}
	sprite.y = sprite.y + speed;
	
	//移动场景
	stageY(-speed);
}

function check(row, col){
	//block
	if(flootData[currentFloot][row][col] == BLOCK){
		return 0;
	}
	
	//block2
	if(flootData[currentFloot][row][col] == BLOK2){
		return 0;
	}
	
	//怪物
	if(flootData[currentFloot][row][col] >= 100 && flootData[currentFloot][row][col] <= 140){
		if(battleState == false){
			openBattleLayer(row, col);
		}
		return 0;
	}
	
	//钥匙
	if(flootData[currentFloot][row][col] >= RKEY && flootData[currentFloot][row][col] <= OKEY){
		var sData = monsterData.get(10000);
		if(flootData[currentFloot][row][col] == RKEY){
			sData.rKey = sData.rKey + 1;
			leftLayer.get("rKey").str = " " +sData.rKey;
		}else if(flootData[currentFloot][row][col] == BKEY){
			sData.bKey = sData.bKey + 1;
			leftLayer.get("bKey").str = " " +sData.bKey;
		}else if(flootData[currentFloot][row][col] == OKEY){
			sData.oKey = sData.oKey + 1;
			leftLayer.get("oKey").str = " " +sData.oKey;
		}
		
		//音效
		musicOk("2");
		
		//清除
		flootLayer[currentFloot].remove(row+"_"+col);
		flootData[currentFloot][row][col] = SPACE;
	}
	
	//血瓶
	if(flootData[currentFloot][row][col] >= BOTT1 && flootData[currentFloot][row][col] <= BOTT2){
		var sData = monsterData.get(10000);
		if(flootData[currentFloot][row][col] == BOTT1){
			sData.blood = sData.blood + 250;
		}else if(flootData[currentFloot][row][col] == BOTT2){
			sData.blood = sData.blood + 500;
		}
		leftLayer.get("blood").str = " " +sData.blood;
		
		//音效
		musicOk("2");
		//清除
		flootLayer[currentFloot].remove(row+"_"+col);
		flootData[currentFloot][row][col] = SPACE;
	}
	
	//道具
	if(flootData[currentFloot][row][col] >= 1000 && flootData[currentFloot][row][col] < 1500){
		var sData = monsterData.get(10000);
		if(flootData[currentFloot][row][col] == GWXX){//查看怪物信息
			var gwxx = leftLayer.get("monsterInfo");
			gwxx.show = true;
			sData.gwxx = 1;
			npcPanel_str("恭喜你,点击怪物宝典#可以查看怪物信息了！", row, col);
		}
		if(flootData[currentFloot][row][col] == SDOOR){//特殊门
			return 0;
		}
		
		if(flootData[currentFloot][row][col] == JIAN){//剑
			sData.attack = sData.attack + 10;
			leftLayer.get("attack").str = " " +sData.attack;
		}
				
		if(flootData[currentFloot][row][col] == DUN){//盾
			sData.defend = sData.defend + 10;
			leftLayer.get("defend").str = " " +sData.defend;
		}
		
		if(flootData[currentFloot][row][col] == XFY){//小飞羽
			sData.level = sData.level + 1;
			leftLayer.get("level").str = " " +sData.level;
		}
		
		if(flootData[currentFloot][row][col] == SZJ){//十字架
			sData.szj = 1;
			npcPanel_str("快把十字架交给1楼的仙子，你的#所有属性将会翻倍!", row, col);
		}
		
		if(flootData[currentFloot][row][col] == FP){//飞盘
			var skip = leftLayer.get("skip");
			skip.show = true;
			sData.skip = 1;
			
			npcPanel_str("恭喜你，点击飞靴可以穿越楼层了！", row, col);
		}
		
		if(flootData[currentFloot][row][col] == JIAN9){//9楼剑
			sData.attack = sData.attack + 20;
			leftLayer.get("attack").str = " " +sData.attack;
		}
		
		if(flootData[currentFloot][row][col] == AX){//12斧子
			sData.ax = 1;
			npcPanel_str("快把斧子交给4楼的小偷，他将#会帮你打开2楼的门！", row, col);
		}
		
		if(flootData[currentFloot][row][col] == SS){//14圣水
			sData.blood = sData.blood * 2;
			leftLayer.get("blood").str = " " +sData.blood;
			npcPanel_str("恭喜你，血量翻倍!", row, col);
		}
		
		if(flootData[currentFloot][row][col] == JIAN19){//19剑
			sData.attack = sData.attack + 20;
			leftLayer.get("attack").str = " " +sData.attack;
		}
		
		//音效
		musicOk("2");
		
		//清除
		flootLayer[currentFloot].remove(row+"_"+col);
		flootData[currentFloot][row][col] = SPACE;
	}
	
	//npc
	if(flootData[currentFloot][row][col] >= 1500 && flootData[currentFloot][row][col] <= 1600 || flootData[currentFloot][row][col] < 0){
		var sData = monsterData.get(10000);
		
		if(flootData[currentFloot][row][col] == SHOP3 || flootData[currentFloot][row][col] == -1000){
			npcPanel(npc_shop3_type, npc_shop3_imgs, row, col);
			return 0;
		}
		
		if(flootData[currentFloot][row][col] == THIEF){
			if(sData.ax == 0){
				npcPanel_str("把12楼的斧子带给我，我将帮你#打开2楼的门!", row, col);
			}else{
				npcPanel_str("2楼的门已经帮你打开了!", row, col);
				flootLayer[1].remove(6+"_"+1);
				flootData[1][6][1] = SPACE;
				
				//清除
				flootLayer[currentFloot].remove(row+"_"+col);
				flootData[currentFloot][row][col] = SPACE;
			}
			
			return 0;
		}
		
		if(flootData[currentFloot][row][col] == KEY5){
			npcPanel(key_sell_5_type, key_sell_5_imgs, row, col);
			return 0;
		}
		
		if(flootData[currentFloot][row][col] == EXP5){
			npcPanel(exp_sell_5_type, exp_sell_5_imgs, row, col);
			return 0;
		}
		
		if(flootData[currentFloot][row][col] == SHO11 || flootData[currentFloot][row][col] == -2000){
			npcPanel(npc_shop11_type, npc_shop11_imgs, row, col);
			return 0;
		}
		
		if(flootData[currentFloot][row][col] == SKE12){
			npcPanel(npc_sellkey12_type, npc_sellkey12_imgs, row, col);
			return 0;
		}
		
		if(flootData[currentFloot][row][col] == EXP13){
			npcPanel(npc_exp13_type, npc_exp13_imgs, row, col);
			return 0;
		}

		if(flootData[currentFloot][row][col] == LR15){
			npcPanel(npc_15laoren_type, npc_15laoren_imgs, row, col);
			return 0;
		}

		if(flootData[currentFloot][row][col] == SR15){
			npcPanel(npc_15shangren_type, npc_15shangren_imgs, row, col);
			return 0;
		}
		if(flootData[currentFloot][row][col] == XZ){
			if(sData.szj == 0){
				npcPanel_str("把7楼的十字架带给我,#你的所有属性将会翻倍！", row, col);
			}else{
				npcPanel_str("恭喜你，所有属性翻倍!", row, col);
				
				sData.level = sData.level * 2;
				sData.attack = sData.attack * 2;
				sData.defend = sData.defend * 2;
				sData.blood = sData.blood * 2;
				sData.exp = sData.exp * 2;
				sData.gold = sData.gold * 2;
				
				leftLayer.get("level").str = " " +sData.level;
				leftLayer.get("attack").str = " " +sData.attack;
				leftLayer.get("defend").str = " " +sData.defend;
				leftLayer.get("blood").str = " " +sData.blood;
				leftLayer.get("exp").str = " " +sData.exp;
				leftLayer.get("gold").str = " " +sData.gold;
				
				//清除
				flootLayer[currentFloot].remove(row+"_"+col);
				flootData[currentFloot][row][col] = SPACE;
			}
			
			return 0;
		}
	}

	//宝石
	if(flootData[currentFloot][row][col] >= RDIAM && flootData[currentFloot][row][col] <= BDIAM){
		var sData = monsterData.get(10000);
		if(flootData[currentFloot][row][col] == RDIAM){
			sData.attack = sData.attack + 3;
		}else if(flootData[currentFloot][row][col] == BDIAM){
			sData.defend = sData.defend + 3;
		}
		leftLayer.get("attack").str = " " +sData.attack;
		leftLayer.get("defend").str = " " +sData.defend;
		
		//音效
		musicOk("2");
		
		//清除
		flootLayer[currentFloot].remove(row+"_"+col);
		flootData[currentFloot][row][col] = SPACE;
	}
	
	//钥匙对应的门
	if(flootData[currentFloot][row][col] >= RDOOR && flootData[currentFloot][row][col] <= ODOOR){
		if(doorFlashFinishend == false){
			return 0;
		}
		var sData = monsterData.get(10000);
		if(flootData[currentFloot][row][col] == RDOOR){
			if(sData.rKey < 1){
				//音效
				musicOk("3");
				return 0;
			}
			sData.rKey = sData.rKey - 1;
			leftLayer.get("rKey").str = " " +sData.rKey;
			
			doorFlashFinishend = false;
			
			var tempDoor = flootLayer[currentFloot].get(row+"_"+col);
			tempDoor.start = 1;
			
			//音效
			musicOk("4");
			window.setTimeout(function(){
				flootLayer[currentFloot].remove(row+"_"+col);
				flootData[currentFloot][row][col] = SPACE;
				doorFlashFinishend = true;
			},600);
			return 0;
		}else if(flootData[currentFloot][row][col] == BDOOR){
			if(sData.bKey < 1){
				//音效
				musicOk("3");
				return 0;
			}
			sData.bKey = sData.bKey - 1;
			leftLayer.get("bKey").str = " " +sData.bKey;
			doorFlashFinishend = false;
			
			var tempDoor = flootLayer[currentFloot].get(row+"_"+col);
			tempDoor.start = 1;
			//音效
			musicOk("4");
			window.setTimeout(function(){
				flootLayer[currentFloot].remove(row+"_"+col);
				flootData[currentFloot][row][col] = SPACE;
				doorFlashFinishend = true;
			},600);
			return 0;
		}else if(flootData[currentFloot][row][col] == ODOOR){
			if(sData.oKey < 1){
				//音效
				musicOk("3");
				return 0;
			}
			sData.oKey = sData.oKey - 1;
			leftLayer.get("oKey").str = " " +sData.oKey;
			doorFlashFinishend = false;
			
			var tempDoor = flootLayer[currentFloot].get(row+"_"+col);
			tempDoor.start = 1;
			//音效
			musicOk("4");
			window.setTimeout(function(){
				flootLayer[currentFloot].remove(row+"_"+col);
				flootData[currentFloot][row][col] = SPACE;
				doorFlashFinishend = true;
			},600);
			return 0;
		}
	}
	
	
	//前门
	if(flootData[currentFloot][row][col] == DOOR1){
		
		//到达第一层
		if(currentFloot == 0){
			return 0;
		}
		
		//音效
		musicOk("5");
		
		flootLayer[currentFloot].show = false;
		flootLayer[currentFloot].remove(10000);
		
		currentFloot -- ;
		
		flootLayer[currentFloot].addContent(10000, sprite);
		var pos = getDoorPosition(flootData[currentFloot], DOOR2);
		sprite.x = pos[1]*BLOCK_W;
		sprite.y = pos[0]*BLOCK_H;
		
		//改变楼层
		leftLayer.get("floot").str = " " + (currentFloot +1);
		
		//移动stage使其位置合适
		stagePositon();
		
		flootLayer[currentFloot].show = true;
		
		return 0;
	
	//后门
	}else if(flootData[currentFloot][row][col] == DOOR2){
		//到达最后一层
		if(currentFloot == flootLayer.length - 1){
			return 0;
		}
		
		//音效
		musicOk("5");
		
		flootLayer[currentFloot].show = false;
		flootLayer[currentFloot].remove(10000);
		
		currentFloot ++ ;
		
		flootLayer[currentFloot].addContent(10000, sprite);
		var pos = getDoorPosition(flootData[currentFloot], DOOR1);
		sprite.x = pos[1]*BLOCK_W;
		sprite.y = pos[0]*BLOCK_H;
		
		//改变楼层
		leftLayer.get("floot").str = " " + (currentFloot +1);
		
		//移动stage使其位置合适
		stagePositon();
		
		flootLayer[currentFloot].show = true;
		
		if(maxFloot < currentFloot){
			maxFloot = currentFloot;
		}
		
		return 0;
	}
}

//获取门的位置
function getDoorPosition(floot, door){
	var position = new Array(2);
	for(var i=0; i<floot.length; i++){
		var col = floot[i];
		for(var j=0; j<col.length; j++){
			if(floot[i][j] == door){
				position[0] = i;
				position[1] = j;
				
				return position;
			}
		}
	}
}

//将精灵放到前门
function postionSprite(sprite){
	var pos = getDoorPosition(flootData[currentFloot], DOOR1);
	sprite.x = pos[1]*BLOCK_W;
	sprite.y = pos[0]*BLOCK_H;
}

//npc面板
function npcPanel(npcType, npcimg, row, col){
	npcLayer.clear();
	
	var bg = new Img(0, 0, res.get("npcBg"));
	npcLayer.addContent("bg", bg);
	
	//关闭按钮
  	var closeB = new Button(bg.w - res.get("close_1").width + 20, -20, res.get("close_0"), res.get("close_1"), function(){
		//音效
		musicOk("1");
  		npcLayer.show = false;
  	});
  	npcLayer.addContent("close", closeB);
  	
  	for(var i=0; i<npcType.length; i++){
	   	var tempB = new Button((bg.w - npcimg[i][0].width)/2, res.get("close_1").height + i*70 - 20, npcimg[i][0], npcimg[i][1], function(){
			var sData = monsterData.get(10000);
	   		if(this.data == 0 && sData.gold >= 25){//25攻击     25金币 800血
	   			addGold(-25);
				addBlood(800);
			}else if(this.data == 1 && sData.gold >= 25){//25金币 4攻击
				addGold(-25);
				addAttack(4);
			}else if(this.data == 2 && sData.gold >= 25){//25金币 4防御
				addGold(-25);
				addDefend(4);
				
				
			}else if(this.data == 3 && sData.gold >= 10){//5楼买钥匙  10 黄
				addGold(-10);
				addOkey(1);
			}else if(this.data == 4 && sData.gold >= 50){//5楼买钥匙  50 蓝
				addGold(-50);
				addBkey(1);
			}else if(this.data == 5 && sData.gold >= 100){//5楼买钥匙  100 红
				addGold(-100);
				addRkey(1);
				
				
			}else if(this.data == 6 && sData.exp >= 100){//出售100经验 1级
				addExp(-100);
				addLevel(1);
			}else if(this.data == 7 && sData.exp >= 30){//出售30经验 5攻击
				addExp(-30);
				addAttack(5);
			}else if(this.data == 8 && sData.exp >= 30){//出售30经验 5防御
				addExp(-30);
				addDefend(5)
				
				
			}else if(this.data == 9 && sData.gold >= 100){//11楼商店  100金币 4000血
				addGold(-100);
				addBlood(4000);
			}else if(this.data == 10 && sData.gold >= 100){//11楼商店 100金币 20攻击
				addGold(-100);
				addAttack(20);
			}else if(this.data == 11 && sData.gold >= 100){//11楼商店 100金币 20防御
				addGold(-100);
				addDefend(20);
				
				
				
			}else if(this.data == 12 && sData.oKey >= 1){//12楼出售钥匙 黄 金币+7
				addOkey(-1);
				addGold(7);
			}else if(this.data == 13 && sData.bKey >= 1){//12楼出售钥匙 蓝   金币+35
				addBkey(-1);
				addGold(35);
			}else if(this.data == 14 && sData.rKey >= 1){//12楼出售钥匙 红   金币+70
				addRkey(-1);
				addGold(70);
				
				
				
			}else if(this.data == 15 && sData.exp >= 270){//13楼经验升级 270 3级
				addExp(-270);
				addLevel(3);
			}else if(this.data == 16 && sData.exp >= 95){//13楼经验升级 95 17攻击
				addExp(-95);
				addAttack(17);
			}else if(this.data == 17 && sData.exp >= 95){//13楼经验升级 95 17防御
				addExp(-95);
				addDefend(17);
				
				
			}else if(this.data == 18 && sData.exp >= 500){//15神秘老人 500经验 120攻击
				addExp(-500);
				addAttack(120);
				//清除
				flootLayer[currentFloot].remove(row+"_"+col);
				flootData[currentFloot][row][col] = SPACE;
				npcLayer.show = false;
			}else if(this.data == 19 && sData.gold >= 500){//15神秘老人 500金币 120防御
				addGold(-500);
				addDefend(120)
				//清除
				flootLayer[currentFloot].remove(row+"_"+col);
				flootData[currentFloot][row][col] = SPACE;
				npcLayer.show = false;
			}
	   		
	   		//音效
			musicOk("2");
	  	});
	   	tempB.data = npcType[i];
	  	npcLayer.addContent("temp_" + npcType[i], tempB);
  	}
  	
  	
  	npcLayer.show = true;
}

function npcPanel_str(str){
	npcLayer.clear();
	
	var bg = new Img(0, 0, res.get("npcBg"));
	npcLayer.addContent("bg", bg);
	
	//关闭按钮
  	var closeB = new Button(bg.w - res.get("close_1").width + 20, -20, res.get("close_0"), res.get("close_1"), function(){
		//音效
		musicOk("1");
  		npcLayer.show = false;
  	});
  	npcLayer.addContent("close", closeB);
  	
  	var array = str.split("#");
  	for(var i=0; i<array.length; i++){
  		var s = array[i];
  		var label = new Text(30, 100 + i*30, s);
	  	label.size = FONTA;
	  	npcLayer.addContent("label" + i, label);
	}  	
  	
  	npcLayer.show = true;
}

function addAttack(num){
	var sData = monsterData.get(10000);
	sData.attack = sData.attack + num;
	leftLayer.get("attack").str = " " + sData.attack;
}

function addDefend(num){
	var sData = monsterData.get(10000);
	sData.defend = sData.defend + num;
	leftLayer.get("defend").str = " " + sData.defend;
}
function addBlood(num){
	var sData = monsterData.get(10000);
	sData.blood = sData.blood + num;
	leftLayer.get("blood").str = " " + sData.blood;
}
function addLevel(num){
	var sData = monsterData.get(10000);
	sData.level = sData.level + num;
	leftLayer.get("level").str = " " + sData.level;
}
function addGold(num){
	var sData = monsterData.get(10000);
	sData.gold = sData.gold + num;
	leftLayer.get("gold").str = " " + sData.gold;
}
function addExp(num){
	var sData = monsterData.get(10000);
	sData.exp = sData.exp + num;
	leftLayer.get("exp").str = " " + sData.exp;
}
function addOkey(num){
	var sData = monsterData.get(10000);
	sData.oKey = sData.oKey + num;
	leftLayer.get("oKey").str = " " + sData.oKey;
}
function addBkey(num){
	var sData = monsterData.get(10000);
	sData.bKey = sData.bKey + num;
	leftLayer.get("bKey").str = " " + sData.bKey;
}
function addRkey(num){
	var sData = monsterData.get(10000);
	sData.rKey = sData.rKey + num;
	leftLayer.get("rKey").str = " " + sData.rKey;
}

function musicOk(type){
	if(runPlace == 1){
		JA.music(type);
	}
}