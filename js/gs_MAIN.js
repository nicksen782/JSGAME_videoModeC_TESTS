// *** SHARED GAME VARIABLES ***

// Will hold each individual game state.
game.gs = {};

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
game.logic_timings = [0,0,0,0,0];

// Whole image graphics processor(s).
game.graphicsPostProcessor_obj = {
	"shake":{
		"active" : false , // Can be changed as needed.
		"main"   : function(){
			return new Promise(function(res,rej){ res(); });
		},
	}
}
game.graphicsPostProcessor = function(ctx){
	return new Promise(function(res, rej){
		let proms=[];

		// Shake?
		if(game.graphicsPostProcessor_obj["shake"]["active"]){ proms.push( game.graphicsPostProcessor_obj.shake.main() ); }

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
	extraData["_gamestateDataOnly"] = gamestateDataOnly ;
	extraData["_vars"] = vars ;
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
		proms1.push( core.GRAPHICS   .init() ) ; // Comes from the selected video kernel.
		proms1.push( core.FUNCS.audio.init() ) ; // Comes from the selected sound kernel.

		// When the above promises have been completed...
		Promise.all(proms1).then(
			function(){
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

				// Remove some assets (only needed once.)
				// delete core.GRAPHICS   .init ; // Graphics init should only run once.
				// delete core.FUNCS.audio.init ; // Audio init should only run once.
				// delete game.SHARED.populate  ; // Only needed once.
				// delete game.runOnce          ; // This function.

				// Resolve the promise and allow the program to continue.
				resolve();
			}
			,function(err){ console.log("ERROR: runOnce: ", err);  }
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

		JSGAME.DOM["canvasScaleSlider"].value = JSGAME.PRELOAD.gamesettings_json.canvas_scaleFactor;
		JSGAME.SHARED.canvasResize( JSGAME.DOM["canvasScaleSlider"].value );

		// *** Aliases for JSGAME.SHARED functions ***

		game.chkBtn               = JSGAME.SHARED.checkButton          ; // Function
		game.buttons              = JSGAME.SHARED.buttons              ; // Object
		game.secondsToFrames      = JSGAME.SHARED.secondsToFrames      ; // Function
		game.getRandomInt_inRange = JSGAME.SHARED.getRandomInt_inRange ; // Function

		// *** TIMING ***

		// https://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
		JSGAME.SHARED.timing.adjust( core.SETTINGS.fps );

		// *** VRAM ***

		// *** AUDIO ***

		// Set the volume.
		core.FUNCS.audio.changeMasterVolume(75);

		// Set the volume:
		if( JSGAME.PRELOAD.PHP_VARS.queryString.mastervol != undefined)       {
			// Set the volume (within range.)
			if( !isNaN( JSGAME.PRELOAD.PHP_VARS.queryString.mastervol ) ){
				core.FUNCS.audio.changeMasterVolume( Math.min(Math.max(JSGAME.PRELOAD.PHP_VARS.queryString.mastervol, 0), 100) );
			}
		}

		// *** SPRITES ***

		// *** GAMESTATES RESET ***

		// Prepare all gamestates (resetting them to default values.)
		let gamestates = Object.keys(game.gs);
		gamestates.forEach(function(d){ game.gs[d].vars = {}; });

		// CLEAR ALL CANVASES AND GRAPHICS ARRAYS.
		//

		// Resolve this since we are done.
		setTimeout(
			function(){
				// Blank the screen.
				let outputCanvasCtx = core.GRAPHICS["ctx"].OUTPUT;
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

						if(!JSGAME.FLAGS.debug){
							// game.setGamestate1("TITLE0" , true); // Init screen
							game.setGamestate1("TESTS1" , true); //
							// game.setGamestate1("TESTS2" , true); //
						}
						else{
							// game.setGamestate1("TESTS2" , true); //
							game.setGamestate1("TESTS1" , true); //
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
	// Stop whatever might be running.
	window.cancelAnimationFrame( JSGAME.SHARED.raf_id );
	JSGAME.SHARED.raf_id=null;

	// Start it again.
	JSGAME.SHARED.raf_id=requestAnimationFrame(game.gameloop);

	// Save previous gamestate1
	game.gamestate_prev  = game.gamestate ;

	// Set the new gamestate1
	game.gamestate       = newState ;

	// Was a prepare requested?
	if(prepare){
		game.gs[game.gamestate].prepareState();
	}
};
// Updates game.gamestate2 and game.gamestate2_prev.
game.setGamestate2 = function(newState, prepare){
	// Stop whatever might be running.
	window.cancelAnimationFrame( JSGAME.SHARED.raf_id );
	JSGAME.SHARED.raf_id=null;

	// Start it again.
	JSGAME.SHARED.raf_id=requestAnimationFrame(game.gameloop);

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
	window.cancelAnimationFrame( JSGAME.SHARED.raf_id );
	JSGAME.SHARED.raf_id=null;

	// Blank the screen.
	let outputCanvasCtx = core.GRAPHICS["ctx"].OUTPUT;
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
game.loop = function(){
	// Debug: Performance check.
	let logic_start;
	if(JSGAME.FLAGS.debug){
		logic_start=performance.now();
		game.logic_timings.shift();
	}

	// Should the gameloop run or be skipped?
	if(

		  // JSGAME flags:
		JSGAME.FLAGS.gameReady         && // Game is ready.
		JSGAME.FLAGS.windowIsFocused   && // Window in focus?
		! JSGAME.FLAGS.paused          && // Game NOT paused? (Automatic.)
		! JSGAME.FLAGS.manuallyPaused  && // Game NOT paused? (By user.)

		// Specific to the video mode:
		//   ! core.GRAPHICS.FADER.blocking       && // Fader NOT set to block?
		//   ! core.GRAPHICS.FADER.blockAfterFade && // Fade done but set to block logic?
		  ! core.GRAPHICS.DATA.INLAYERUPDATE      // Not in a graphics update?
	){
		// *** Get inputs ***

		// JSGAME.SHARED.getUserInputs( game.buttons );
		JSGAME.SHARED.getUserInputs();

		// *** Run the current game state. ***

		game.stateManager();
	}
	else{
		// Game logic is paused.
	}

	// Debug: Performance check.
	if(JSGAME.FLAGS.debug){
		game.logic_timings.pop();
		game.logic_timings.push(performance.now()-logic_start);
	}

	// *** Output any graphical changes to the canvas. ***

	// Make sure that the game loop cannot run again until this finishes.
	window.cancelAnimationFrame( JSGAME.SHARED.raf_id );
	JSGAME.SHARED.raf_id=null;

	// core.FUNCS.graphics.update_allLayers();
	core.GRAPHICS.FUNCS.update_allLayers().then(
		function(res){
			// Start the gameloop again.
			JSGAME.SHARED.raf_id=requestAnimationFrame(game.gameloop);

			// Set JSGAME.FLAGS.allowDebugToRun if in DEBUG mode.
			if(JSGAME.FLAGS.debug) { JSGAME.FLAGS.allowDebugToRun=true ; }
			else                   { JSGAME.FLAGS.allowDebugToRun=false; }
		},
		function(err){
			let str=["=E= game.loop/update_allLayers: ERROR" ];
			console.log(str,err);
			throw Error(str);
		}
	);
};
//
game.gameloop = function(timestamp){
	// *** Update the timing data. ***

	// JSGAME.SHARED.timing.now   = performance.now();
	JSGAME.SHARED.timing.now   = timestamp;
	JSGAME.SHARED.timing.delta = JSGAME.SHARED.timing.now - JSGAME.SHARED.timing._then;

	// *** Does the gameloop run this time? ***

	if (JSGAME.SHARED.timing.delta >= JSGAME.SHARED.timing.interval) {

		// *** Update the timing data. ***
		JSGAME.SHARED.timing._then = JSGAME.SHARED.timing.now - (JSGAME.SHARED.timing.delta % JSGAME.SHARED.timing.interval);

		// *** Update the effective average framerate. (Can be displayed to the user/debug.) ***
		JSGAME.SHARED.fps.tick();

		// *** Update the logic and graphics states.
		// try{
			game.loop();
		// }
		// catch(e){
			// let str = ["=E= gameloop: Error in game.loop: ", game.gamestate, e ];
			// console.log(str, game.gamestate, e);
			// throw Error(str);
		// }
	}
	else{
		// *** DEBUG ***

		// Allow the DEBUG loop if JSGAME.FLAGS.allowDebugToRun is set.
		if(JSGAME.FLAGS.allowDebugToRun){
			// Control how often the debug display is updated.
			// NOTE: Time includes the last frame drawn.
			let last                       = game.DEBUG.VALS.lastDebugDisplay           ;
			let timeSince                  = performance.now() - last                   ;
			let secondsToWait_debugDisplay = game.DEBUG.VALS.secondsToWait_debugDisplay ;

			// Update the debug display?
			if(timeSince >= (JSGAME.SHARED.timing.interval * core.SETTINGS.fps) * secondsToWait_debugDisplay ){
				// Run the debug display.
				// try{
					game.DEBUG.updateDebugDisplay();
					game.DEBUG.VALS.lastDebugDisplay=performance.now();
				// }
				// catch(e){
					// let str = ["=E= gameloop: Error in updateDebugDisplay: ", game.gamestate, e ];
					// console.log(str, game.gamestate, e);
					// throw Error(str);
				// }

				// Clear allowDebugToRun. It will be set again after update_allLayers completes.
				JSGAME.FLAGS.allowDebugToRun=false;
			}
		}

		// *** Networking ***
		//

		// *** Game loop. (Run this function again.) ***
		JSGAME.SHARED.raf_id = requestAnimationFrame( game.gameloop );
	}

};
//
game.stateManager = function(){
	// Run the main function for the gamestate (if it exists.)
	if(game.gs[game.gamestate]){ game.gs[game.gamestate].main(); }

	// Error!
	else{
		let str = ["=E= stateManager: Invalid game.gamestate: ", game.gamestate ];
		console.log(str, game.gamestate);
		throw Error(str);
	}
};

