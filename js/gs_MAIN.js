// ================================
// ==== FILE START: gs_MAIN.js ====
// ================================

'use strict';

// *** SHARED GAME VARIABLES ***

// Holds data/functions that is intended for sharing between gamestates.
game.SHARED = {
	// *** SHARED FUNCTIONS ***
	populate : function(){
	},
};

// Variables that will hold current/prev gamestates.
game.gamestate       = "" ; //
game.gamestate_prev  = "" ; //
game.gamestate2      = "" ; //
game.gamestate2_prev = "" ; //

// Keeps track of the logic processing timings. (For DEBUG mode.)
// _CGP.gameloop_timings = []; // Handled by game.
// _CGP.logic_timings    = []; // Handled by game.
// _CGP.debug_timings    = []; // Handled by game.

// Whole image graphics processor(s).
game.graphicsPostProcessor_obj = {
	"shake":{
		"active" : false , // Can be changed as needed.
		"main"   : function(){
			return new Promise(function(res,rej){ res(); });
		},
	}
};
game.graphicsPostProcessor = function(ctx){
	return new Promise(function(res, rej){
		let proms=[];

		// Shake?
		if(game.graphicsPostProcessor_obj.shake.active){ proms.push( game.graphicsPostProcessor_obj.shake.main() ); }

		Promise.all(proms).then(
			function(){ res(ctx); },
			function(err){ console.log("ERR: graphicsPostProcessor:", err); }
		);

	});
};
game.extraDataForGlobalErrorHandler = function(){
	let gamestateDataOnly={};
	try{
		for(let d in game.gs[game.gamestate]){
			if(typeof game.gs[game.gamestate][d] != "function"){
				let keys=Object.keys( game.gs[game.gamestate][d] );
				if(keys.length){ gamestateDataOnly[d] = game.gs[game.gamestate][d]; }
			}
		}
	}
	catch(e){
		gamestateDataOnly="<UNAVAILABLE>";
	}

	let vars;
	try     { vars = game.gs[game.gamestate].vars; }
	catch(e){ vars = "<UNAVAILABLE>"; }

	let extraData = {};
	extraData._gamestateDataOnly = gamestateDataOnly ;
	extraData._vars = vars ;
	if( game.gamestate       ){ extraData["game.gamestate"]       = game.gamestate      ; }
	if( game.gamestate_prev  ){ extraData["game.gamestate_prev"]  = game.gamestate_prev ; }
	if( game.gamestate2      ){ extraData["game.gamestate2"]      = game.gamestate2     ; }
	if( game.gamestate2_prev ){ extraData["game.gamestate2_prev"] = game.gamestate2_prev; }

	return extraData;
};
// Run one time at game load. Configures game assets (graphics, sound.)
game.runOnce = function(){
	return new Promise(function(resolve,reject){
		// These functions may run async.
		let proms1 = [];

		// Graphics and audio setup.
		proms1.push( core.GRAPHICS   .init.init() ) ; // Comes from the selected video kernel.
		proms1.push( core.FUNCS.audio.init() ) ; // Comes from the selected sound kernel.

		// When the above promises have been completed...
		Promise.all(proms1).then(
			function(){
				// _CGP.gameloop_timings = []; // Handled by game.
				// _CGP.logic_timings    = []; // Handled by game.
				// _CGP.debug_timings    = []; // Handled by game.

				// Populate the SHARED data for the game.
				game.SHARED.populate();

				// Whole image graphics processors.
				core.EXTERNAL.GRAPHICS = game.graphicsPostProcessor ;

				// (DEBUG) Combine all the core objects into one.
				app = {
					"JSGAME" : JSGAME ,
					"core"   : core   ,
					"game"   : game   ,
				};

				// *** DEBUG ***
				if(JSGAME.FLAGS.debug && game.DEBUG.init){
					//
					game.DEBUG.init();
				}

				core.GRAPHICS.DEBUG.start("gameloop_timings"); core.GRAPHICS.DEBUG.end("gameloop_timings");
				core.GRAPHICS.DEBUG.start("logic_timings"   ); core.GRAPHICS.DEBUG.end("logic_timings"   );
				core.GRAPHICS.DEBUG.start("debug_timings"   ); core.GRAPHICS.DEBUG.end("debug_timings"   );
				core.GRAPHICS.DEBUG.start("gfx_timings"     ); core.GRAPHICS.DEBUG.end("gfx_timings"     );
				core.GRAPHICS.DEBUG.start("doColorSwapping" ); core.GRAPHICS.DEBUG.end("doColorSwapping" );
				core.GRAPHICS.DEBUG.start("update_layers"   ); core.GRAPHICS.DEBUG.end("update_layers"   );
				core.GRAPHICS.DEBUG.start("layer_combines"  ); core.GRAPHICS.DEBUG.end("layer_combines"  );
				core.GRAPHICS.DEBUG.start("fade_timings"    ); core.GRAPHICS.DEBUG.end("fade_timings"    );
				core.GRAPHICS.DEBUG.start("output_timings"  ); core.GRAPHICS.DEBUG.end("output_timings"  );

				core.GRAPHICS.DEBUG.start("layer_BG1"       ); core.GRAPHICS.DEBUG.end("layer_BG1"       );
				core.GRAPHICS.DEBUG.start("layer_BG2"       ); core.GRAPHICS.DEBUG.end("layer_BG2"       );
				core.GRAPHICS.DEBUG.start("layer_TEXT"      ); core.GRAPHICS.DEBUG.end("layer_TEXT"      );
				core.GRAPHICS.DEBUG.start("layer_SP1"       ); core.GRAPHICS.DEBUG.end("layer_SP1"       );

				// Remove some assets (only needed once.)
				delete core.GRAPHICS   .init ; // Graphics init should only run once.
				delete core.FUNCS.audio.init ; // Audio init should only run once.
				delete game.SHARED.populate  ; // Only needed once.
				delete game.runOnce          ; // This function.

				// Resolve the promise and allow the program to continue.
				resolve();
			},
			function(err){ console.log("ERROR: runOnce: ", err);  }
		);

	});
};
// Game setup and first game loop.
game.firstLoop = function(){
	return new Promise(function(resolve,reject){
		// Make sure any sounds have been stopped.
		core.FUNCS.audio.stopAllSounds_midi();
		core.FUNCS.audio.cancelAllSounds_mp3("all");

		// *** Adjust game canvas dimensions ***

		JSGAME.DOM.canvasScaleSlider.value = JSGAME.PRELOAD.gamesettings_json.canvas_scaleFactor;
		JSGAME.SHARED.canvasResize( JSGAME.DOM.canvasScaleSlider.value );

		// *** Aliases for JSGAME.SHARED functions ***

		game.chkBtn               = JSGAME.SHARED.checkButton          ; // Function
		game.buttons              = JSGAME.SHARED.buttons              ; // Object
		game.secondsToFrames      = JSGAME.SHARED.secondsToFrames      ; // Function
		game.getRandomInt_inRange = JSGAME.SHARED.getRandomInt_inRange ; // Function

		// *** TIMING ***

		// https://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
		JSGAME.SHARED.timing.adjust( _CS.fps );

		// *** VRAM ***

		// *** AUDIO ***

		// Set the volume.
		core.FUNCS.audio.changeMasterVolume(75);

		// Set the volume:
		if( JSGAME.PRELOAD.PHP_VARS.mastervol != undefined)       {
			// Set the volume (within range.)
			if( !isNaN( JSGAME.PRELOAD.PHP_VARS.mastervol ) ){
				core.FUNCS.audio.changeMasterVolume( Math.min(Math.max(JSGAME.PRELOAD.PHP_VARS.mastervol, 0), 100) );
			}
		}

		// *** SPRITES ***

		// *** GAMESTATES RESET ***

		// Prepare all gamestates (resetting them to default values.)
		let gamestates = Object.keys(game.gs);
		gamestates.forEach(function(d){ game.gs[d].vars = {}; });

		// CLEAR ALL CANVASES AND GRAPHICS ARRAYS.
		//

		if(JSGAME.FLAGS.debug){
			// document.getElementById("debug_updateIndicator2").innerText = (JSGAME.SHARED.timing.interval.toFixed(2)) + " ms/frame";
			// document.getElementById("debug_updateIndicator3").innerText = "SET FPS: " + (_CS.FPS) + " FPS";
		}

		// Resolve this since we are done.
		setTimeout(
			function(){
				// Blank the screen.
				let outputCanvasCtx = core.GRAPHICS.ctx.OUTPUT;
				outputCanvasCtx.fillStyle = "#000";
				outputCanvasCtx.fillRect(0, 0, outputCanvasCtx.canvas.width, outputCanvasCtx.canvas.height);

				resolve(
					function(){
						// CLEAR ALL CANVASES AND GRAPHICS ARRAYS.
						//

						// Play the game start sound.
						core.FUNCS.audio.playSound_mp3("cursorTick1"      , true, 1.0);

						// Set the gameReady flag to true.
						JSGAME.FLAGS.gameReady=true;

						// *** GAMESTATE ***

						// Normal non-debug load.
						if(!JSGAME.FLAGS.debug){
							// game.setGamestate1("TITLE0" , true); // Init screen
							// game.setGamestate1("TESTS1" , true); //
							game.setGamestate1("TESTS2" , true); //
						}
						// Debug is active.
						else{
							// game.setGamestate1("TESTS1" , true); //
							game.setGamestate1("TESTS2" , true); //
							// game.setGamestate1("TESTS"  , true); //
							// game.setGamestate1("TITLE0" , true); // Init screen
							// game.setGamestate1("TITLE1" , true); //
							// game.setGamestate1("SETUP1" , true); //
							// game.setGamestate1("PLAY"   , true); //
						}

						console.log("JSGAME: videoModeC_TESTS - STARTED");
					}
				);
			},
			125
		);

	});
};

// *** GAME STATE FUNCTIONS ***

// Updates game.gamestate and game.gamestate_prev.
game.setGamestate1 = function(newState, prepare){
	// NOTE: prepareState is normally used to reset variables in a gamestate.
	// However, if those variables were not created within prepareState then they would not be reset.

	// Stop whatever might be running.
	JSGAME.SHARED.cancel_gameloop();

	// Start it again.
	// JSGAME.SHARED.raf_id=requestAnimationFrame(game.gameloop);
	JSGAME.SHARED.schedule_gameloop();

	// Save previous gamestate1
	game.gamestate_prev  = game.gamestate ;

	// Set the new gamestate1
	game.gamestate       = newState ;

	// Was a prepare requested?
	if(prepare){
		game.gs[game.gamestate].prepareState();
	}
};
// Updates game.gamestate2 and game.gamestate2_prev. (UNUSED)
game.setGamestate2 = function(newState, prepare){
	// Stop whatever might be running.
	JSGAME.SHARED.cancel_gameloop();

	// Start it again.
	// JSGAME.SHARED.raf_id=requestAnimationFrame(game.gameloop);
	JSGAME.SHARED.schedule_gameloop();

	// Save previous gamestate1
	game.gamestate2_prev = game.gamestate2 ;

	// Set the new gamestate1
	game.gamestate2      = newState ;

	// Was a prepare requested?
	// if(prepare){
	// 	game.gs[game.gamestate].prepareState();
	// }
};
// Run prepareState on all gamestates then run the firstLoop again.
game.game_full_restart = function(){
	// Stop whatever might be running.
	JSGAME.SHARED.cancel_gameloop();

	// Blank the screen.
	let outputCanvasCtx = core.GRAPHICS.ctx.OUTPUT;
	outputCanvasCtx.fillStyle = "#BB3";
	outputCanvasCtx.fillRect(0, 0, outputCanvasCtx.canvas.width, outputCanvasCtx.canvas.height);

	// Set the gameReady flag to false.
	JSGAME.FLAGS.gameReady=false;

	setTimeout(function(){
		// Stop sounds.
		core.FUNCS.audio.stopAllSounds_midi();
		core.FUNCS.audio.cancelAllSounds_mp3("all");

		// Wait a short time for whatever may have been active before cancel.
		setTimeout(function(){
			game.firstLoop().then(
				function(func){ func(); },
				function(err) { console.log("ERR:", err); }
			);
		}, 125);
	}, 125);

};

// *** LOW-LEVEL GAME FUNCTIONS ***

//
game.stateManager = function(){
	// Run the main function for the gamestate (if it exists.)
	if( game.gs[game.gamestate] ){ game.gs[game.gamestate].main(); }

	// Error!
	else{
		let str = ["=E= stateManager: Invalid game.gamestate: ", game.gamestate ];
		console.log(str, game.gamestate);
		throw Error(str);
	}
};

// The actual gameloop.
game.loop = function(){
	return new Promise(async function(res_loop, rej_loop){
		// ********
		// GAMELOOP
		// ********

		core.GRAPHICS.DEBUG.start("gameloop_timings");

		// ***************
		// GRAPHICS RENDER
		// ***************

		try{ await _CGFU.renderOutput(); } catch(err){ _CGFI.errorHandler("renderOutput", err); }

		// *****
		// LOGIC
		// *****

		core.GRAPHICS.DEBUG.start("logic_timings"   );

		// Get user inputs.
		JSGAME.SHARED.getUserInputs();

		// Run game logic.
		game.stateManager();

		// ***************
		// GRAPHICS UPDATE
		// ***************

		// Layer updates.
		try{ await _CGFI.update_layers(); } catch(err){ _CGFI.errorHandler("update_layers", err); }

		core.GRAPHICS.DEBUG.end("logic_timings"   );
		core.GRAPHICS.DEBUG.end("gameloop_timings");

		//
		res_loop();

		// **** **** ****
		// **** DONE ****
		// **** **** ****

		// ... Ready for the draw at the beginning of the loop.
	});

};

// Controls the gameloop.
game.gameloop = async function(timestamp){
	// Control if the actual game loop should run.

	// Gather some data to be displayed by the next debug update.
	if(JSGAME.FLAGS.debug) {
		if(!game.DEBUG.lastloopTimings){ game.DEBUG.lastloopTimings={}; }
		game.DEBUG.lastloopTimings.interval = JSGAME.SHARED.timing.interval                                             ;
		game.DEBUG.lastloopTimings.time     = timestamp - JSGAME.SHARED.timing._then                                    ;
		game.DEBUG.lastloopTimings.percent  = ((game.DEBUG.lastloopTimings.time) / JSGAME.SHARED.timing.interval) * 100 ;
		game.DEBUG.lastloopTimings.calcFPS  = JSGAME.SHARED.fps.value                                                   ;
		game.DEBUG.lastloopTimings.setFPS   = _CS.FPS;
	}

	// Update the timing values.
	JSGAME.SHARED.timing.now           = timestamp;
	JSGAME.SHARED.timing.delta         = JSGAME.SHARED.timing.now - JSGAME.SHARED.timing._then;
	JSGAME.SHARED.timing.nextFrameTime = JSGAME.SHARED.timing.now + JSGAME.SHARED.timing.interval ;

	// Ready to run a graphics/logic update?
	let is_deltaOverInterval = (JSGAME.SHARED.timing.delta >= JSGAME.SHARED.timing.interval ? true : false) ;
	let is_paused            = !(JSGAME.FLAGS.gameReady && JSGAME.FLAGS.windowIsFocused && ! JSGAME.FLAGS.paused && ! JSGAME.FLAGS.manuallyPaused) ;
	let ms_untilNextScheduledLoop = JSGAME.SHARED.timing.nextFrameTime - JSGAME.SHARED.timing.now;

	// Ready for the next game loop?
	if(is_deltaOverInterval) {
		// Update the timing data.
		JSGAME.SHARED.timing._then = JSGAME.SHARED.timing.now - (JSGAME.SHARED.timing.delta % JSGAME.SHARED.timing.interval);

		// Calculate the average FPS.
		JSGAME.SHARED.fps.tick(timestamp);

		// Paused? Do not run the game.loop.
		if(is_paused){
			// Schedule the next game.gameloop.
			JSGAME.SHARED.schedule_gameloop();
		}

		// Run the gameloop.
		else{
			try { await game.loop(); }
			catch(err){
				let str=["=E= game.loop: ERROR", err ];
				console.log(str,err);
				throw Error(str);
			}

			// Set JSGAME.FLAGS.allowDebugToRun if in DEBUG mode.
			if(JSGAME.FLAGS.debug) { JSGAME.FLAGS.allowDebugToRun=true ; }
			else                   { JSGAME.FLAGS.allowDebugToRun=false; }

			// Schedule the next game.gameloop.

			// If the loop took too long then wait one frame before running again.
			// let looptime = (JSGAME.SHARED.timing.nextFrameTime - performance.now()) ;
			// if( Math.sign(looptime) == -1) {
				// console.log("loop too long! looptime:", looptime);
				// setTimeout(JSGAME.SHARED.schedule_gameloop, (JSGAME.SHARED.timing.interval*30) << 0 );
			// }
			// Do the requestAnimationFrame normally.
			// else{ JSGAME.SHARED.schedule_gameloop(); }

			JSGAME.SHARED.schedule_gameloop();
		}
	}

	// Not ready yet. Do something else.
	else{
		// Must have debug on, allowDebugToRun.
		if(JSGAME.FLAGS.debug && JSGAME.FLAGS.allowDebugToRun){
			// The timing delta should be over 10ms since the debug typically runs 6-10ms.
			if(JSGAME.SHARED.timing.delta > 10){
				// console.log(
				// 	"ms_untilNextScheduledLoop:"  , ms_untilNextScheduledLoop,
				// 	"is_deltaOverInterval:"       , is_deltaOverInterval,
				// 	"JSGAME.SHARED.timing.delta:" , JSGAME.SHARED.timing.delta
				// );

				// Control how often the debug display is updated.
				// NOTE: Time includes the last frame drawn.
				let last                       = game.DEBUG.VALS.lastDebugDisplay           ;
				let timeSince                  = performance.now() - last                   ;
				let secondsToWait_debugDisplay = game.DEBUG.VALS.secondsToWait_debugDisplay ;

				// Update the debug display?

				// Update based on the specified timing.
				if( timeSince >= (JSGAME.SHARED.timing.interval * _CS.fps) * secondsToWait_debugDisplay ){
					core.GRAPHICS.DEBUG.start("debug_timings");

					// Run the debug display.
					game.DEBUG.updateDebugDisplay();
					game.DEBUG.VALS.lastDebugDisplay=performance.now();

					// Clear allowDebugToRun. It will be set again after graphicsUpdate completes.
					JSGAME.FLAGS.allowDebugToRun=false;

					core.GRAPHICS.DEBUG.end("debug_timings");

					// Schedule the next game.gameloop.
					JSGAME.SHARED.schedule_gameloop();
				}
				else{
					// Schedule the next game.gameloop.
					JSGAME.SHARED.schedule_gameloop();
				}

			}
			else{
				// Schedule the next game.gameloop.
				JSGAME.SHARED.schedule_gameloop();
			}
		}
		else{
			// Schedule the next game.gameloop.
			JSGAME.SHARED.schedule_gameloop();
		}

	}

};

/*
	full screen fade.

	logic

	color swaps

	draw.
*/

// ==============================
// ==== FILE END: gs_MAIN.js ====
// ==============================
