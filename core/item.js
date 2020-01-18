

/*主角数据*/
function spriteData(){
	this.level = 1;//0
	
	this.attack = 12;//1
	this.defend = 12;//2
	this.blood = 2000;//3
	
	this.gold = 0;//4
	this.exp = 0;//5
	
	this.rKey = 0;//6
	this.bKey = 0;//7
    this.oKey = 0;//8
    
    this.ax = 0;//9
    this.skip = 0;//10
    this.gwxx = 0;//11
    this.floot = 0//12
    this.szj = 0;//13
}

/*主角资源*/
var spriteRes;
function spriteResIni(){
	spriteRes = [
		[res.get("sprite_down0"), res.get("sprite_down1")],
		[res.get("sprite_up0"), res.get("sprite_up1")],
		[res.get("sprite_left0"), res.get("sprite_left1")],
		[res.get("sprite_right0"), res.get("sprite_right1")],
	]
}


var SPACE  = 0;//空
var BLOCK  = 1;//障碍物
var BLOK2 = 2;//闪亮的障碍物
var DOOR1  = 50;//前门
var DOOR2  = 51;//后门

/*门*/
var colorDoorRes;
var RDOOR  = 52;//红门
var BDOOR  = 53;//蓝门
var ODOOR  = 54;//黄门
function colorDoorResIni(){
	colorDoorRes = [
		[res.get("rdoor1"), res.get("rdoor2"), res.get("rdoor3")],
		[res.get("bdoor1"), res.get("bdoor2"), res.get("bdoor3")],
		[res.get("odoor1"), res.get("odoor2"), res.get("odoor3")]
	]
}


/*钥匙*/
var keyRes;
var RKEY   = 60;//红钥匙
var BKEY   = 61//蓝钥匙
var OKEY   = 62//黄钥匙
function keyResIni(){
	keyRes = [res.get("rkey"), res.get("bkey"), res.get("okey")];
}

/*血瓶*/
var bottleRes;
var BOTT1 = 65;
var BOTT2 = 66;
function bottleResIni(){
	bottleRes = [res.get("bottle1"), res.get("bottle2")];
}

/*钻石*/
var diamondRes;
var RDIAM = 70;
var BDIAM = 71;
function diamondResIni(){
	diamondRes = [res.get("rDiamond"), res.get("bDiamond")];
}

/*道具*/
var toolRes;
var GWXX = 1000;//查看怪物信息
var SDOOR = 1001;//2楼特殊门
var JIAN = 1002;//3楼剑
var DUN = 1003;//5楼盾
var XFY = 1004;//6小飞羽
var SZJ = 1005;//7十字架
var FP = 1006;//9飞盘
var JIAN9 = 1007;//9剑
var AX = 1008;//12斧子
var SS = 1009;//14圣水
var JIAN19 = 1010;//19剑
function toolResIni(){
	toolRes = [res.get("gwxx"), res.get("sDoor"), res.get("jian"), res.get("dun"), 
			   res.get("xfy"), res.get("szj"), res.get("fp"), res.get("9jian"), 
			   res.get("ax"), res.get("ss"), res.get("19jian")];
}

//npcs
var npcRes;
var SHOP3 = 1500;
var THIEF = 1501;
var KEY5 = 1502;
var EXP5 = 1503;
var SHO11 = 1504;
var SKE12 = 1505;//12楼卖钥匙
var EXP13 = 1506;//13楼买经验升级
var LR15 = 1507;//15楼神秘老人
var SR15 = 1508;//15楼商人
var XZ = 1509;//15楼商人
function npcResIni(){
	npcRes = [res.get("shop"), res.get("thief"), res.get("key5"), res.get("exp5"), 
			 res.get("shop11"), res.get("sellkey12"), res.get("exp13"), res.get("15_laoren"), 
			 res.get("15_shangren"), res.get("xz")];
}



//3楼商店
var npc_shop3_imgs;
var npc_shop3_type = [0, 1, 2];

//5楼卖钥匙商人
var key_sell_5_imgs;
var key_sell_5_type = [3, 4, 5];

//5楼买经验商人
var exp_sell_5_imgs;
var exp_sell_5_type = [6, 7, 8];

//11楼商店
var npc_shop11_imgs;
var npc_shop11_type = [9, 10, 11];

//12楼卖钥匙
var npc_sellkey12_imgs;
var npc_sellkey12_type = [12, 13, 14];

//13楼经验升级
var npc_exp13_imgs;
var npc_exp13_type = [15, 16, 17];

//15 神秘老人 攻击+120 500exp， 商人 防御120 500金币
var npc_15laoren_imgs;
var npc_15laoren_type = [18];

var npc_15shangren_imgs;
var npc_15shangren_type = [19];

function npc_shop3_ini(){
	npc_shop3_imgs = [[res.get("shop3_blood_0"), res.get("shop3_blood_1")],
					  [res.get("shop3_attack_0"), res.get("shop3_attack_1")],
					  [res.get("shop3_defend_0"), res.get("shop3_defend_1")]
					 														];
	
	key_sell_5_imgs = [[res.get("5_buy_okey_0"), res.get("5_buy_okey_1")],
					  [res.get("5_buy_bkey_0"), res.get("5_buy_bkey_1")],
					  [res.get("5_buy_rkey_0"), res.get("5_buy_rkey_1")]
					 														];
	
	exp_sell_5_imgs = [[res.get("5_exp_level100_0"), res.get("5_exp_level100_1")],
					  [res.get("5_exp_attack30_0"), res.get("5_exp_attack30_1")],
					  [res.get("5_exp_defend30_0"), res.get("5_exp_defend30_1")]
					 														];
	npc_shop11_imgs = [[res.get("11_shop_blood_0"), res.get("11_shop_blood_1")],
					  [res.get("11_shop_attack_0"), res.get("11_shop_attack_1")],
					  [res.get("11_shop_defend_0"), res.get("11_shop_defend_1")]
					 														];
	
	npc_sellkey12_imgs = [[res.get("12_sellOkey_0"), res.get("12_sellOkey_1")],
					  [res.get("12_sellBkey_0"), res.get("12_sellBkey_1")],
					  [res.get("12_sellRkey_0"), res.get("12_sellRkey_1")]
					 														];
	npc_exp13_imgs = [[res.get("13_expLevel_0"), res.get("13_expLevel_1")],
					  [res.get("13_expAttack_0"), res.get("13_expAttack_1")],
					  [res.get("13_expDefend_0"), res.get("13_expDefend_1")]
					 														];
	npc_15laoren_imgs = [[res.get("15_laoren_0"), res.get("15_laoren_1")]];
	
	npc_15shangren_imgs = [[res.get("15_shangren_0"), res.get("15_shangren_1")]];
}



