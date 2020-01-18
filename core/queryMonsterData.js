
//跳楼层
function skipFloot(){
	
	//音效
	musicOk("1");
	
	skipLayer.clear();
	
	var bg = new Img(0, 0, res.get("monsterInfoBg"));
	skipLayer.addContent("bg", bg);
	
	//关闭按钮
  	var closeB = new Button(bg.w - res.get("close_1").width + 20, -20, res.get("close_0"), res.get("close_1"), function(){
		//音效
		musicOk("1");
  		skipLayer.show = false;
  	});
  	skipLayer.addContent("close", closeB);
  	
  	var n = 0;
  	
  	for(var i=0; i<5; i++){
  		for(var j=0; j<5; j++){
  			if(n > maxFloot){
  				break;
  			}
  			var b = new Button(190 + 100*j, 150 + i*100, res.get("numBg"), res.get("numBg"), function(){
  				flootLayer[currentFloot].remove(10000);
  				flootLayer[currentFloot].show = false;
			  	
  				currentFloot = this.data;
  				//改变楼层
				leftLayer.get("floot").str = " " + (currentFloot +1);
				
				flootLayer[currentFloot].addContent(10000, sprite);
  				flootLayer[currentFloot].show = true;
  				postionSprite(sprite);
  				//移动stage使其位置合适
				stagePositon();
  				
  				//音效
				musicOk("2");
  				
				skipLayer.show = false;
  			});
  			b.data = n;
  			skipLayer.addContent(n, b);
  			
  			var fstr = new Text(b.x + 20, b.y + 43, "" + (n+1));
		  	fstr.size = FONTC;
		  	if(n >= 9){
		  		fstr.x = fstr.x - 8;
		  	}
		  	skipLayer.addContent("f" + n, fstr);
  			
  			n++;
  		}
  	}
  	skipLayer.show = true;
}

//查看楼层怪物信息
function flootMonsterInfo(){
	
	//音效
	musicOk("1");
	
	/*主角数据*/
  	var sData = monsterData.get(10000);
  	
	var flootMonsterData = getFlootMonsterData(currentFloot);
	
	monsterInfoLayer.clear();
	
	var bg = new Img(0, 0, res.get("monsterInfoBg"));
	monsterInfoLayer.addContent("bg", bg);
	
	//关闭按钮
  	var closeB = new Button(bg.w - res.get("close_1").width + 20, -20, res.get("close_0"), res.get("close_1"), function(){
		//音效
		musicOk("1");
  		monsterInfoLayer.show = false;
  	});
  	monsterInfoLayer.addContent("close", closeB); 
  	
	for(var i=0; i<flootMonsterData.length; i++){
		var mData = flootMonsterData[i];
		
		//图标
		var monster = new Sprite(75, 35 + (monsterRes[mData.id-100][0].height + 5)*i, monsterRes[mData.id-100], 300);
		monsterInfoLayer.addContent("img" + i, monster); 
		
		//名称
		var name = new Text(monsterRes[mData.id-100][0].width + 80, 35 + (monsterRes[mData.id-100][0].height + 5)*i + 40, mData.name);
  		name.size = FONTB;
  		monsterInfoLayer.addContent("name" + i, name); 
  		
  		//攻击
 		var attack = new Text(name.x + 115, 35 + (monsterRes[mData.id-100][0].height + 5)*i + 40, "攻击" + mData.attack);
  		attack.size = FONTB;
  		monsterInfoLayer.addContent("attack" + i, attack);
  		
  		//防御
  		var defend = new Text(attack.x + 115, 35 + (monsterRes[mData.id-100][0].height + 5)*i + 40, "防御" + mData.defend);
  		defend.size = FONTB;
  		monsterInfoLayer.addContent("defend" + i, defend);
  		
  		//金币
  		var gold = new Text(defend.x + 115, 35 + (monsterRes[mData.id-100][0].height + 5)*i + 40, "金币" + mData.gold);
  		gold.size = FONTB;
  		monsterInfoLayer.addContent("gold" + i, gold);
  		
  		//经验
  		var exp = new Text(gold.x + 115, 35 + (monsterRes[mData.id-100][0].height + 5)*i + 40, "经验" + mData.exp);
  		exp.size = FONTB;
  		monsterInfoLayer.addContent("exp" + i, exp);
  		
  		//生命
  		var blood = new Text(exp.x + 115, 35 + (monsterRes[mData.id-100][0].height + 5)*i + 40, "");
  		blood.size = FONTB;
  		monsterInfoLayer.addContent("blood" + i, blood);
  		
  		//战斗次数
	  	var times = parseInt(mData.blood/((sData.attack - mData.defend)*1));
	  	
	  	//怪物每次掉血    怪物生命÷（勇士攻击－怪物防御)
	  	//var mBlood = sData.attack - mData.defend;
	  	
	  	//勇士每次掉血   （怪物攻击－勇士防御）×怪物进攻
	  	var sBlood = (mData.attack - sData.defend)*1;
	  	
	  	//勇士总共掉血
	  	var allBlood = sBlood * times;
	  	
	  	if(sData.attack <= mData.defend){
	  		blood.str = "消耗?";
	  	}else{
	  		blood.str = "消耗" + allBlood;
	  	}
	}
	
	monsterInfoLayer.show = true;
}

//获取楼层怪物数据
function getFlootMonsterData(flootIndex){
	var flootMonsterData = new Array();
	var flootMap = flootData[flootIndex];
	
	var tempMap = new Map();
	
	for(var i=0; i<flootMap.length; i++){
		var rowArray = flootMap[i];
		for(var j=0; j<rowArray.length; j++){
			var monsterId = rowArray[j];
			if(monsterId >= 100 && monsterId <= 136){
				var tm = tempMap.get("id_" + monsterId);
				if(tm == null){
					flootMonsterData.push(getMonsterData(monsterId));
					tempMap.put("id_" + monsterId,monsterId);
				}
				
			}
		}
	}
	return flootMonsterData;
}

//根据怪物id获取怪物原始数据
function getMonsterData(id){
	if(id == M20){ return new m20(); }
	else if(id == M43){ return new m43();}
	else if(id == M49){ return new m49();}
	else if(id == M78){ return new m78();}
	else if(id == M32){ return new m32();}
	else if(id == M47){ return new m47();}
	else if(id == M1){  return new m1();}
	else if(id == M2){  return new m2();}
	else if(id == M43){ return new m43();}
	else if(id == M88){ return new m88();}
	else if(id == M34){ return new m34();}
	else if(id == M10){ return new m10();}
	else if(id == M11){ return new m11();}
	else if(id == M15){ return new m15();}
	else if(id == M21){ return new m21();}
	else if(id == M29){ return new m29();}
	else if(id == M31){ return new m31();}
	else if(id == M3 ){ return new m3();}
	else if(id == M41){ return new m41();}
	else if(id == M45){ return new m45();}
	else if(id == M46){ return new m46();}
	else if(id == M47){ return new m47();}
	else if(id == M50){ return new m50();}
	else if(id == M55){ return new m55();}
	else if(id == M56){ return new m56();}
	else if(id == M65){ return new m65();}
	else if(id == M67){ return new m67();}
	else if(id == M68){ return new m68();}
	else if(id == M73){ return new m73();}
	else if(id == M76){ return new m76();}
	else if(id == M77){ return new m77();}
	else if(id == M79){ return new m79();}
	else if(id == M88){ return new m88();}
	else if(id == M90){ return new m90();}
	else if(id == M91){ return new m91();}
	else if(id == M94){ return new m94();}
	else if(id == M95){ return new m95();}
  	else if(id == M44){ return new m44();}
}