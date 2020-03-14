// ====================================
// ==== FILE START: gs_TEMPLATE.js ====
// ====================================

'use strict';

/*
Tests:

	MENU:
		clearAllCanvases
		ClearOUTPUT
		ClearSprites
		ClearVram
		<Redraw screen>

	SCREEN #1 :  Drawing and filling with tiles/maps.
		X Print

		X DrawTile
		X TileFill

		X DrawMap
		X MapFill

	SCREEN #2 : Drawing fonts.
		X Print

	SCREEN #3: Fade effects.
		X chainFade
		X setFade

	SCREEN #4: Gamepad tests and Sprite animation tests.
		adjustOutputOffsets - Shake the screen.
		"Sparkle-pause" - Like Nibbles and Gorillas from QBASIC.
		X On-screen gamepad to respond to gamepad inputs.
		X Sprites with different flags.
		X Moving sprites.
		X Sprite controlled by the gamepad.
*/

// *** TESTS2 GAMESTATE FUNCTION ***
// GAMESTATE TESTS2
game.gs.TESTS2 = {
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

		_CGFU.ClearSprites();
		_CGFU.ClearVram();

		vars.subMain      = "SCREEN2";
		// vars.subMain_prev = "SCREEN1";
		gs.subMains.SCREEN1.inited=false;
		gs.subMains.SCREEN2.inited=false;
		gs.subMains.SCREEN3.inited=false;
		gs.subMains.SCREEN4.inited=false;

		vars.END = false;
	},
	init : function(){
		let gs    = this;
		let vars  = gs.vars;
	},
	main : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Don't run if we are done.
		if(vars.END){ return; }

		// Start of this game state?
		if(!vars.init){ vars.init=true; gs.init(); return; }

		// Run.
		if(vars.init){

			if     ( game.chkBtn("BTN_START" , "btnPressed1") ){ vars.END=true; game.setGamestate1("TESTS1" , true); return; }
			else if( game.chkBtn("BTN_SELECT", "btnPressed1") ){ vars.END=true; game.setGamestate1("TESTS2" , true); return; }

			// Run the code for the correct screen.
			if(["SCREEN1","SCREEN2","SCREEN3","SCREEN4","SCREEN5"].indexOf(vars.subMain)!= -1){ gs.subMains[vars.subMain].main(); }
			else                                                                              { console.log("huh? default??"); }

			// switch(vars.subMain){
			// // 	// case "MENU"    : { break; }
			// 	case "SCREEN1" : { gs.subMains[vars.subMain].main(); break; }
			// 	case "SCREEN2" : { gs.subMains[vars.subMain].main(); break; }
			// 	case "SCREEN3" : { gs.subMains[vars.subMain].main(); break; }
			// 	case "SCREEN4" : { gs.subMains[vars.subMain].main(); break; }
			// 	case "SCREEN5" : { gs.subMains[vars.subMain].main(); break; }
			// 	default : { console.log("huh? default??"); break; }
			// }
		}
	},

	subMains : {
		// "MENU"    : {
		// 	inited:false,
		// 	init : function(){
		// 		let gs     = game.gs[game.gamestate];
		// 		let vars   = gs.vars;
		// 		let consts = gs.consts;
		// 		gs.subMains[vars.subMain].inited=true;
		// 	},
		// 	main : function(){
		// 		let gs     = game.gs[game.gamestate];
		// 		let vars   = gs.vars;
		// 		let consts = gs.consts;
		// 	},
		// },
		"SCREEN1" : {
			inited:false,
			init : function(){
				let gs     = game.gs[game.gamestate];
				let vars  = gs.vars;
				gs.subMains[vars.subMain].inited=true;

				_CGFU.ClearSprites();
				_CGFU.ClearVram();

				let y=0;

				// Background color.
				_CGFU.TileFill(0, y, 32, 32,       "tilesBG1", 6      , "BG1" , {} );

				// TITLE BAR.
				_CGFU.Print   (0, y  , "SCREEN #1: Draw/Fill tile, map", "tilesTX1", "font1", "TEXT", {} );
				_CGFU.TileFill(0, y  , 32, 1,       "tilesBG1", 2      , "BG1" , {} );
				y+=1;
				y+=1;

				// DrawTile:
				_CGFU.Print   (0, y, "DrawTile:", "tilesTX1", "font1", "TEXT", {} );
				_CGFU.TileFill(0, y  , 32, 1,       "tilesBG1", 2      , "BG1" , {} );
				y+=2;
				_CGFU.DrawTile(0, y,              "tilesBG1", 0      , "BG1" , {} );
				_CGFU.DrawTile(2, y,              "tilesBG1", 1      , "BG1" , {} );
				_CGFU.DrawTile(4, y,              "tilesBG1", 2      , "BG1" , {} );
				_CGFU.DrawTile(6, y,              "tilesBG1", 3      , "BG1" , {} );
				_CGFU.DrawTile(8, y,              "tilesBG1", 4      , "BG1" , {} );
				_CGFU.DrawTile(10, y,             "tilesBG1", 5      , "BG1" , {} );
				_CGFU.DrawTile(12, y,             "tilesBG1", 6      , "BG1" , {} );
				_CGFU.DrawTile(14, y,             "tilesBG1", 1      , "BG1" , { "colorSwaps":[ ["#48DAFF", "#FFFF24"] ] }   );

				// TileFill:
				y+=2;
				_CGFU.Print   (0 , y , "TileFill:", "tilesTX1", "font1", "TEXT", {} );
				_CGFU.TileFill(0, y  , 32, 1,       "tilesBG1", 2      , "BG1" , {} );
				y+=2;
				_CGFU.TileFill(0 , y , 5, 2,        "tilesBG1", 0      , "BG1" , {} );
				_CGFU.TileFill(6 , y , 5, 2,        "tilesBG1", 1      , "BG1" , {} );
				_CGFU.TileFill(12, y , 5, 2,        "tilesBG1", 2      , "BG1" , {} );
				_CGFU.TileFill(18, y , 5, 2,        "tilesBG1", 3      , "BG1" , {} );
				y+=3;

				// DrawMap:
				_CGFU.Print  (0,  y, "DrawMap:", "tilesTX1", "font1", "TEXT", {} );
				_CGFU.TileFill(0, y  , 32, 1,       "tilesBG1", 2      , "BG1" , {} );
				y+=2;
				_CGFU.DrawMap(0,  y, "tilesBG1", "main_bg_pattern1" , "BG1" , {} );
				_CGFU.DrawMap(3,  y, "tilesBG1", "main_bg_pattern2" , "BG1" , {} );
				_CGFU.DrawMap(6,  y, "tilesSP1", "stick_figure2_f1" , "BG1" , {} );
				_CGFU.DrawMap(11*_CS.TILE_WIDTH,  y*_CS.TILE_HEIGHT, "tilesSP1", "stick_figure2_f1" , "SP1" , { spriteIndex:0} );

				// MapFill:
				y+=4;
				_CGFU.Print  (0, y, "MapFill:", "tilesTX1", "font1"           , "TEXT", {} );
				_CGFU.TileFill(0, y  , 32, 1,       "tilesBG1", 2      , "BG1" , {} );
				y+=2;
				_CGFU.MapFill(0, y, 10 , 4    , "tilesBG1", "main_bg_pattern1", "BG1" , {} );
				_CGFU.MapFill(11, y, 10 , 4    , "tilesBG1", "main_bg_pattern2", "BG1" , {} );

				y+=5;
				_CGFU.MapFill(0, y, 20 , 4    , "tilesSP1", "stick_figure2_f1", "BG1" , {} );

			},
			main : function(){
				let gs     = game.gs[game.gamestate];
				let vars   = gs.vars;
				let consts = gs.consts;

				if(!gs.subMains[vars.subMain].inited){ gs.subMains[vars.subMain].init(); }

				if( game.chkBtn("ANY"   , "btnPressed1")){
					if     ( game.chkBtn("BTN_SL"   , "btnPressed1") ){
						vars.subMain="SCREEN4";
						gs.subMains[vars.subMain].inited=false;
					}
					if     ( game.chkBtn("BTN_SR"   , "btnPressed1") ){
						vars.subMain="SCREEN2";
						gs.subMains[vars.subMain].inited=false;
					}
				}
			},
		},
		"SCREEN2" : {
			inited:false,
			init : function(){
				let gs     = game.gs[game.gamestate];
				let vars  = gs.vars;
				gs.subMains[vars.subMain].inited=true;

				_CGFU.ClearSprites();
				_CGFU.ClearVram();

				let y=0;

				// Background color.
				_CGFU.TileFill(0, y, 32, 32,       "tilesBG1", 6      , "BG1" , {} );

				// TITLE BAR.
				_CGFU.Print   (0, y, "SCREEN #2: Text print (fonts)", "tilesTX1", "font1", "TEXT", {} );
				_CGFU.TileFill(0, y , 32, 1,       "tilesBG1", 3      , "BG1" , {} );
				y+=2;

				_CGFU.Print(0, y, "UNCHANGED FONT"   , "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXT1", "tilesTX1", "font1", "TEXT", {} ); y+=1;
				y+=1;
				// FFFFFF // FONT COLOR
				// 4848AA // FONT OUTLINE
				_CGFU.Print(0, y, "1 PALETTE CHANGE" , "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXT2", "tilesTX1", "font1", "TEXT", { "colorSwaps":[ ["#FFFFFF", "#FF0000"] ] }  );                         y+=1;
				_CGFU.Print(0, y, "2 PALETTE CHANGES", "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXT3", "tilesTX1", "font1", "TEXT", { "colorSwaps":[ ["#FFFFFF", "#4848AA"], ["#4848AA", "#FFFFFF"] ] }  ); y+=1;
				_CGFU.Print(0, y, "1 PALETTE CHANGE" , "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXT4", "tilesTX1", "font1", "TEXT", { "colorSwaps":[ ["#FFFFFF", "#00FF00"] ] }  );                         y+=1;
				_CGFU.Print(0, y, "2 PALETTE CHANGES", "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXT5", "tilesTX1", "font1", "TEXT", { "colorSwaps":[ ["#4848AA", "#6699BB"], ["#FFFFFF", "#00FFF"] ] }  );  y+=1;
				y+=1;

				_CGFU.Print(0, y, "BACKWARDS FONT"   , "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXT6", "tilesTX1", "font1", "TEXT", { "FLIP_X":true }  ); y+=1;
				_CGFU.Print(0, y, "UPSIDE-DOWN FONT" , "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXT7", "tilesTX1", "font1", "TEXT", { "FLIP_Y":true }  ); y+=1; y+=1;

				_CGFU.Print(0, y, "TEXT:BG1 , F:"    , "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXT8", "tilesTX1", "font1", "BG1" , {} ); y+=1;
				_CGFU.Print(0, y, "TEXT:BG2 , F:"    , "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXT9", "tilesTX1", "font1", "BG2" , {} ); y+=1;
				_CGFU.Print(0, y, "TEXT:TEXT, F:BG2" , "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXTA", "tilesTX1", "font1", "TEXT", {} );
				_CGFU.TileFill(21, y, 10, 1,           "tilesBG1", 2      , "BG2" , {} );
				y+=1;

				_CGFU.Print(0, y, "TEXT:BG2 , F:BG1" , "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXTB", "tilesTX1", "font1", "BG2", { }  );
				_CGFU.TileFill(21, y , 10, 1         , "tilesBG1", 3      , "BG1" , {} );
				y+=1;
				y+=1;

				//
				_CGFU.Print(0, y, "T1: R0_X0_Y0_CS_0"   , "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXTC" , "tilesTX1", "font1", "TEXT", {"ROT":0 , "FLIP_X":false, "FLIP_Y":false, "colorSwaps":[ ]} );                        y+=1;
				_CGFU.Print(0, y, "T2: R0_X1_Y0_CS_1"   , "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXTD" , "tilesTX1", "font1", "TEXT", {"ROT":0 , "FLIP_X":true , "FLIP_Y":false, "colorSwaps":[ ["#FFFFFF", "#FF2400"] ]} ); y+=1;
				_CGFU.Print(0, y, "T3: R0_X0_Y1_CS_0"   , "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXTE" , "tilesTX1", "font1", "TEXT", {"ROT":0 , "FLIP_X":false, "FLIP_Y":true , "colorSwaps":[ ]} );                        y+=1;
				_CGFU.Print(0, y, "T4: R0_X1_Y1_CS_1"   , "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXTF" , "tilesTX1", "font1", "TEXT", {"ROT":0 , "FLIP_X":true , "FLIP_Y":true , "colorSwaps":[ ["#FFFFFF", "#00FF24"] ]} ); y+=1;
				_CGFU.Print(0, y, "T5: R0_X0_Y0_CS_1"   , "tilesTX1", "font1", "TEXT", {} ); _CGFU.Print(21, y, "TEST TEXTG" , "tilesTX1", "font1", "TEXT", {"ROT":0 , "FLIP_X":false, "FLIP_Y":false, "colorSwaps":[ ["#FFFFFF", "#AAAA00"] ]} ); y+=1;

			},
			main : function(){
				let gs     = game.gs[game.gamestate];
				let vars   = gs.vars;
				let consts = gs.consts;

				if(!gs.subMains[vars.subMain].inited){ gs.subMains[vars.subMain].init(); }

				if( game.chkBtn("ANY"   , "btnPressed1")){
					if     ( game.chkBtn("BTN_SL"   , "btnPressed1") ){
						vars.subMain="SCREEN1";
						gs.subMains[vars.subMain].inited=false;
					}
					if     ( game.chkBtn("BTN_SR"   , "btnPressed1") ){
						vars.subMain="SCREEN3";
						gs.subMains[vars.subMain].inited=false;
					}
				}

			},
		},
		"SCREEN3" : {
			inited:false,
			data : {
				"config":{
					highlight : {
						colorswap_active  : ["#B6B655", "#FAFA99"],
						tileindex     : 6,
						tileset       : "tilesBG1",
					},
				},
				menu_index    : 2,
				menu_options  : [
					{"text":"FADE DOWN", "type":"chainFade", "value":"DOWN", "x":2, "y":3  },
					{"text":"FADE UP"  , "type":"chainFade", "value":"UP"  , "x":2, "y":4  },
					//
					{"text":"ALL BLACK", "type":"setFade"  , "value":0     , "x":2, "y": 8-1 },
					{"text":"FADE L1"  , "type":"setFade"  , "value":1     , "x":2, "y": 9-1 },
					{"text":"FADE L2"  , "type":"setFade"  , "value":2     , "x":2, "y":10-1 },
					{"text":"FADE L3"  , "type":"setFade"  , "value":3     , "x":2, "y":11-1 },
					{"text":"FADE L4"  , "type":"setFade"  , "value":4     , "x":2, "y":12-1 },
					{"text":"FADE L5"  , "type":"setFade"  , "value":5     , "x":2, "y":13-1 },
					{"text":"FADE L6"  , "type":"setFade"  , "value":6     , "x":2, "y":14-1 },
					{"text":"FADE L7"  , "type":"setFade"  , "value":7     , "x":2, "y":15-1 },
					{"text":"FADE L8"  , "type":"setFade"  , "value":8     , "x":2, "y":16-1 },
					{"text":"FADE L9"  , "type":"setFade"  , "value":9     , "x":2, "y":17-1 },
					{"text":"NO FADE"  , "type":"setFade"  , "value":10    , "x":2, "y":18-1 },
				],
			},
			drawMenuOptions : function(drawText, drawHighlight){
				let gs     = game.gs[game.gamestate];
				let vars  = gs.vars;
				let data = gs.subMains[vars.subMain].data;

				for(let i=0; i<data.menu_options.length; i+=1){
					// Break out the properties.
					let text       = data.menu_options[i].text ;
					let x          = data.menu_options[i].x ;
					let y          = data.menu_options[i].y ;
					let tileset    = data.config.highlight.tileset          ;
					let tileindex  = data.config.highlight.tileindex        ;
					let colorSwaps = data.config.highlight.colorswap_active ;

					// Draw the text.
					if(drawText){
						_CGFU.Print(x, y, text, "tilesTX1", "font1", "TEXT", {} );
					}

					if(drawHighlight){
						// Draw the highlight if this option is the selected option.
						if(i==data.menu_index){ _CGFU.TileFill(x, y, text.length, 1, tileset, tileindex , "BG1" , {"colorSwaps":[colorSwaps]} ); }
						else                  { _CGFU.TileFill(x, y, text.length, 1, tileset, tileindex , "BG1" , {} ); }
					}
				}
			},
			init : function(){
				let gs     = game.gs[game.gamestate];
				let vars  = gs.vars;
				gs.subMains[vars.subMain].inited=true;

				let data = gs.subMains[vars.subMain].data;

				_CGFU.ClearSprites();
				_CGFU.ClearVram();

				// Background color.
				_CGFU.TileFill(0, 0, 32, 32,       "tilesBG1", 6      , "BG1" , {} );

				// TITLE BAR.
				_CGFU.Print   (0, 0, "SCREEN #3: Fade effects", "tilesTX1", "font1", "TEXT", {} );
				_CGFU.TileFill(0, 0 , 32, 1,       "tilesBG1", 3      , "BG1" , {} );

				// HEADINGS
				_CGFU.Print   (0, 2, "Chain Fades"    , "tilesTX1", "font1", "TEXT", {} );
				_CGFU.TileFill(0, 2 , 32, 1,       "tilesBG1", 3      , "BG1" , {} );

				_CGFU.Print   (0, 6, "Set Fades"      , "tilesTX1", "font1", "TEXT", {} );
				_CGFU.TileFill(0, 6 , 32, 1,       "tilesBG1", 3      , "BG1" , {} );

				// INSTRUCTIONS BAR.
				_CGFU.MapFill(0, 21, 32 , 2    , "tilesBG1", "main_bg_pattern1", "BG1" , {} );
				_CGFU.TileFill(0, 24 , 32, 1,           "tilesBG1", 3      , "BG1" , {} );
				_CGFU.Print   (0, 24, "INSTRUCTIONS: ", "tilesTX1", "font1", "TEXT", {} );

				_CGFU.Print   (2, 25, "BTN_DOWN: Move cursor down."    , "tilesTX1", "font1", "TEXT", {} );
				_CGFU.Print   (2, 26, "BTN_UP  : Move cursor up."      , "tilesTX1", "font1", "TEXT", {} );
				_CGFU.Print   (2, 27, "BTN_SL  : Previous screen."     , "tilesTX1", "font1", "TEXT", {} );
				_CGFU.Print   (2, 28, "BTN_SR  : Next screen."         , "tilesTX1", "font1", "TEXT", {} );
				_CGFU.Print   (2, 29, "BTN_A   : Activate selection."  , "tilesTX1", "font1", "TEXT", {} );
				_CGFU.Print   (2, 30, "BTN_B   : Cancel all fades."    , "tilesTX1", "font1", "TEXT", {} );


				// Draw the text AND the highlighting.
				gs.subMains[vars.subMain].drawMenuOptions(true, true);

				// Update the highlighting (not the text.)
				gs.subMains[vars.subMain].drawMenuOptions(false, true);

				// _CGF.adjustOutputOffsets( 0, 0);

			},
			main : function(){
				let gs     = game.gs[game.gamestate];
				let vars   = gs.vars;
				let consts = gs.consts;

				if(!gs.subMains[vars.subMain].inited){ gs.subMains[vars.subMain].init(); }

				if( game.chkBtn("ANY"   , "btnPressed1")){

					let data = gs.subMains[vars.subMain].data;

					// Cursor changes.
					if     ( game.chkBtn("BTN_DOWN"   , "btnPressed1") ){
						// Adjust the cursor.
						if(data.menu_index+1 >= data.menu_options.length){ data.menu_index=0; }
						else                                             { data.menu_index+=1; }

						// Update the highlighting (not the text.)
						gs.subMains[vars.subMain].drawMenuOptions(false, true);
					}
					if     ( game.chkBtn("BTN_UP"   , "btnPressed1") ){
						// Adjust the cursor.
						if(data.menu_index==0                           ){ data.menu_index=data.menu_options.length-1; }
						else                                             { data.menu_index-=1; }

						// Update the highlighting (not the text.)
						gs.subMains[vars.subMain].drawMenuOptions(false, true);
					}

					// Activate option. (Switches to the indicated fade mode.)
					if     ( game.chkBtn("BTN_A"   , "btnPressed1") ){
						// Determine type of option.
						let type = data.menu_options[data.menu_index].type ;
						let value = data.menu_options[data.menu_index].value ;
						if     (type == "setFade"  ){
							core.GRAPHICS.FADE.chainFadeActive=false;
							_CGFU.setFade(value);
						}
						else if(type == "chainFade"){ _CGFU.chainFade(value  , 100 , false); }
					}
					// Deactivate options. (Returns to full color and fade off.)
					if     ( game.chkBtn("BTN_B"   , "btnPressed1") ){
						core.GRAPHICS.FADE.chainFadeActive=false;
						_CGFU.setFade(10);
					}

					if     ( game.chkBtn("BTN_SL"   , "btnPressed1") ){
						vars.subMain="SCREEN2";
						gs.subMains[vars.subMain].inited=false;
					}
					if     ( game.chkBtn("BTN_SR"   , "btnPressed1") ){
						vars.subMain="SCREEN4";
						gs.subMains[vars.subMain].inited=false;
					}
				}

			},
		},
		"SCREEN4" : {
			inited:false,
			data:{
			},
			init : function(){
				let gs     = game.gs[game.gamestate];
				let vars  = gs.vars;
				gs.subMains[vars.subMain].inited=true;

				_CGFU.ClearSprites();
				_CGFU.ClearVram();

				// Create the animations object.
				gs.subMains[vars.subMain].data = {
					anims : {
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
									["#916DFF", "#00FF00"], // #916DFF - stick figure outline color.
									["#FFB600", "#FF0000"]  // #FFB600 - stick figure inside color.
								],
							},
							"x"           : (0 * _CS.TILE_WIDTH ) ,
							"y"           : (2 * _CS.TILE_HEIGHT) ,
							"xDir"        : 8 , // How many pixels to move (+ is right, - is left.)
							"nextFrameAt" : 100,
							"lastDraw"    : 100,
							"curFrame"    : 0,
						},
						"stick_figure2_animation_running":{
							"maps"        : [
								"stick_figure2_f1","stick_figure2_f2","stick_figure2_f3","stick_figure2_f4",

							],
							"tileset"     : "tilesSP1",
							"layer"       : "SP1",
							"flags"       : {
								"ROT":0, "FLIP_X":true, "FLIP_Y":false, "spriteIndex":undefined, "OFF":false,
								"colorSwaps":[
									// ["#916DFF", "#00FF00"], // #916DFF - stick figure outline color.
									// ["#FFB600", "#FF0000"]  // #FFB600 - stick figure inside color.
								],
							},
							"x"           : (28 * _CS.TILE_WIDTH ),
							"y"           : (3  * _CS.TILE_HEIGHT),
							"xDir"        : -4 , // How many pixels to move (+ is right, - is left.)
							"nextFrameAt" : 100,
							"lastDraw"    : 100,
							"curFrame"    : 0,
						},

					},
				};
				// Set the spriteIndexes for each animation.
				let data = gs.subMains[vars.subMain].data;
				let newSpriteIndex=0;
				for(let key in data.anims){
					let rec = data.anims[key];
					let flags       = rec.flags ;
					flags.spriteIndex=newSpriteIndex;
					newSpriteIndex+=1;
				}

				// ON-SCREEN GAMEPAD INPUT TESTING.
				gs.subMains[vars.subMain].data.gamepad = {
					// Absolute position.
					"gamepad":{ "flags":{"spriteIndex":undefined, "OFF":true }, "x":0+(0 *_CS.TILE_WIDTH), "y":0+(24*_CS.TILE_HEIGHT), "map":"snes_gp"     , "tileset":"tilesSP1" , "layer":"SP1" },
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
				for(let key in data.gamepad){
					let rec   = data.gamepad[key];
					let flags = rec.flags ;
					flags.spriteIndex=newSpriteIndex;
					newSpriteIndex+=1;
				}

				let y=0;
				_CGFU.Print   (0, y, "TESTS #4: Gamepad, Sprite tests", "tilesTX1", "font1", "TEXT", {} );
				_CGFU.TileFill(0, y , 32, 1,       "tilesBG1", 3      , "BG1" , {} );
				y+=1;

				gs.subMains[vars.subMain].animation1();

				// SCREEN #4: Gamepad tests and Sprite animation tests.
				// On-screen gamepad to respond to gamepad inputs.
				// Sprites with different flags.
				// Moving sprites.
				// Sprite controlled by the gamepad.
				// "Sparkle-pause" - Like Nibbles and Gorillas.

			},
			animation1 : function(){
				let gs   = game.gs[game.gamestate];
				let vars = gs.vars;
				let data = gs.subMains[vars.subMain].data;
				let keys = Object.keys(data.anims);

				for(let i=0; i<keys.length; i+=1){
					let key = keys[i];
					let rec      = data.anims[key]  ;
					let maps     = rec.maps         ;
					let curFrame = rec.curFrame     ;
					let map      = maps[ curFrame ] ;

					// Is there a change required for the animation?
					let newFrame = performance.now() - rec.lastDraw > rec.nextFrameAt ? true : false;
					if(newFrame){
						// Record the last draw timestamp for this animation.
						data.anims[key].lastDraw=performance.now();

						if(key!="stick_figure2_animation_running"){
							// If moving right.
							if     ( Math.sign(data.anims[key].xDir) == 1 ){
								if(data.anims[key].x<(25 * _CS.TILE_WIDTH)){ data.anims[key].x+=data.anims[key].xDir; }
								else{ data.anims[key].xDir *= -1; data.anims[key].flags.FLIP_X = true;  }
							}
							// If moving left.
							else if( Math.sign(data.anims[key].xDir) == -1 ){
								if(data.anims[key].x>(0 * _CS.TILE_WIDTH)){ data.anims[key].x+=data.anims[key].xDir; }
								else{ data.anims[key].xDir *= -1; data.anims[key].flags.FLIP_X = false;  }
							}
						}

						// if(flags.ROT < 360){ flags.ROT +=24  ; }
						// else               { flags.ROT = 0  ; }

						// Draw.
						_CGFU.DrawMap(rec.x, rec.y, rec.tileset, map, rec.layer, rec.flags, rec.flags);

						// Update curFrame.
						if(rec.curFrame<maps.length-1){ rec.curFrame+=1; }
						else                          { rec.curFrame =0; }
					}
					// else{ data.anims[key].curFrameCnt +=1; }
				}

			},
			gamepad : function(){
				let gs   = game.gs[game.gamestate];
				let vars   = gs.vars;
				let consts = gs.consts;

				let anims1 = gs.subMains[vars.subMain].data.anims;
				let obj = gs.subMains[vars.subMain].data.gamepad;

				let btnKey;

				if(obj.gamepad.flags.OFF){
					btnKey="gamepad";
					obj[btnKey].flags.OFF=false;
					obj[btnKey].onscreen=true;
					_CGFU.DrawMap( obj[btnKey].x, obj[btnKey].y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags );
				}

				let gp_x = obj.gamepad.x;
				let gp_y = obj.gamepad.y;

				let littleGuy = anims1.stick_figure2_animation_running;
				if( game.chkBtn("BTN_LEFT"  , "btnHeld1") ){ littleGuy.x-=1; littleGuy.flags.FLIP_X=true; }
				if( game.chkBtn("BTN_RIGHT" , "btnHeld1") ){ littleGuy.x+=1; littleGuy.flags.FLIP_X=false; }
				if( game.chkBtn("BTN_UP"    , "btnHeld1") ){ littleGuy.y-=1; }
				if( game.chkBtn("BTN_DOWN"  , "btnHeld1") ){ littleGuy.y+=1; }

				if( game.chkBtn("ANY"   , "btnPressed1") ){
					if( game.chkBtn("BTN_B"     , "btnPressed1") ){ btnKey="B"     ; obj[btnKey].flags.OFF=false; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_Y"     , "btnPressed1") ){ btnKey="Y"     ; obj[btnKey].flags.OFF=false; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_START" , "btnPressed1") ){ btnKey="START" ; obj[btnKey].flags.OFF=false; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_SELECT", "btnPressed1") ){ btnKey="SELECT"; obj[btnKey].flags.OFF=false; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_UP"    , "btnPressed1") ){ btnKey="UP"    ; obj[btnKey].flags.OFF=false; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_DOWN"  , "btnPressed1") ){ btnKey="DOWN"  ; obj[btnKey].flags.OFF=false; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_LEFT"  , "btnPressed1") ){ btnKey="LEFT"  ; obj[btnKey].flags.OFF=false; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_RIGHT" , "btnPressed1") ){ btnKey="RIGHT" ; obj[btnKey].flags.OFF=false; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_A"     , "btnPressed1") ){ btnKey="A"     ; obj[btnKey].flags.OFF=false; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_X"     , "btnPressed1") ){ btnKey="X"     ; obj[btnKey].flags.OFF=false; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_SL"    , "btnPressed1") ){ btnKey="SL"    ; obj[btnKey].flags.OFF=false; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_SR"    , "btnPressed1") ){ btnKey="SR"    ; obj[btnKey].flags.OFF=false; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
				}
				if( game.chkBtn("ANY"   , "btnReleased1")){
					if( game.chkBtn("BTN_B"     , "btnReleased1") ){ btnKey="B"     ; obj[btnKey].flags.OFF=true; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_Y"     , "btnReleased1") ){ btnKey="Y"     ; obj[btnKey].flags.OFF=true; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_START" , "btnReleased1") ){ btnKey="START" ; obj[btnKey].flags.OFF=true; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_SELECT", "btnReleased1") ){ btnKey="SELECT"; obj[btnKey].flags.OFF=true; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_UP"    , "btnReleased1") ){ btnKey="UP"    ; obj[btnKey].flags.OFF=true; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_DOWN"  , "btnReleased1") ){ btnKey="DOWN"  ; obj[btnKey].flags.OFF=true; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_LEFT"  , "btnReleased1") ){ btnKey="LEFT"  ; obj[btnKey].flags.OFF=true; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_RIGHT" , "btnReleased1") ){ btnKey="RIGHT" ; obj[btnKey].flags.OFF=true; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_A"     , "btnReleased1") ){ btnKey="A"     ; obj[btnKey].flags.OFF=true; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_X"     , "btnReleased1") ){ btnKey="X"     ; obj[btnKey].flags.OFF=true; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_SL"    , "btnReleased1") ){ btnKey="SL"    ; obj[btnKey].flags.OFF=true; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
					if( game.chkBtn("BTN_SR"    , "btnReleased1") ){ btnKey="SR"    ; obj[btnKey].flags.OFF=true; _CGFU.DrawMap( obj[btnKey].x+gp_x, obj[btnKey].y+gp_y, obj[btnKey].tileset, obj[btnKey].map, obj[btnKey].layer, obj[btnKey].flags ); }
				}
			},
			main : function(){
				let gs     = game.gs[game.gamestate];
				let vars   = gs.vars;
				let consts = gs.consts;

				if(!gs.subMains[vars.subMain].inited){ gs.subMains[vars.subMain].init(); }

				gs.subMains[vars.subMain].animation1();
				gs.subMains[vars.subMain].gamepad();

				if( game.chkBtn("ANY"   , "btnPressed1")){
					if     ( game.chkBtn("BTN_SL"   , "btnPressed1") ){
						vars.subMain="SCREEN3";
						gs.subMains[vars.subMain].inited=false;
					}
					if     ( game.chkBtn("BTN_SR"   , "btnPressed1") ){
						vars.subMain="SCREEN1";
						gs.subMains[vars.subMain].inited=false;
					}
				}

			},
		},
		// "SCREEN5" : {
		// 	inited:false,
		// 	init : function(){
		// 		let gs     = game.gs[game.gamestate];
		// 		let vars  = gs.vars;
		// 		gs.subMains[vars.subMain].inited=true;

		// 		_CGFU.ClearSprites();
		// 		_CGFU.ClearVram();
		// 	},
		// 	main : function(){
		// 		let gs     = game.gs[game.gamestate];
		// 		let vars   = gs.vars;
		// 		let consts = gs.consts;

		// 		if(!gs.subMains[vars.subMain].inited){ gs.subMains[vars.subMain].init(); }

		// 		if( game.chkBtn("ANY"   , "btnPressed1")){
		// 			if     ( game.chkBtn("BTN_SL"   , "btnPressed1") ){
		// 				vars.subMain="SCREEN3";
		// 				gs.subMains[vars.subMain].inited=false;
		// 			}
		// 			if     ( game.chkBtn("BTN_SR"   , "btnPressed1") ){
		// 				vars.subMain="SCREEN1";
		// 				gs.subMains[vars.subMain].inited=false;
		// 			}
		// 		}

		// 	},
		// },
	},
};

/*
*/

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
		_CGFU.ClearSprites();
		_CGFU.ClearVram();

		// ANIMATION SET 1
		vars.animations = {
			"_data":{
				"stick_figure_animation_r0"   : { "active":true },
				"stick_figure_animation_r90"  : { "active":true },
				"stick_figure_animation_r180" : { "active":true },
				"stick_figure_animation_r270" : { "active":true },
				"exclaimationPoint_animationFullRotation1" : { "active":true },
				"exclaimationPoint_animationFullRotation2" : { "active":true },
				"stick_figure_animationFullRotation1" : { "active":true },
				"stick_figure_animationFullRotation2" : { "active":true },
				"stick_figure_animationFullRotation3" : { "active":true },
				"stick_figure_animationFullRotation4" : { "active":true },
			},

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
				"x"           : (0) * _CS.TILE_WIDTH ,
				"y"           : 15 * _CS.TILE_HEIGHT,
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
					],
				},
				"x"           : (4) * _CS.TILE_WIDTH ,
				"y"           : 15 * _CS.TILE_HEIGHT,
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
				"x"           : (9) * _CS.TILE_WIDTH ,
				"y"           : 15 * _CS.TILE_HEIGHT,
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
				"x"           : (14) * _CS.TILE_WIDTH ,
				"y"           : 15 * _CS.TILE_HEIGHT,
				"nextFrameAt" : 5,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},

			// Continuous rotation.
			"exclaimationPoint_animationFullRotation1":{
				"maps"        : [
					"testline_up",
				],
				"tileset"     : "tilesSP1",
				"layer"       : "SP1",
				"flags"       : {
					"ROT":0, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":undefined, "OFF":false,
					"colorSwaps":[
					],
				},
				"x"           : (0) * _CS.TILE_WIDTH ,
				"y"           : 26 * _CS.TILE_HEIGHT,
				"nextFrameAt" : 5,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},
			"exclaimationPoint_animationFullRotation2":{
				"maps"        : [
					"testline_up2",
				],
				"tileset"     : "tilesSP1",
				"layer"       : "SP1",
				"flags"       : {
					"ROT":0, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":undefined, "OFF":false,
					"colorSwaps":[
					],
				},
				"x"           : (0) * _CS.TILE_WIDTH ,
				"y"           : 28 * _CS.TILE_HEIGHT,
				"nextFrameAt" : 5,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},
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
						["#916DFF", "#000000"], // #916DFF - stick figure outline color.
						["#FFB600", "#000000"]  // #FFB600 - stick figure inside color.
					],
				},
				"x"           : (19) * _CS.TILE_WIDTH ,
				"y"           : 15 * _CS.TILE_HEIGHT,
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
						["#916DFF", "#FFB600"], // #916DFF - stick figure outline color.
						["#FFB600", "#916DFF"]  // #FFB600 - stick figure inside color.
					],
				},
				"x"           : (19) * _CS.TILE_WIDTH ,
				"y"           : 15 * _CS.TILE_HEIGHT,
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
						["#916DFF", "#FFFFFF"], // #916DFF - stick figure outline color.
						["#FFB600", "#0000FF"]  // #FFB600 - stick figure inside color.
					],
				},
				"x"           : (19) * _CS.TILE_WIDTH ,
				"y"           : 15 * _CS.TILE_HEIGHT,
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
						["#916DFF", "#FFFFFF"], // #916DFF - stick figure outline color.
						["#FFB600", "#000000"]  // #FFB600 - stick figure inside color.
					],
				},
				"x"           : (19) * _CS.TILE_WIDTH ,
				"y"           : 15 * _CS.TILE_HEIGHT,
				"nextFrameAt" : 5,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},

		};

		// Set the spriteIndex for each animation.
		let i=0; // Keeps the spriteIndex.
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
				"stick_figure2_animation_running"   : { "active":true },
				"stick_figure3_animation_running"   : { "active":true },
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
						["#916DFF", "#00FF00"], // #916DFF - stick figure outline color.
						["#FFB600", "#FF0000"]  // #FFB600 - stick figure inside color.
					],
				},
				"x"           : (12) * _CS.TILE_WIDTH  ,
				"y"           : 26  * _CS.TILE_HEIGHT ,
				// "xDir"        : 1 * _CS.TILE_WIDTH   ,
				"xDir"        : 8   ,
				"nextFrameAt" : 7,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},
			"stick_figure2_animation_running":{
				"maps"        : [
					// "stick_figure_f1","stick_figure_f2","stick_figure_f3","stick_figure_f4",
					// "stick_figure_f5","stick_figure_f6","stick_figure_f7","stick_figure_f8"

					"stick_figure2_f1","stick_figure2_f2","stick_figure2_f3","stick_figure2_f4",

				],
				"tileset"     : "tilesSP1",
				"layer"       : "SP1",
				"flags"       : {
					"ROT":0, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":undefined, "OFF":false,
					"colorSwaps":[
						["#4848AA", "#916DFF"], // #4848AA - stick figure outline color.
						["#B6B655", "#FFB600"]  // #B6B655 - stick figure inside color.
					],
				},
				"x"           : (8) * _CS.TILE_WIDTH  ,
				"y"           : 27  * _CS.TILE_HEIGHT ,
				// "xDir"        : 1 * _CS.TILE_WIDTH   ,
				"xDir"        : 8   ,
				"nextFrameAt" : 7,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},
			"stick_figure3_animation_running":{
				"maps"        : [
					// "stick_figure_f1","stick_figure_f2","stick_figure_f3","stick_figure_f4",
					// "stick_figure_f5","stick_figure_f6","stick_figure_f7","stick_figure_f8"

					"stick_figure2_f1","stick_figure2_f2","stick_figure2_f3","stick_figure2_f4",

				],
				"tileset"     : "tilesSP1",
				"layer"       : "SP1",
				"flags"       : {
					"ROT":0, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":undefined, "OFF":false,
					"colorSwaps":[
					],
				},
				"x"           : (4) * _CS.TILE_WIDTH  ,
				"y"           : 27  * _CS.TILE_HEIGHT ,
				// "xDir"        : 1 * _CS.TILE_WIDTH   ,
				"xDir"        : 8   ,
				"nextFrameAt" : 7,
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

		// let _startx = 0;
		// let _starty = 0;
		// let _x = _startx;
		// let _y = _starty;
		// let _w = 16;
		// for(let t=2; t<_CGA.tilesets.default_tileset.length; t+=1){
		// 	// Next line?
		// 	if(_x >= _w){ _x=_startx; _y+=1; }

		// 	// Draw.
		// 	_CGFU.DrawTile(_x, _y, "default_tileset", t , "BG1" , {} );

		// 	// Update _x.
		// 	_x+=1;
		// }

		// ANIMATION SET 3
		vars.animations3 = {
			"_data":{
				"stick_figure_animation_running"   : { "active":true },
			},

			"stick_figure_animation_running":{
				"maps"        : [
					"stick_figure2_f1","stick_figure2_f2","stick_figure2_f3","stick_figure2_f4",

				],
				"tileset"     : "tilesSP1",
				"layer"       : "SP1",
				"flags"       : {
					"ROT":0, "FLIP_X":false, "FLIP_Y":false, "spriteIndex":undefined, "OFF":false,
					"colorSwaps":[
						// ["#916DFF", "#00FF00"], // #916DFF - stick figure outline color.
						// ["#FFB600", "#FF0000"]  // #FFB600 - stick figure inside color.
					],
				},
				"x"           : (0) * _CS.TILE_WIDTH  ,
				"y"           :  0  * _CS.TILE_HEIGHT ,
				// "xDir"        : 1 * _CS.TILE_WIDTH   ,
				"xDir"        : 8   ,
				"nextFrameAt" : 7,
				"curFrameCnt" : 7,
				"curFrame"    : 0,
			},
		};
		for(let key in vars.animations3._data){
			let data        = vars.animations3._data[key] ;
			let active      = data.active                ;
			let anim        = vars.animations3[key]       ;
			if(!active){ continue; }
			let flags       = anim.flags       ;
			flags.spriteIndex=i;
			i+=1;
		}

		// console.log("last i:", i);
		vars.END = false;
		// vars.END = true;
	},
	//
	init : function(){
		let gs    = this;
		let vars  = gs.vars;

		// Highlight under top stick figure animations.
		_CGFU.TileFill(4, 0, 23, 5, "tilesBG1", 2        , "BG1" , {}   );
		_CGFU.TileFill(4, 6, 23, 5, "tilesBG1", 3        , "BG2" , {}   );
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

			if     ( game.chkBtn("BTN_START" , "btnPressed1") ){ vars.END=true; game.setGamestate1("TESTS1" , true); return; }
			else if( game.chkBtn("BTN_SELECT", "btnPressed1") ){ vars.END=true; game.setGamestate1("TESTS2" , true); return; }

			gs.doAnimations_1( vars.animations );
			gs.doAnimations_2( vars.animations2 );
			gs.doAnimations_3( vars.animations3 );
		}
	},

	// *** SUPPORT FUNCTIONS ***

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

				let rotatingAnimationKeys1 = [
					"exclaimationPoint_animationFullRotation1",
					"exclaimationPoint_animationFullRotation2",
					"stick_figure_animationFullRotation1",
					"stick_figure_animationFullRotation2",
					"stick_figure_animationFullRotation3",
				];
				if(rotatingAnimationKeys1.indexOf(key) != -1){
					if(flags.ROT < 360){ flags.ROT +=24  ; }
					else               { flags.ROT = 0  ; }
				}

				let rotatingAnimationKeys2 = [
					"stick_figure_animationFullRotation4",
				];
				if(rotatingAnimationKeys2.indexOf(key) != -1){
					if(flags.ROT < 360){ flags.ROT +=24  ; }
					else               { flags.ROT = 0  ; }
				}

				// Draw.
				_CGFU.DrawMap(x, y, tileset, map, layer, flags);

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
					if(anim.x<216){ anim.x+=anim.xDir; }
					else{ anim.xDir *= -1; anim.flags.FLIP_X = true;  }
				}
				// Moving left.
				else if( Math.sign(anim.xDir) == -1 ){
					if(anim.x>32){ anim.x+=anim.xDir; }
					else{ anim.xDir *= -1; anim.flags.FLIP_X = false;  }
				}

				// if(flags.ROT < 360){ flags.ROT +=24  ; }
				// else               { flags.ROT = 0  ; }

				// Draw.
				_CGFU.DrawMap(anim.x, anim.y, tileset, map, layer, flags);

				// Update curFrame.
				if(curFrame<maps.length-1){ anim.curFrame+=1; }
				else                      { anim.curFrame =0; }
			}
			else{ anim.curFrameCnt +=1; }

		}

	},
	doAnimations_3 : function( animObj ){
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

				// // Moving right.
				// if     ( Math.sign(anim.xDir) == 1 ){
				// 	if(anim.x<216){ anim.x+=anim.xDir; }
				// 	else{ anim.xDir *= -1; anim.flags.FLIP_X = true;  }
				// }
				// // Moving left.
				// else if( Math.sign(anim.xDir) == -1 ){
				// 	if(anim.x>32){ anim.x+=anim.xDir; }
				// 	else{ anim.xDir *= -1; anim.flags.FLIP_X = false;  }
				// }

				// if(flags.ROT < 360){ flags.ROT +=24  ; }
				// else               { flags.ROT = 0  ; }

				// Draw.
				_CGFU.DrawMap(anim.x, anim.y, tileset, map, layer, flags);

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

/*
*/

// ==================================
// ==== FILE END: gs_TEMPLATE.js ====
// ==================================
