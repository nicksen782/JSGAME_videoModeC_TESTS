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
		// _CGF.clearSprites();
		_CGF.ClearVram();

		// cursor1_f1
		// cursor1_f2
		// cursor1_f3
		// testArrow1_r
		// testArrow2_r
		// testArrow1_r_3x4
		// testArrow2_r_3x4
		// testArrow3_r_3x4
		// testArrow3_u_4x3
		// stick_figure_f1
		// stick_figure_f2
		// stick_figure_f3
		// stick_figure_f4
		// stick_figure_f5
		// stick_figure_f6
		// stick_figure_f7
		// stick_figure_f8

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
		_CGF.MapFill(28, 3 , 4 , 2 , "tilesBG1", "main_bg_pattern2", "BG2" , {}   );
		_CGF.MapFill(28, 6 , 4 , 2 , "tilesBG1", "main_bg_pattern2", "TEXT", {}   );


		// Draw Map: x,  y , tileset   , tilemap           , layer  , flags
		_CGF.DrawMap(0,  18, "tilesBG1", "main_bg_pattern2", "BG1"  , {}   );
		_CGF.DrawMap(0,  21, "tilesBG1", "main_bg_pattern2", "BG2"  , {}   );
		_CGF.DrawMap(0,  24, "tilesBG1", "main_bg_pattern2", "TEXT" , {}   );

		return;

		// core.GRAPHICS.FUNCS.DrawMap_customDimensions = function(x, y, tileset, tilemap  , layer, flags){}
		// core.GRAPHICS.FUNCS.Print                    = function(tileset, fontmap, layer, flags, string){}
		// core.GRAPHICS.FUNCS.Print_multiFont          = function(data){}

		// Print tests.
		//        (x, y , string                        , map         , tileset   , layer , flags)
		_CGF.Print(0, 12, "I'm written with font_black.", "font_black", "tilesTX1", "TEXT", {}   );
		_CGF.Print(0, 13, "I'm written with font_white.", "font_white", "tilesTX1", "TEXT", {}   );

		// Multi-font print tests.
		// (data)
		_CGF.Print_multiFont(
			{
				"x"       : 0,
				"y"       : 15,
				"text"    : "I use multiple fonts!" ,
				"font"    : "010101010101010101010".split("").map(function(d){ return parseInt(d,10); }) ,
				"maps"    : [ "font_black", "font_white" ],
				"tileset" : "tilesTX1",
				"layer"   : "TEXT",
				"flags"   : {}
			},
		);

		// Draw a tile map over a region.
		//                           (sx, sy, nw, nh, map               , tileset   , layer, flags)
		_CGF.DrawMap_customDimensions(0 ,17 ,14 , 4 , "main_bg_pattern2", "tilesBG1", "BG1", {}   ); // tilesBG1 to BG1
		_CGF.Print(0 ,17, "TEXT OVER BG1", "font_white", "tilesTX1", "TEXT", {});
		_CGF.Print(0 ,19, "TEXT OVER BG1", "font_black", "tilesTX1", "TEXT", {});
		_CGF.DrawMap_customDimensions(15,17,14  , 4 , "main_bg_pattern2", "tilesBG1", "BG2", {}   ); // tilesBG1 to BG2
		_CGF.Print(15,17, "TEXT OVER BG2", "font_white", "tilesTX1", "TEXT", {});
		_CGF.Print(15,19, "TEXT OVER BG2", "font_black", "tilesTX1", "TEXT", {});
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
			gs.doAnimations();
		}
	},

	// *** SUPPORT FUNCTIONS ***

	//
	doAnimations : function( ){
		let gs     = this;
		let vars   = gs.vars;
		let consts = gs.consts;

		for(let key in vars.animations._data){
			// Get a handle on the data and the animation.
			let data        = vars.animations._data[key] ;
			let active      = data.active                ;
			let anim        = vars.animations[key]       ;
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