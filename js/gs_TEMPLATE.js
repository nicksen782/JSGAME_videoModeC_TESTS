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

		vars.gamepad = {
			// Absolute position.
			"gamepad":{ "flags":{"spriteIndex":20, "OFF":true }, "x":0+(4 *_CS.TILE_WIDTH), "y":0+(16*_CS.TILE_HEIGHT), "map":"snes_gp"     , "tileset":"tilesSP1" , "layer":"SP1" },
			// Position relative to the gamepad x,y.
			"SL"     :{ "flags":{"spriteIndex":21, "OFF":true }, "x":0+(2 *_CS.TILE_WIDTH), "y":0+(0 *_CS.TILE_HEIGHT), "map":"snes_gp_btn1", "tileset":"tilesSP1" , "layer":"SP1" },
			"SR"     :{ "flags":{"spriteIndex":22, "OFF":true }, "x":0+(13*_CS.TILE_WIDTH), "y":0+(0 *_CS.TILE_HEIGHT), "map":"snes_gp_btn1", "tileset":"tilesSP1" , "layer":"SP1" },
			"UP"     :{ "flags":{"spriteIndex":23, "OFF":true }, "x":4+(3 *_CS.TILE_WIDTH), "y":0+(2 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"DOWN"   :{ "flags":{"spriteIndex":24, "OFF":true }, "x":4+(3 *_CS.TILE_WIDTH), "y":0+(5 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"LEFT"   :{ "flags":{"spriteIndex":25, "OFF":true }, "x":0+(2 *_CS.TILE_WIDTH), "y":4+(3 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"RIGHT"  :{ "flags":{"spriteIndex":26, "OFF":true }, "x":0+(5 *_CS.TILE_WIDTH), "y":4+(3 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"SELECT" :{ "flags":{"spriteIndex":27, "OFF":true }, "x":0+(7 *_CS.TILE_WIDTH), "y":0+(4 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"START"  :{ "flags":{"spriteIndex":28, "OFF":true }, "x":2+(9 *_CS.TILE_WIDTH), "y":0+(4 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"B"      :{ "flags":{"spriteIndex":29, "OFF":true }, "x":4+(14*_CS.TILE_WIDTH), "y":0+(5 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"A"      :{ "flags":{"spriteIndex":30, "OFF":true }, "x":2+(16*_CS.TILE_WIDTH), "y":6+(3 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"Y"      :{ "flags":{"spriteIndex":31, "OFF":true }, "x":0+(13*_CS.TILE_WIDTH), "y":4+(3 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
			"X"      :{ "flags":{"spriteIndex":32, "OFF":true }, "x":4+(14*_CS.TILE_WIDTH), "y":0+(2 *_CS.TILE_HEIGHT), "map":"snes_gp_btn2", "tileset":"tilesSP1" , "layer":"SP1" },
		};

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
					"ROT":0, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":8, "OFF":false,
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
					"ROT":90, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":8, "OFF":false,
					"colorSwaps":[
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
					"ROT":180, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":8, "OFF":false,
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
					"ROT":0, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":8, "OFF":false,
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
					"ROT":0, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":8, "OFF":false,
					"colorSwaps":[
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
					"ROT":0, "FLIP_X":true, "FLIP_Y":false, "spriteIndex":8, "OFF":false,
					"colorSwaps":[
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
					"ROT":0, "FLIP_X":false, "FLIP_Y":true, "spriteIndex":8, "OFF":false,
					"colorSwaps":[
						["#916DDA", "#00916D"]
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
					"ROT":0, "FLIP_X":true, "FLIP_Y":true, "spriteIndex":8, "OFF":false,
					"colorSwaps":[
						["#FFB624", "#00B6FF"]
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
		let i=0;
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
		vars.animations.stick_figure_animation_r0           .x=(4+(5*0))*_CS.TILE_WIDTH; vars.animations.stick_figure_animation_r0           .y=(0)*_CS.TILE_HEIGHT;
		vars.animations.stick_figure_animation_r90          .x=(4+(5*1))*_CS.TILE_WIDTH; vars.animations.stick_figure_animation_r90          .y=(0)*_CS.TILE_HEIGHT;
		vars.animations.stick_figure_animation_r180         .x=(4+(5*2))*_CS.TILE_WIDTH; vars.animations.stick_figure_animation_r180         .y=(0)*_CS.TILE_HEIGHT;
		vars.animations.stick_figure_animation_r270         .x=(4+(5*3))*_CS.TILE_WIDTH; vars.animations.stick_figure_animation_r270         .y=(0)*_CS.TILE_HEIGHT;
		vars.animations.stick_figure_animationFullRotation1 .x=(4+(5*0))*_CS.TILE_WIDTH; vars.animations.stick_figure_animationFullRotation1 .y=(5)*_CS.TILE_HEIGHT;
		vars.animations.stick_figure_animationFullRotation2 .x=(4+(5*1))*_CS.TILE_WIDTH; vars.animations.stick_figure_animationFullRotation2 .y=(5)*_CS.TILE_HEIGHT;
		vars.animations.stick_figure_animationFullRotation3 .x=(4+(5*2))*_CS.TILE_WIDTH; vars.animations.stick_figure_animationFullRotation3 .y=(5)*_CS.TILE_HEIGHT;
		vars.animations.stick_figure_animationFullRotation4 .x=(4+(5*3))*_CS.TILE_WIDTH; vars.animations.stick_figure_animationFullRotation4 .y=(5)*_CS.TILE_HEIGHT;

		//

		vars.END = false;
	},
	//
	init : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Draw Tile: x, y, tileset  , tileindex , layer  , flags
		_CGF.DrawTile(0, 0, "tilesBG1", 1        , "BG1"  , {}   );
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

		// Print:  x, y, string, tileset   , tilemap     , layer , flags
		_CGF.Print(4, 10, "TEXT WITH FONT_WHITE.", "tilesTX1", "font_white", "TEXT", { "ROT":24, "colorSwaps":[ ["#DADAB6", "#00B6FF"] ] }   );
		_CGF.Print(4, 11, "TEXT WITH FONT_BLACK.", "tilesTX1", "font_black", "TEXT", { "FLIP_X":true, "FLIP_Y":true }   );
		// _CGF.TileFill(4, 10, 21, 1, "tilesBG1", 2        , "BG1" , {}   );
		_CGF.TileFill(4, 11, 21, 1, "tilesBG1", 3        , "BG2" , {}   );

		// Print_multiFont: ( {x, y, text, font, maps, tileset, layer, flags } )
		_CGF.Print_multiFont(
			{
				"x"       : 4,
				"y"       : 13,
				"text"    : "I use multiple fonts!" ,
				"font"    : "111111111101010101010".split("").map(function(d){ return parseInt(d,10); }) ,
				"maps"    : [ "font_black", "font_white" ],
				"tileset" : "tilesTX1",
				"layer"   : "TEXT",
				"flags"   : { "ROT":180 }
			},
		);
		_CGF.Print_multiFont(
			{
				"x"       : 4,
				"y"       : 14,
				"text"    : "I use multiple fonts!" ,
				"font"    : "010101010101010101010".split("").map(function(d){ return parseInt(d,10); }) ,
				"maps"    : [ "font_black", "font_white" ],
				"tileset" : "tilesTX1",
				"layer"   : "TEXT",
				"flags"   : {}
			},
		);
		// _CGF.TileFill(4, 13, 21, 1, "tilesBG1", 2        , "BG1" , {}   );
		_CGF.TileFill(4, 14, 21, 1, "tilesBG1", 3        , "BG2" , {}   );

		// (SPRITES) Gamepad tests.
		// _CGF.DrawMap(4*_CS.TILE_WIDTH,  16*_CS.TILE_HEIGHT, "tilesSP1", "snes_gp", "SP1"  , {"spriteIndex":20}   );

		// snes_gp_btn1
		// snes_gp_btn2
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
	//
	EXAMPLE : function( VALUE ){
		let gs     = this;
		let vars   = gs.vars;
		let consts = gs.consts;
	},
};