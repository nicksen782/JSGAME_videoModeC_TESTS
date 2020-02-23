// *** TESTS1 GAMESTATE FUNCTION ***

// GAMESTATE TESTS1
game.gs.TESTS1 = {
	//
	temp : {},
	//
	vars         : {
	},
	//
	consts       : {
	},
	//
	prepareState : function(){
		let gs     = this;
		let vars   = gs.vars;
		let consts = gs.consts;

		vars.init=false;
		_CGF.ClearSprites();
		_CGF.ClearVram();

		// ON-SCREEN GAMEPAD INPUT TESTING.
		vars.gamepad = {
			// Absolute position.
			"gamepad":{ "flags":{"spriteIndex":undefined, "OFF":true }, "x":0+(4 *_CS.TILE_WIDTH), "y":0+(18*_CS.TILE_HEIGHT), "map":"snes_gp"     , "tileset":"tilesSP1" , "layer":"SP1" },
			// Position relative to the gamepad x,y.
			"SL"     :{ "flags":{"spriteIndex":undefined, "OFF":true }, "x":0+(2 *_CS.TILE_WIDTH), "y":0+(0 *_CS.TILE_HEIGHT), "map":"snes_gp_btn1", "tileset":"tilesSP1" , "layer":"SP1" },
			"SR"     :{ "flags":{"spriteIndex":undefined, "OFF":true }, "x":0+(13*_CS.TILE_WIDTH), "y":0+(0 *_CS.TILE_HEIGHT), "map":"snes_gp_btn1", "tileset":"tilesSP1" , "layer":"SP1" },
			"UP"     :{ "flags":{"spriteIndex":undefined, "OFF":true }, "x":4+(3 *_CS.TILE_WIDTH), "y":0+(2 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"DOWN"   :{ "flags":{"spriteIndex":undefined, "OFF":true }, "x":4+(3 *_CS.TILE_WIDTH), "y":0+(5 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"LEFT"   :{ "flags":{"spriteIndex":undefined, "OFF":true }, "x":0+(2 *_CS.TILE_WIDTH), "y":4+(3 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"RIGHT"  :{ "flags":{"spriteIndex":undefined, "OFF":true }, "x":0+(5 *_CS.TILE_WIDTH), "y":4+(3 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"SELECT" :{ "flags":{"spriteIndex":undefined, "OFF":true }, "x":0+(7 *_CS.TILE_WIDTH), "y":0+(4 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"START"  :{ "flags":{"spriteIndex":undefined, "OFF":true }, "x":2+(9 *_CS.TILE_WIDTH), "y":0+(4 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"B"      :{ "flags":{"spriteIndex":undefined, "OFF":true }, "x":4+(14*_CS.TILE_WIDTH), "y":0+(5 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"A"      :{ "flags":{"spriteIndex":undefined, "OFF":true }, "x":2+(16*_CS.TILE_WIDTH), "y":6+(3 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"Y"      :{ "flags":{"spriteIndex":undefined, "OFF":true }, "x":0+(13*_CS.TILE_WIDTH), "y":4+(3 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"X"      :{ "flags":{"spriteIndex":undefined, "OFF":true }, "x":4+(14*_CS.TILE_WIDTH), "y":0+(2 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
		};
		// Set the spriteIndex for each animation.
		let i=0; // Keeps the spriteIndex.
		for(let key in vars.gamepad){
			let data        = vars.gamepad[key] ;
			let active      = data.active       ;
			let anim        = vars.gamepad[key] ;
			// if(!active){ continue; }
			let flags       = anim.flags        ;
			flags.spriteIndex=i;
			i+=1;
		}

		// ANIMATION SET 1
		vars.animations = {
			"_data":{
				"stick_figure_animation_r0"   : { "active":true },
				"stick_figure_animation_r90"  : { "active":true },
				"stick_figure_animation_r180" : { "active":true },
				"stick_figure_animation_r270" : { "active":true },
				"stick_figure_animationFullRotation1" : { "active":true },
				"stick_figure_animationFullRotation2" : { "active":true },
				"stick_figure_animationFullRotation3" : { "active":true },
				"stick_figure_animationFullRotation4" : { "active":true },
			},
			// Cardinal (0,90,180,270)

			// Single rotation.
			"stick_figure_animation_r0":{
				"maps"        : [
					"stick_figure_f1","stick_figure_f2","stick_figure_f3","stick_figure_f4",
					"stick_figure_f5","stick_figure_f6","stick_figure_f7","stick_figure_f8"
				],
				"tileset"     : "tilesSP1",
				"layer"       : "SP1",
				"flags"       : {
					"ROT":0, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":undefined, "OFF":false,
					"colorSwaps":[
					],
				},
				"x"           : (0) * _CS['TILE_WIDTH'] ,
				"y"           : 15 * _CS['TILE_HEIGHT'],
				"nextFrameAt" : 5,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},
			"stick_figure_animation_r90":{
				"maps"        : [
					"stick_figure_f1","stick_figure_f2","stick_figure_f3","stick_figure_f4",
					"stick_figure_f5","stick_figure_f6","stick_figure_f7","stick_figure_f8"
				],
				"tileset"     : "tilesSP1",
				"layer"       : "SP1",
				"flags"       : {
					"ROT":90, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":undefined, "OFF":false,
					"colorSwaps":[
						["#FFB624","#FF0000"], // inside
						["#916DDA","#FFFFFF"] // outside
					],
				},
				"x"           : (4) * _CS['TILE_WIDTH'] ,
				"y"           : 15 * _CS['TILE_HEIGHT'],
				"nextFrameAt" : 5,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},
			"stick_figure_animation_r180":{
				"maps"        : [
					"stick_figure_f1","stick_figure_f2","stick_figure_f3","stick_figure_f4",
					"stick_figure_f5","stick_figure_f6","stick_figure_f7","stick_figure_f8"
				],
				"tileset"     : "tilesSP1",
				"layer"       : "SP1",
				"flags"       : {
					"ROT":180, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":undefined, "OFF":false,
					"colorSwaps":[
					],
				},
				"x"           : (9) * _CS['TILE_WIDTH'] ,
				"y"           : 15 * _CS['TILE_HEIGHT'],
				"nextFrameAt" : 5,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},
			"stick_figure_animation_r270":{
				"maps"        : [
					"stick_figure_f1","stick_figure_f2","stick_figure_f3","stick_figure_f4",
					"stick_figure_f5","stick_figure_f6","stick_figure_f7","stick_figure_f8"
				],
				"tileset"     : "tilesSP1",
				"layer"       : "SP1",
				"flags"       : {
					"ROT":270, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":undefined, "OFF":false,
					"colorSwaps":[
					],
				},
				"x"           : (14) * _CS['TILE_WIDTH'] ,
				"y"           : 15 * _CS['TILE_HEIGHT'],
				"nextFrameAt" : 5,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},

			// Continuous rotation.
			"stick_figure_animationFullRotation1":{
				"maps"        : [
					"stick_figure_f1","stick_figure_f2","stick_figure_f3","stick_figure_f4",
					"stick_figure_f5","stick_figure_f6","stick_figure_f7","stick_figure_f8"
				],
				"tileset"     : "tilesSP1",
				"layer"       : "SP1",
				"flags"       : {
					"ROT":0, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":undefined, "OFF":false,
					"colorSwaps":[
						// ["#916DDA", "#000000"], // Outline (purple to )
						// ["#FFB624", "#FFFFFF"]  // Inside (orange to )

						["#916DDA", "#FFFFFF"], // Outline (purple to )
						["#FFB624", "#000000"]  // Inside (orange to )
					],
				},
				"x"           : (19) * _CS['TILE_WIDTH'] ,
				"y"           : 15 * _CS['TILE_HEIGHT'],
				"nextFrameAt" : 5,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},
			"stick_figure_animationFullRotation2":{
				"maps"        : [
					"stick_figure_f1","stick_figure_f2","stick_figure_f3","stick_figure_f4",
					"stick_figure_f5","stick_figure_f6","stick_figure_f7","stick_figure_f8"
				],
				"tileset"     : "tilesSP1",
				"layer"       : "SP1",
				"flags"       : {
					"ROT":0, "FLIP_X":true, "FLIP_Y":false, "spriteIndex":undefined, "OFF":false,
					"colorSwaps":[
						["#916DDA", "#FFB624"], // Outline (purple to )
						["#FFB624", "#916DDA"]  // Inside (orange to )
					],
				},
				"x"           : (19) * _CS['TILE_WIDTH'] ,
				"y"           : 15 * _CS['TILE_HEIGHT'],
				"nextFrameAt" : 5,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},
			"stick_figure_animationFullRotation3":{
				"maps"        : [
					"stick_figure_f1","stick_figure_f2","stick_figure_f3","stick_figure_f4",
					"stick_figure_f5","stick_figure_f6","stick_figure_f7","stick_figure_f8"
				],
				"tileset"     : "tilesSP1",
				"layer"       : "SP1",
				"flags"       : {
					"ROT":0, "FLIP_X":false, "FLIP_Y":true, "spriteIndex":undefined, "OFF":false,
					"colorSwaps":[
						["#916DDA", "#FFFFFF"], // Outline (purple to )
						["#FFB624", "#0000FF"]  // Inside (orange to )
					],
				},
				"x"           : (19) * _CS['TILE_WIDTH'] ,
				"y"           : 15 * _CS['TILE_HEIGHT'],
				"nextFrameAt" : 5,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},
			"stick_figure_animationFullRotation4":{
				"maps"        : [
					"stick_figure_f1","stick_figure_f2","stick_figure_f3","stick_figure_f4",
					"stick_figure_f5","stick_figure_f6","stick_figure_f7","stick_figure_f8"
				],
				"tileset"     : "tilesSP1",
				"layer"       : "SP1",
				"flags"       : {
					"ROT":0, "FLIP_X":true, "FLIP_Y":true, "spriteIndex":undefined, "OFF":false,
					"colorSwaps":[
						["#916DDA", "#00FF00"], // Outline (purple to )
						["#FFB624", "#FF0000"]  // Inside (orange to )
					],
				},
				"x"           : (19) * _CS['TILE_WIDTH'] ,
				"y"           : 15 * _CS['TILE_HEIGHT'],
				"nextFrameAt" : 5,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},

		};

		// Set the spriteIndex for each animation.
		for(let key in vars.animations._data){
			let data        = vars.animations._data[key] ;
			let active      = data.active                ;
			let anim        = vars.animations[key]       ;
			if(!active){ continue; }
			let flags       = anim.flags       ;
			flags.spriteIndex=i;
			i+=1;
		}

		// Set the x and y for each animation.
		vars.animations.stick_figure_animation_r0           .x=(4+(6*0))*_CS.TILE_WIDTH; vars.animations.stick_figure_animation_r0           .y=(0)*_CS.TILE_HEIGHT;
		vars.animations.stick_figure_animation_r90          .x=(4+(6*1))*_CS.TILE_WIDTH; vars.animations.stick_figure_animation_r90          .y=(0)*_CS.TILE_HEIGHT;
		vars.animations.stick_figure_animation_r180         .x=(4+(6*2))*_CS.TILE_WIDTH; vars.animations.stick_figure_animation_r180         .y=(0)*_CS.TILE_HEIGHT;
		vars.animations.stick_figure_animation_r270         .x=(4+(6*3))*_CS.TILE_WIDTH; vars.animations.stick_figure_animation_r270         .y=(0)*_CS.TILE_HEIGHT;
		vars.animations.stick_figure_animationFullRotation1 .x=(4+(6*0))*_CS.TILE_WIDTH; vars.animations.stick_figure_animationFullRotation1 .y=(6)*_CS.TILE_HEIGHT;
		vars.animations.stick_figure_animationFullRotation2 .x=(4+(6*1))*_CS.TILE_WIDTH; vars.animations.stick_figure_animationFullRotation2 .y=(6)*_CS.TILE_HEIGHT;
		vars.animations.stick_figure_animationFullRotation3 .x=(4+(6*2))*_CS.TILE_WIDTH; vars.animations.stick_figure_animationFullRotation3 .y=(6)*_CS.TILE_HEIGHT;
		vars.animations.stick_figure_animationFullRotation4 .x=(4+(6*3))*_CS.TILE_WIDTH; vars.animations.stick_figure_animationFullRotation4 .y=(6)*_CS.TILE_HEIGHT;

		// ANIMATION SET 2
		vars.animations2 = {
			"_data":{
				"stick_figure_animation_running"   : { "active":true },
			},

			"stick_figure_animation_running":{
				"maps"        : [
					"stick_figure_f1","stick_figure_f2","stick_figure_f3","stick_figure_f4",
					"stick_figure_f5","stick_figure_f6","stick_figure_f7","stick_figure_f8"
				],
				"tileset"     : "tilesSP1",
				"layer"       : "SP1",
				"flags"       : {
					"ROT":0, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":undefined, "OFF":false,
					"colorSwaps":[
						// ["#916DDA", "#00FF00"], // Outline (purple to )
						// ["#FFB624", "#FF0000"]  // Inside (orange to )
					],
				},
				"x"           : (4) * _CS['TILE_WIDTH']  ,
				"y"           : 26  * _CS['TILE_HEIGHT'] ,
				// "xDir"        : 1 * _CS['TILE_WIDTH']   ,
				"xDir"        : 8   ,
				"nextFrameAt" : 4,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},
		};
		for(let key in vars.animations2._data){
			let data        = vars.animations2._data[key] ;
			let active      = data.active                ;
			let anim        = vars.animations2[key]       ;
			if(!active){ continue; }
			let flags       = anim.flags       ;
			flags.spriteIndex=i;
			i+=1;
		}

		console.log("last i:", i);
		vars.END = false;
	},
	//
	init : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Draw Tile: x, y, tileset  , tileindex , layer  , flags
		_CGF.DrawTile(0, 0, "tilesBG1", 1        , "BG1"  , { "colorSwaps":[ ["#48DAFF", "#FFFF24"] ] }   );
		_CGF.DrawTile(1, 0, "tilesBG1", 2        , "BG1"  , {}   );
		_CGF.DrawTile(2, 0, "tilesBG1", 3        , "BG1"  , {}   );
		_CGF.DrawTile(0, 1, "tilesTX1", 1+63     , "BG1"  , {}   );
		_CGF.DrawTile(1, 1, "tilesTX1", 2+63     , "BG1"  , {}   );
		_CGF.DrawTile(2, 1, "tilesTX1", 3+63     , "BG1"  , {}   );

		_CGF.DrawTile(0, 3, "tilesBG1", 1        , "BG2"  , {}   );
		_CGF.DrawTile(1, 3, "tilesBG1", 2        , "BG2"  , {}   );
		_CGF.DrawTile(2, 3, "tilesBG1", 3        , "BG2"  , {}   );
		_CGF.DrawTile(0, 4, "tilesTX1", 1+63     , "BG2"  , {}   );
		_CGF.DrawTile(1, 4, "tilesTX1", 2+63     , "BG2"  , {}   );
		_CGF.DrawTile(2, 4, "tilesTX1", 3+63     , "BG2"  , {}   );

		_CGF.DrawTile(0, 6, "tilesBG1", 1        , "TEXT" , {}   );
		_CGF.DrawTile(1, 6, "tilesBG1", 2        , "TEXT" , {}   );
		_CGF.DrawTile(2, 6, "tilesBG1", 3        , "TEXT" , {}   );
		_CGF.DrawTile(0, 7, "tilesTX1", 1+63     , "TEXT" , {}   );
		_CGF.DrawTile(1, 7, "tilesTX1", 2+63     , "TEXT" , {}   );
		_CGF.DrawTile(2, 7, "tilesTX1", 3+63     , "TEXT" , {}   );

		// Tile Fill: x, y , w, h, tileset   , tileindex, layer , flags
		_CGF.TileFill(0, 9 , 3, 2, "tilesBG1", 1        , "BG1" , {}   );
		_CGF.TileFill(0, 12, 3, 2, "tilesBG1", 2        , "BG2" , {}   );
		_CGF.TileFill(0, 15, 3, 2, "tilesBG1", 3        , "TEXT", {}   );

		// Map Fill: sx, sy, nw, nh, tileset   , tilemap           , layer , flags
		_CGF.MapFill(28, 0 , 4 , 2 , "tilesBG1", "main_bg_pattern2", "BG1" , {}   );
		_CGF.MapFill(28, 3 , 4 , 2 , "tilesBG1", "main_bg_pattern2", "BG2" , { "colorSwaps":[ ["#00B624", "#00B6FF"] ] }   );
		_CGF.MapFill(28, 6 , 4 , 2 , "tilesBG1", "main_bg_pattern2", "TEXT", {}   );

		// Draw Map: x,  y , tileset   , tilemap           , layer  , flags
		_CGF.DrawMap(0,  18, "tilesBG1", "main_bg_pattern2", "BG1"  , {}   );
		_CGF.DrawMap(0,  21, "tilesBG1", "main_bg_pattern2", "BG2"  , {}   );
		_CGF.DrawMap(0,  24, "tilesBG1", "main_bg_pattern2", "TEXT" , {}   );

		// Print:  x, y , string                 , tileset   , tilemap           , layer , flags
		_CGF.Print(4, 12, "FONT TEST 1 ABCD1234.", "tilesTX1", "font_black_basic", "TEXT", { }  );
		_CGF.Print(4, 13, "FONT TEST 2 ABCD1234.", "tilesTX1", "font_white_basic", "TEXT", { }  );
		_CGF.Print(4, 14, "FONT TEST 3 ABCD1234.", "tilesTX1", "font_white", "TEXT", { }  );
		_CGF.Print(4, 15, "FONT TEST 4 ABCD1234.", "tilesTX1", "font_black", "TEXT", { }  );

		// Print_multiFont: ( {x, y, text, font, maps, tileset, layer, flags } )
		_CGF.Print_multiFont(
			{
				"x"       : 4,
				"y"       : 16,
				"text"    : "FONT TEST 5 ABCD1234." ,
				"font"    : "010101010101010101010".split("").map(function(d){ return parseInt(d,10); }) ,
				"maps"    : [ "font_black_basic", "font_white_basic" ],
				"tileset" : "tilesTX1",
				"layer"   : "TEXT",
				"flags"   : { }
			},
		);
		_CGF.Print_multiFont(
			{
				"x"       : 4,
				"y"       : 17,
				"text"    : "FONT TEST 6 ABCD1234." ,
				"font"    : "010101010101010101010".split("").map(function(d){ return parseInt(d,10); }) ,
				"maps"    : [ "font_black", "font_white" ],
				"tileset" : "tilesTX1",
				"layer"   : "TEXT",
				"flags"   : {}
			},
		);
		// _CGF.TileFill(4, 13, 21, 1, "tilesBG1", 2        , "BG1" , {}   );
		_CGF.TileFill(4, 16, 21, 1, "tilesBG1", 3        , "BG2" , {}   );

		_CGF.TileFill(4, 0, 23, 5, "tilesBG1", 2        , "BG2" , {}   );
		_CGF.TileFill(4, 6, 23, 5, "tilesBG1", 3        , "BG1" , {}   );

		// (SPRITES) Gamepad tests.
		// _CGF.DrawMap(4*_CS.TILE_WIDTH,  16*_CS.TILE_HEIGHT, "tilesSP1", "snes_gp", "SP1"  , {"spriteIndex":20}   );

		// snes_gp_btn1
		// snes_gp_btn2

		// setTimeout(function(){
		// 	vars.END = true;
		// }, 5000);
	},
	//
	main : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Don't run if we are done.
		if(vars.END){ return; }

		// Start of this game state?
		if(!vars.init){ vars.init=true; gs.init(); return; }

		// Run.
		if(vars.init){
			gs.doAnimations_1( vars.animations );
			gs.doAnimations_2( vars.animations2 );
			gs.doGamepad_1( vars.gamepad );
		}
	},

	// *** SUPPORT FUNCTIONS ***

	doGamepad_1 : function( obj ){
		let gs     = this;
		let vars   = gs.vars;
		let consts = gs.consts;

		let btnKey;

		if(obj.gamepad.flags.OFF){
			btnKey="gamepad";
			obj[btnKey].flags.OFF=false;
			obj[btnKey].onscreen=true;
			_CGF.DrawMap( obj[btnKey].x, obj[btnKey].y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags );
		}

		let gp_x = obj.gamepad.x;
		let gp_y = obj.gamepad.y;

		if( game.chkBtn("ANY"   , "btnPressed1") ){
			if( game.chkBtn("BTN_B"     , "btnPressed1") ){ btnKey="B"     ; obj[btnKey].flags.OFF=false; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_Y"     , "btnPressed1") ){ btnKey="Y"     ; obj[btnKey].flags.OFF=false; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_START" , "btnPressed1") ){ btnKey="START" ; obj[btnKey].flags.OFF=false; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_SELECT", "btnPressed1") ){ btnKey="SELECT"; obj[btnKey].flags.OFF=false; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_UP"    , "btnPressed1") ){ btnKey="UP"    ; obj[btnKey].flags.OFF=false; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_DOWN"  , "btnPressed1") ){ btnKey="DOWN"  ; obj[btnKey].flags.OFF=false; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_LEFT"  , "btnPressed1") ){ btnKey="LEFT"  ; obj[btnKey].flags.OFF=false; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_RIGHT" , "btnPressed1") ){ btnKey="RIGHT" ; obj[btnKey].flags.OFF=false; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_A"     , "btnPressed1") ){ btnKey="A"     ; obj[btnKey].flags.OFF=false; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_X"     , "btnPressed1") ){ btnKey="X"     ; obj[btnKey].flags.OFF=false; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_SL"    , "btnPressed1") ){ btnKey="SL"    ; obj[btnKey].flags.OFF=false; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_SR"    , "btnPressed1") ){ btnKey="SR"    ; obj[btnKey].flags.OFF=false; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
		}
		if( game.chkBtn("ANY"   , "btnReleased1")){
			if( game.chkBtn("BTN_B"     , "btnReleased1") ){ btnKey="B"     ; obj[btnKey].flags.OFF=true; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_Y"     , "btnReleased1") ){ btnKey="Y"     ; obj[btnKey].flags.OFF=true; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_START" , "btnReleased1") ){ btnKey="START" ; obj[btnKey].flags.OFF=true; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_SELECT", "btnReleased1") ){ btnKey="SELECT"; obj[btnKey].flags.OFF=true; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_UP"    , "btnReleased1") ){ btnKey="UP"    ; obj[btnKey].flags.OFF=true; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_DOWN"  , "btnReleased1") ){ btnKey="DOWN"  ; obj[btnKey].flags.OFF=true; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_LEFT"  , "btnReleased1") ){ btnKey="LEFT"  ; obj[btnKey].flags.OFF=true; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_RIGHT" , "btnReleased1") ){ btnKey="RIGHT" ; obj[btnKey].flags.OFF=true; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_A"     , "btnReleased1") ){ btnKey="A"     ; obj[btnKey].flags.OFF=true; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_X"     , "btnReleased1") ){ btnKey="X"     ; obj[btnKey].flags.OFF=true; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_SL"    , "btnReleased1") ){ btnKey="SL"    ; obj[btnKey].flags.OFF=true; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
			if( game.chkBtn("BTN_SR"    , "btnReleased1") ){ btnKey="SR"    ; obj[btnKey].flags.OFF=true; _CGF.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
		}
	},
	//
	doAnimations_1 : function( animObj ){
		let gs     = this;
		let vars   = gs.vars;
		let consts = gs.consts;

		for(let key in animObj._data){
			// Get a handle on the data and the animation.
			let data        = animObj._data[key] ;
			let active      = data.active                ;
			let anim        = animObj[key]       ;
			if(!active){ continue; }

			let maps        = anim.maps        ;
			let nextFrameAt = anim.nextFrameAt ;
			let curFrameCnt = anim.curFrameCnt ;
			let curFrame    = anim.curFrame    ;
			let tileset     = anim.tileset     ;
			let layer       = anim.layer       ;
			let flags       = anim.flags       ;
			let x           = anim.x           ;
			let y           = anim.y           ;
			let map     = maps[curFrame];
			let realMap = core.GRAPHICS.ASSETS.tilemaps[tileset][map];

			// Is there a change required for the animation?
			if(curFrameCnt >= nextFrameAt){
				// Reset the curFrameCnt.
				anim.curFrameCnt=0;

				let rotatingAnimationKeys = [
					"stick_figure_animationFullRotation1",
					"stick_figure_animationFullRotation2",
					"stick_figure_animationFullRotation3",
					"stick_figure_animationFullRotation4",
				];
				if(rotatingAnimationKeys.indexOf(key) != -1){
					if(flags.ROT < 360){ flags.ROT +=20  ; }
					else               { flags.ROT = 0  ; }
				}

				// Draw.
				_CGF.DrawMap(x, y, tileset, map, layer, flags);

				// Update curFrame.
				if(curFrame<maps.length-1){ anim.curFrame+=1; }
				else                      { anim.curFrame =0; }
			}
			else{ anim.curFrameCnt +=1; }

		}

	},
	doAnimations_2 : function( animObj ){
		let gs     = this;
		let vars   = gs.vars;
		let consts = gs.consts;


		for(let key in animObj._data){
			// Get a handle on the data and the animation.
			let data        = animObj._data[key] ;
			let active      = data.active        ;
			let anim        = animObj[key]       ;
			if(!active){ continue; }

			let maps        = anim.maps        ;
			let nextFrameAt = anim.nextFrameAt ;
			let curFrameCnt = anim.curFrameCnt ;
			let curFrame    = anim.curFrame    ;
			let tileset     = anim.tileset     ;
			let layer       = anim.layer       ;
			let flags       = anim.flags       ;
			let x           = anim.x           ;
			let y           = anim.y           ;
			let map     = maps[curFrame];
			let realMap = core.GRAPHICS.ASSETS.tilemaps[tileset][map];

			// Is there a change required for the animation?
			if(curFrameCnt >= nextFrameAt){
				// Reset the curFrameCnt.
				anim.curFrameCnt=0;

				// Moving right.
				if     ( Math.sign(anim.xDir) == 1 ){
					if(anim.x<144){ anim.x+=anim.xDir; }
					else{ anim.xDir *= -1; anim.flags.FLIP_X = true;  }
				}
				// Moving left.
				else if( Math.sign(anim.xDir) == -1 ){
					if(anim.x>32){ anim.x+=anim.xDir; }
					else{ anim.xDir *= -1; anim.flags.FLIP_X = false;  }
				}

				// Draw.
				_CGF.DrawMap(anim.x, anim.y, tileset, map, layer, flags);

				// Update curFrame.
				if(curFrame<maps.length-1){ anim.curFrame+=1; }
				else                      { anim.curFrame =0; }
			}
			else{ anim.curFrameCnt +=1; }

		}

	},
	//
	EXAMPLE : function( VALUE ){
		let gs     = this;
		let vars   = gs.vars;
		let consts = gs.consts;
	},
};