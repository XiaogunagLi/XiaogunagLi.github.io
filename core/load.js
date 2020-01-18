function loadRes(){
	/*主背景*/
	loadTool.load("bg","images/bg.jpg");
	
	/*精灵*/
	loadTool.load("sprite_up0","images/sprite_up0.png");
	loadTool.load("sprite_up1","images/sprite_up1.png");
	loadTool.load("sprite_down0","images/sprite_down0.png");
	loadTool.load("sprite_down1","images/sprite_down1.png");
	loadTool.load("sprite_left0","images/sprite_left0.png");
	loadTool.load("sprite_left1","images/sprite_left1.png");
	loadTool.load("sprite_right0","images/sprite_right0.png");
	loadTool.load("sprite_right1","images/sprite_right1.png");
	
	/*道具------查看怪物详情数据*/
	loadTool.load("monsterInfo_0","images/monsterInfo1.png");
	loadTool.load("monsterInfo_1","images/monsterInfo2.png");
	loadTool.load("monsterInfoBg","images/monsterInfoBg.png");
	
	loadTool.load("gwxx","images/gwxx.png");
	loadTool.load("sDoor","images/sDoor.png");//二楼特殊门
	loadTool.load("jian","images/jian.png");//3楼特左上角剑
	loadTool.load("dun","images/dun.png");//5楼盾
	loadTool.load("xfy","images/xfy.png");//6小飞羽
	loadTool.load("szj","images/szj.png");//7十字架
	loadTool.load("fp","images/fp.png");//9飞盘
	loadTool.load("9jian","images/jian.png");//9剑
	loadTool.load("ax","images/ax.png");//12斧子
	loadTool.load("ss","images/ss.png");//14圣水
	loadTool.load("19jian","images/jian.png");//19剑
	
	/*npc------*/
	loadTool.load("shop","images/shop.png");//商店3层
	loadTool.load("npcBg","images/npcBg.png");//
	
	//3楼商店
	loadTool.load("shop3_attack_0","images/shop3_attack_0.png");
	loadTool.load("shop3_attack_1","images/shop3_attack_1.png");
	loadTool.load("shop3_blood_0","images/shop3_blood_0.png");
	loadTool.load("shop3_blood_1","images/shop3_blood_1.png");
	loadTool.load("shop3_defend_0","images/shop3_defend_0.png");
	loadTool.load("shop3_defend_1","images/shop3_defend_1.png");
	
	//5楼买钥匙
	loadTool.load("5_buy_okey_0","images/5_buy_okey_0.png");
	loadTool.load("5_buy_okey_1","images/5_buy_okey_1.png");
	loadTool.load("5_buy_bkey_0","images/5_buy_bkey_0.png");
	loadTool.load("5_buy_bkey_1","images/5_buy_bkey_1.png");
	loadTool.load("5_buy_rkey_0","images/5_buy_rkey_0.png");
	loadTool.load("5_buy_rkey_1","images/5_buy_rkey_1.png");
	
    //5楼出售经验
	loadTool.load("5_exp_level100_0","images/5_exp_level100_0.png");
	loadTool.load("5_exp_level100_1","images/5_exp_level100_1.png");
	loadTool.load("5_exp_attack30_0","images/5_exp_attack30_0.png");
	loadTool.load("5_exp_attack30_1","images/5_exp_attack30_1.png");
	loadTool.load("5_exp_defend30_0","images/5_exp_defend30_0.png");
	loadTool.load("5_exp_defend30_1","images/5_exp_defend30_1.png");
	
	//11楼商店
	loadTool.load("11_shop_blood_0","images/11_shop_blood_0.png");
	loadTool.load("11_shop_blood_1","images/11_shop_blood_1.png");
	loadTool.load("11_shop_attack_0","images/11_shop_attack_0.png");
	loadTool.load("11_shop_attack_1","images/11_shop_attack_1.png");
	loadTool.load("11_shop_defend_0","images/11_shop_defend_0.png");
	loadTool.load("11_shop_defend_1","images/11_shop_defend_1.png");
	
	//12出售钥匙
	loadTool.load("12_sellOkey_0","images/12_sellOkey_0.png");
	loadTool.load("12_sellOkey_1","images/12_sellOkey_1.png");
	loadTool.load("12_sellBkey_0","images/12_sellBkey_0.png");
	loadTool.load("12_sellBkey_1","images/12_sellBkey_1.png");
	loadTool.load("12_sellRkey_0","images/12_sellRkey_0.png");
	loadTool.load("12_sellRkey_1","images/12_sellRkey_1.png");
	
	
	//13出售经验
	loadTool.load("13_expLevel_0","images/13_expLevel_0.png");
	loadTool.load("13_expLevel_1","images/13_expLevel_1.png");
	loadTool.load("13_expAttack_0","images/13_expAttack_0.png");
	loadTool.load("13_expAttack_1","images/13_expAttack_1.png");
	loadTool.load("13_expDefend_0","images/13_expDefend_0.png");
	loadTool.load("13_expDefend_1","images/13_expDefend_1.png");
	
	//15层神秘老人
	loadTool.load("15_laoren_0","images/15_laoren_0.png");
	loadTool.load("15_laoren_1","images/15_laoren_1.png");
	//15层商人
	loadTool.load("15_shangren_0","images/15_shangren_0.png");
	loadTool.load("15_shangren_1","images/15_shangren_1.png");
	
	
	loadTool.load("thief","images/thief.png");//4楼贼
	loadTool.load("key5","images/key5.png");//5楼买钥匙商人
	loadTool.load("exp5","images/exp5.png");//5楼买经验商人
	loadTool.load("shop11","images/shop11.png");//11楼商店
	loadTool.load("sellkey12","images/sellkey12.png");//11楼商店
	loadTool.load("exp13","images/exp5.png");//13楼卖经验升级
	loadTool.load("15_laoren","images/15_laoren.png");//15 神秘老人
	loadTool.load("15_shangren","images/15_shangren.png");//13 商人
	
	
	/*英雄属性图标*/
	loadTool.load("s_floot","images/s_floot.png");//楼层
	loadTool.load("s_level","images/s_level.png");//等级
	loadTool.load("s_attack","images/s_attack.png");//攻击
	loadTool.load("s_defend","images/s_defend.png");//防御
	loadTool.load("s_blood","images/s_blood.png");//血量
	loadTool.load("s_gold","images/s_gold.png");//金币
	loadTool.load("s_exp","images/s_exp.png");//经验
	
	
	/*道具------跳楼层*/
	loadTool.load("skip_0","images/skip1.png");
	loadTool.load("skip_1","images/skip2.png");
	
	/*关闭按钮*/
	loadTool.load("close_0","images/close1.png");
	loadTool.load("close_1","images/close2.png");
	
	/*block*/
	loadTool.load("block","images/block.png");
	loadTool.load("block_0","images/block_0.png");
	loadTool.load("block_1","images/block_1.png");
	
	/*方向键*/
	loadTool.load("left1","images/left1.png");
	loadTool.load("left2","images/left2.png");
	loadTool.load("right1","images/right1.png");
	loadTool.load("right2","images/right2.png");
	loadTool.load("up1","images/up1.png");
	loadTool.load("up2","images/up2.png");
	loadTool.load("down1","images/down1.png");
	loadTool.load("down2","images/down2.png");
	
	/*菜单按钮*/
	loadTool.load("menu_0","images/menu_0.png");
	loadTool.load("menu_1","images/menu_1.png");
	/*保存按钮*/
	//loadTool.load("save_0","images/save_0.png");
	//loadTool.load("save_1","images/save_1.png");
	loadTool.load("savesucess","images/savesucess.png");
	
	/*战斗面板*/
	loadTool.load("battleBg","images/battleBg.png");
	
	/*数字背景*/
	loadTool.load("numBg","images/numBg.png");
	
	/*战斗结果面板*/
	loadTool.load("battleRbg","images/battleRbg.png");
	
	/*关闭按钮*/
	//loadTool.load("close1","images/close1.jpg");
	//loadTool.load("close2","images/close2.jpg");
	
	/*门*/
	loadTool.load("door","images/door.jpg");
	loadTool.load("xz","images/xz.png");
	
	/*钥匙*/
	loadTool.load("rkey","images/rkey.png");
	loadTool.load("bkey","images/bkey.png");
	loadTool.load("okey","images/okey.png");
	
	/*钥匙对应的门*/
	loadTool.load("rdoor1","images/rdoor1.png");
	loadTool.load("rdoor2","images/rdoor2.png");
	loadTool.load("rdoor3","images/rdoor3.png");
	
	loadTool.load("odoor1","images/odoor1.png");
	loadTool.load("odoor2","images/rdoor2.png");
	loadTool.load("odoor3","images/rdoor3.png");
	
	loadTool.load("bdoor1","images/bdoor1.png");
	loadTool.load("bdoor2","images/rdoor2.png");
	loadTool.load("bdoor3","images/rdoor3.png");

	/*钻石*/
	loadTool.load("rDiamond","images/rDiamond.png");
	loadTool.load("bDiamond","images/bDiamond.png");
	
	/*血瓶*/
	loadTool.load("bottle1","images/bottle1.png");
	loadTool.load("bottle2","images/bottle2.png");
	
	/*------------------------------------------------------------怪物*/
	
	/*红头怪*/
	loadTool.load("m20_0","images/m20_0.png");
	loadTool.load("m20_1","images/m20_0.png");
	
	/*绿头怪*/
	loadTool.load("m43_0","images/m43_0.png");
	loadTool.load("m43_1","images/m43_0.png");
	
	/*青头怪*/
	loadTool.load("m49_0","images/m49_0.png");
	loadTool.load("m49_1","images/m49_0.png");
	
	/*骷髅人*/
	loadTool.load("m78_0","images/m78_0.png");
	loadTool.load("m78_1","images/m78_0.png");
	
	/*骷髅士兵*/
	loadTool.load("m32_0","images/m32_0.png");
	loadTool.load("m32_1","images/m32_0.png");
	
	/*初级法师*/
	loadTool.load("m47_0","images/m47_0.png");
	loadTool.load("m47_1","images/m47_0.png");
	
	/*小蝙蝠*/
	loadTool.load("m1_0","images/m1_0.png");
	loadTool.load("m1_1","images/m1_0.png");
	
	/*兽面人*/
	loadTool.load("m2_0","images/m2_0.png");
	loadTool.load("m2_1","images/m2_0.png");
	
	/*金卫士*/
	loadTool.load("m88_0","images/m88_0.png");
	loadTool.load("m88_1","images/m88_0.png");
	
	/*金队长*/
	loadTool.load("m34_0","images/m34_0.png");
	loadTool.load("m34_1","images/m34_0.png");
	
	
	/*麻衣法师    */loadTool.load("m10_0","images/m10_0.png");loadTool.load("m10_1","images/m10_0.png");
	/*红蝙蝠      */loadTool.load("m11_0","images/m11_0.png");loadTool.load("m11_1","images/m11_0.png");
	/*兽面武士    */loadTool.load("m15_0","images/m15_0.png");loadTool.load("m15_1","images/m15_0.png");
	/*白衣武士    */loadTool.load("m21_0","images/m21_0.png");loadTool.load("m21_1","images/m21_0.png");
	/*双手剑士    */loadTool.load("m29_0","images/m29_0.png");loadTool.load("m29_1","images/m29_0.png");
	/*冥队长      */loadTool.load("m31_0","images/m31_0.png");loadTool.load("m31_1","images/m31_0.png");
	/*红衣魔王(小)*/loadTool.load("m3_0",  "images/m3_0.png");loadTool.load("m3_1", "images/m3_0.png");
	/*初级卫兵    */loadTool.load("m41_0","images/m41_0.png");loadTool.load("m41_1","images/m41_0.png");
	/*怪王        */loadTool.load("m45_0","images/m45_0.png");loadTool.load("m45_1","images/m45_0.png");
	/*灵武士      */loadTool.load("m46_0","images/m46_0.png");loadTool.load("m46_1","images/m46_0.png");
	/*灵法师      */loadTool.load("m50_0","images/m50_0.png");loadTool.load("m50_1","images/m50_0.png");
	/*大蝙蝠      */loadTool.load("m55_0","images/m55_0.png");loadTool.load("m55_1","images/m55_0.png");
	/*骷髅队长    */loadTool.load("m56_0","images/m56_0.png");loadTool.load("m56_1","images/m56_0.png");
	/*红衣魔王(大)*/loadTool.load("m65_0","images/m65_0.png");loadTool.load("m65_1","images/m65_0.png");
	/*冥灵魔王(大)*/loadTool.load("m67_0","images/m67_0.png");loadTool.load("m67_1","images/m67_0.png");
	/*冥战士      */loadTool.load("m68_0","images/m68_0.png");loadTool.load("m68_1","images/m68_0.png");
	/*冥卫兵      */loadTool.load("m73_0","images/m73_0.png");loadTool.load("m73_1","images/m73_0.png");
	/*高级卫兵    */loadTool.load("m76_0","images/m76_0.png");loadTool.load("m76_1","images/m76_0.png");
	/*石头怪人    */loadTool.load("m77_0","images/m77_0.png");loadTool.load("m77_1","images/m77_0.png");
	/*红衣法师    */loadTool.load("m79_0","images/m79_0.png");loadTool.load("m79_1","images/m79_0.png");
	/*冥灵魔王(小)*/loadTool.load("m90_0","images/m90_0.png");loadTool.load("m90_1","images/m90_0.png");
	/*影子战士    */loadTool.load("m91_0","images/m91_0.png");loadTool.load("m91_1","images/m91_0.png");
	/*高级法师    */loadTool.load("m94_0","images/m94_0.png");loadTool.load("m94_1","images/m94_0.png");
	/*血影        */loadTool.load("m95_0","images/m95_0.png");loadTool.load("m95_1","images/m95_0.png");
	/*怪王        */loadTool.load("m44_0","images/m44_0.png");loadTool.load("m44_1","images/m44_0.png");
}


