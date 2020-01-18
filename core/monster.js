/*怪物资源*/
var monsterRes;
function monsterResIni(){
	monsterRes = [
		[res.get("m20_0"), res.get("m20_1")],
		[res.get("m43_0"), res.get("m43_1")],
		[res.get("m49_0"), res.get("m49_1")],
		[res.get("m78_0"), res.get("m78_1")],
		[res.get("m32_0"), res.get("m32_1")],
		[res.get("m47_0"), res.get("m47_1")],
		[res.get("m1_0"), res.get("m1_1")],
		[res.get("m2_0"), res.get("m2_1")],
	    [res.get("m88_0"), res.get("m88_1")],
		[res.get("m34_0"), res.get("m34_1")],
			
		[res.get("m10_0"), res.get("m10_1")],
		[res.get("m11_0"), res.get("m11_1")],
		[res.get("m15_0"), res.get("m15_1")],
		[res.get("m21_0"), res.get("m21_1")],
		[res.get("m29_0"), res.get("m29_1")],
		[res.get("m31_0"), res.get("m31_1")],
		[res.get("m3_0"),  res.get("m3_1")],
	    [res.get("m41_0"), res.get("m41_1")],
		[res.get("m45_0"), res.get("m45_1")],
		[res.get("m46_0"), res.get("m46_1")],
		[res.get("m47_0"), res.get("m47_1")],
		[res.get("m50_0"), res.get("m50_1")],
		[res.get("m55_0"), res.get("m55_1")],
		[res.get("m56_0"), res.get("m56_1")],
		[res.get("m65_0"), res.get("m65_1")],
		[res.get("m67_0"), res.get("m67_1")],
		[res.get("m68_0"), res.get("m68_1")],
	    [res.get("m73_0"), res.get("m73_1")],
		[res.get("m76_0"), res.get("m76_1")],
		[res.get("m77_0"), res.get("m77_1")],
		[res.get("m79_0"), res.get("m79_1")],
		[res.get("m88_0"), res.get("m88_1")],
		[res.get("m90_0"), res.get("m90_1")],
		[res.get("m91_0"), res.get("m91_1")],
		[res.get("m94_0"), res.get("m94_1")],
		[res.get("m95_0"), res.get("m95_1")],
		[res.get("m44_0"), res.get("m44_1")],
	];
}

/*怪物*/
var M20  = 100;//
var M43   = 101;//
var M49   = 102;//
var M78   = 103;//
var M32   = 104;//
var M47   = 105;//
var M1   = 106;//
var M2   = 107;//
var M88   = 108;//
var M34   = 109;//

var M10  = 110;//
var M11  = 111;//
var M15  = 112;//
var M21  = 113;//
var M29  = 114;//
var M31  = 115;//
var M3   = 116;//
var M41  = 117;//
var M45  = 118;//
var M46  = 119;//
var M47  = 120;//
var M50  = 121;//
var M55  = 122;//
var M56  = 123;//
var M65  = 124;//
var M67  = 125;//
var M68  = 126;//
var M73  = 127;//
var M76  = 128;//
var M77  = 129;//
var M79  = 130;//
var M88  = 131;//
var M90  = 132;//
var M91  = 133;//
var M94  = 134;//
var M95  = 135;//
var M44  = 136;//

/*怪物数据*/
function m20(){
	this.id = M20;
	this.name = "红头怪";
	this.attack = 15;
	this.defend = 2;
	this.blood = 70;
	this.exp = 2;
	this.gold = 2;
}    

function m43(){
	this.id = M43;
	this.name = "绿头怪";
	this.attack = 20;
	this.defend = 1;
	this.blood = 50;
	this.exp = 1;
	this.gold = 1;
}
function m49(){
	this.id = M49;
	this.name = "青头怪";
	this.attack = 35;
	this.defend = 10;
	this.blood = 200;
	this.exp = 5;
	this.gold = 5;
} 
function m78(){
	this.id = M78;
	this.name = "骷髅人";
	this.attack = 25;
	this.defend = 5;
	this.blood = 110;
	this.exp = 4;
	this.gold = 5;
} 
function m32(){
	this.id = M32;
	this.name = "骷髅士兵";
	this.attack = 40;
	this.defend = 20;
	this.blood = 150;
	this.exp = 8;
	this.gold = 8;
} 
function m47(){
	this.id = M47;
	this.name = "初级法师";
	this.attack = 50;
	this.defend = 25;
	this.blood = 125;
	this.exp = 7;
	this.gold = 10;
} 
function m1(){
	this.id = M1;
	this.name = "小蝙蝠";
	this.attack = 20;
	this.defend = 5;
	this.blood = 100;
	this.exp = 3;
	this.gold = 3;
} 
function m2(){
	this.id = M2;
	this.name = "兽面人";
	this.attack = 75;
	this.defend = 45;
	this.blood = 300;
	this.exp = 10;
	this.gold = 13;
} 
function m88(){
	this.id = M88;
	this.name = "金卫士";
	this.attack = 350;
	this.defend = 200;
	this.blood = 850;
	this.exp = 40;
	this.gold = 45;
} 
function m34(){
	this.id = M34;
	this.name = "金队长";
	this.attack = 750;
	this.defend = 650;
	this.blood = 900;
	this.exp = 70;
	this.gold = 77;
} 


function m10(){this.id = M10;this.name = "麻衣法师";this.attack = 120;this.defend = 70;this.blood = 250;this.exp = 17;this.gold = 20;} 
function m11(){this.id = M11;this.name = "红蝙蝠";this.attack = 160;this.defend = 90;this.blood = 550;this.exp = 20;this.gold = 25;} 
function m15(){this.id = M15;this.name = "兽面武士";this.attack = 450;this.defend = 330;this.blood = 900;this.exp = 50;this.gold = 50;}
function m21(){this.id = M21;this.name = "白衣武士";this.attack = 300;this.defend = 150;this.blood = 1300;this.exp = 35;this.gold = 40;} 
function m29(){this.id = M29;this.name = "双手剑士";this.attack = 620;this.defend = 650;this.blood = 1200;this.exp = 75;this.gold = 65;}
function m31(){this.id = M31;this.name = "冥队长";this.attack = 1200;this.defend = 1133;this.blood = 3333;this.exp = 100;this.gold = 112;} 
function m3 (){this.id = M3 ;this.name = "红衣魔王(小)";this.attack = 1000;this.defend = 1000;this.blood = 15000;this.exp = 100;this.gold = 100;} 
function m41(){this.id = M41;this.name = "初级卫兵";this.attack = 150;this.defend = 90;this.blood = 450;this.exp = 19;this.gold = 22;}
function m45(){this.id = M45;this.name = "怪王";this.attack = 250;this.defend = 125;this.blood = 700;this.exp = 30;this.gold = 32;} 
function m46(){this.id = M46;this.name = "灵武士";this.attack = 2612;this.defend = 2400;this.blood = 2400;this.exp = 125;this.gold = 146;} 
function m47(){this.id = M47;this.name = "初级法师";this.attack = 50;this.defend = 25;this.blood = 125;this.exp = 7;this.gold = 10;} 
function m50(){this.id = M50;this.name = "灵法师";this.attack = 2212;this.defend = 1946;this.blood = 3000;this.exp = 116;this.gold = 132;}
function m55(){this.id = M55;this.name = "大蝙蝠";this.attack = 65;this.defend = 30;this.blood = 150;this.exp = 8;this.gold = 10;} 
function m56(){this.id = M56;this.name = "骷髅队长";this.attack = 90;this.defend = 50;this.blood = 400;this.exp = 12;this.gold = 15;}
function m65(){this.id = M65;this.name = "红衣魔王(大)";this.attack = 1555;this.defend = 1555;this.blood = 20000;this.exp = 133;this.gold = 133;} 
function m67(){this.id = M67;this.name = "冥灵魔王(大)";this.attack = 3400;this.defend = 3000;this.blood = 60000;this.exp = 343;this.gold = 390;} 
function m68(){this.id = M68;this.name = "冥战士";this.attack = 680;this.defend = 590;this.blood = 2000;this.exp = 65;this.gold = 70;}
function m73(){this.id = M73;this.name = "冥卫兵";this.attack = 500;this.defend = 400;this.blood = 1250;this.exp = 55;this.gold = 55;} 
function m76(){this.id = M76;this.name = "高级卫兵";this.attack = 560;this.defend = 460;this.blood = 1500;this.exp = 60;this.gold = 60;} 
function m77(){this.id = M77;this.name = "石头怪人";this.attack = 115;this.defend = 65;this.blood = 500;this.exp = 15;this.gold = 15;}
function m79(){this.id = M79;this.name = "红衣法师";this.attack = 400;this.defend = 260;this.blood = 500;this.exp = 45;this.gold = 47;} 
function m88(){this.id = M88;this.name = "金卫士";this.attack = 350;this.defend = 200;this.blood = 850;this.exp = 40;this.gold = 45;} 
function m90(){this.id = M90;this.name = "冥灵魔王(小)";this.attack = 1700;this.defend = 1500;this.blood = 30000;this.exp = 220;this.gold = 250;} 
function m91(){this.id = M91;this.name = "影子战士";this.attack = 1150;this.defend = 1050;this.blood = 3100;this.exp = 80;this.gold = 92;} 
function m94(){this.id = M94;this.name = "高级法师";this.attack = 200;this.defend = 110;this.blood = 100;this.exp = 25;this.gold = 30;}
function m95(){this.id = M95;this.name = "血影";this.attack = 5000;this.defend = 4000;this.blood = 99999;this.exp = 0;this.gold = 0;} 
function m44(){this.id = M44;this.name = "怪王";this.attack = 250;this.defend = 125;this.blood = 700;this.exp = 30;this.gold = 32;} 