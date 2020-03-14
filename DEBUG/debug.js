// ==============================
// ==== FILE START: debug.js ====
// ==============================

'use strict';

game.DEBUG       = {} ;
game.DEBUG.DOM   = {} ;
game.DEBUG.VALS  = {} ;
game.DEBUG.TESTS = {} ;
game.DEBUG.NAV   = {} ;

//
game.DEBUG.init                     = function(){
	// DEBUG DOM CACHE
	game.DEBUG.DOM.DEBUG_DIV      = document.getElementById("DEBUG_DIV");
	game.DEBUG.DOM.debug_mode_chk = document.getElementById("debug_mode");

	// Set flags and counters.
	game.DEBUG.VALS.lastDebugDisplay=performance.now();  //
	game.DEBUG.VALS.secondsToWait_debugDisplay = 0.5; // 1.0 equals 1 second.

	// *** Show the debug div. ***

	// Set the normal site container to inline-block.
	// Remove the hidden and noSelect classes from the debug DOM.
	JSGAME.DOM.siteContainerDiv.classList.add("inline_block");
	JSGAME.DOM.sideDiv.classList.remove("hide");
	game.DEBUG.DOM.DEBUG_DIV.classList.remove("hidden");
	game.DEBUG.DOM.DEBUG_DIV.classList.remove("noSelect");

	// Allow activing or de-activating the debug functions.
	game.DEBUG.DOM.debug_mode_chk.addEventListener("change", function(){
		// Change the debug flag per the checked value of the checkbox.
		JSGAME.FLAGS.debug = this.checked;

		// Adjust the DEBUG_DIV visibility.
		if(JSGAME.FLAGS.debug){
			game.DEBUG.DOM.DEBUG_DIV.classList.remove("notActive");
			game.DEBUG.DOM.DEBUG_DIV.classList.remove("noSelect");
		}
		else{
			game.DEBUG.DOM.DEBUG_DIV.classList.add("notActive");
			game.DEBUG.DOM.DEBUG_DIV.classList.add("noSelect");
		}
	}, false);

	// *****************
	// *****************

	// START
	game.DEBUG.DOM.DEBUG_MENU_DIV_0   = document.getElementById("DEBUG_MENU_DIV_0");

	// CORE
	game.DEBUG.DOM.DEBUG_MENU_DIV_1   = document.getElementById("DEBUG_MENU_DIV_1");
	game.DEBUG.DOM.DEBUG_setToUpdate  = document.getElementById("DEBUG_setToUpdate");
	game.DEBUG.DOM.DEBUG_forceRedraws = document.getElementById("DEBUG_forceRedraws");

	// LAYERS
	game.DEBUG.DOM.DEBUG_MENU_DIV_2   = document.getElementById("DEBUG_MENU_DIV_2");

	// COLOR SELECTOR
	game.DEBUG.DOM.DEBUG_MENU_DIV_3   = document.getElementById("DEBUG_MENU_DIV_3");

	// VARS DISPLAY
	game.DEBUG.DOM.DEBUG_MENU_DIV_4   = document.getElementById("DEBUG_MENU_DIV_4");

	// *****************
	// *****************

	// Populate DEBUG_setToUpdate.
	let populate_DEBUG_setToUpdate = function(){
		let span = document.createElement("span");
		span.classList.add("widespan1");
		span.innerText="SET LAYER TO UPDATE:";
		game.DEBUG.DOM.DEBUG_setToUpdate.appendChild(span);

		// For each layer:
		for(let c=0; c<_CS.layerDrawOrder.length; c+=1){
			let layerName = _CS.layerDrawOrder[c]    ;
			let button = document.createElement("button");
			button.innerText="(" + layerName + ")";
			button.onclick=function(){ game.DEBUG.forceUpdate(layerName); };

			game.DEBUG.DOM.DEBUG_setToUpdate.appendChild(button);
			// game.DEBUG.DOM["DEBUG_setToUpdate"].appendChild(document.createElement("br"));
		}
	};
	// Populate DEBUG_forceRedraws.
	let populate_DEBUG_forceRedraws = function(){
		let span = document.createElement("span");
		span.classList.add("widespan1");
		span.innerText="SET LAYER TO REDRAW:";
		game.DEBUG.DOM.DEBUG_forceRedraws.appendChild(span);

		// For each layer:
		for(let c=0; c<_CS.layerDrawOrder.length; c+=1){
			let layerName = _CS.layerDrawOrder[c]    ;
			let button = document.createElement("button");
			button.innerText="(" + layerName + ")";
			button.onclick=function(){ game.DEBUG.forceRedraw(layerName); };

			game.DEBUG.DOM.DEBUG_forceRedraws.appendChild(button);
			// game.DEBUG.DOM.DEBUG_forceRedraws.appendChild(document.createElement("br"));
		}

	};
	populate_DEBUG_setToUpdate();
	populate_DEBUG_forceRedraws();

	// Remove the init function since it is no longer needed.
	delete game.DEBUG.init;

	console.log("DEBUG MODE ACTIVE");
};

// *** DEBUG NAVIGATION MENU ***

// Show a clicked panel.
game.DEBUG.NAV.debug_showPanel      = function(panel_id, elem){
	// Attempt to get a DOM handle to the specified panel.
	let specifiedPanel = document.getElementById(panel_id);

	// Was it found? Show it.
	if(specifiedPanel){
		// Hide all first.
		game.DEBUG.NAV.debug_hidePanels();

		// Show this panel.
		specifiedPanel.classList.add("active");

		// Set the clicked button as active.
		if(elem){ elem.classList.add("active"); }
	}
	// Not found? Error!
	else{
		console.log("panel not found!");
	}
};
// Hide all panels.
game.DEBUG.NAV.debug_hidePanels     = function(){
	// Hide panels.
	let panels = document.querySelectorAll('.DEBUG_DIV_MENU_DIVS');
	for(let i=0; i<panels.length; i+=1){
		panels[i].classList.remove("active");
	}

	// Remove the active class from the buttons.
	let debug_navButtons = document.querySelectorAll('.debugPanelButtons');
	for(let i=0; i<debug_navButtons.length; i+=1){
		debug_navButtons[i].classList.remove("active");
	}
};

// *** DEBUG FUNCTIONS ***

// *** DEBUG DISPLAY UPDATES ***

game.DEBUG.forceUpdate              = function(layer){
	// Set the UPDATE flag for the specified layer.
	core.GRAPHICS.DATA.FLAGS[layer].UPDATE=true;
};
game.DEBUG.forceRedraw              = function(layer){
	// let VRAM      = core.GRAPHICS.DATA.VRAM[layer] ;
	// for(let i in VRAM){ VRAM[i].drawThis=true; }

	// Set the REDRAW flag for this layer.
	core.GRAPHICS.DATA.FLAGS[layer].REDRAW=true;
};

// Used by game.DEBUG.updateDebugDisplay.
game.DEBUG.updateDebugDisplay_funcs = {
	layerDataInfo_init:false,
	layerDataInfo_data:{
		"gameloop_timings" : { "displayThis":true, "r":null, "l":null, "d":null, "i":""          } , // Full measurement of the game loop (logic, draw, etc.)
		"logic_timings"    : { "displayThis":true, "r":null, "l":null, "d":null, "i":"  -> "     } , // Measurement of specifically the logic_timings of the gameloop.
		"gfx_timings"      : { "displayThis":true, "r":null, "l":null, "d":null, "i":"  -> "     } , // Full measurement of graphics updates.

		"update_layers"    : { "displayThis":true, "r":null, "l":null, "d":null, "i":"    -> "   } , // Measurement of time for all layers.

		"layer_BG1"        : { "displayThis":true, "r":null, "l":null, "d":null, "i":"      -> " } , // Measurement of time for all layers.
		"layer_BG2"        : { "displayThis":true, "r":null, "l":null, "d":null, "i":"      -> " } , // Measurement of time for all layers.
		"layer_TEXT"       : { "displayThis":true, "r":null, "l":null, "d":null, "i":"      -> " } , // Measurement of time for all layers.
		"layer_SP1"        : { "displayThis":true, "r":null, "l":null, "d":null, "i":"      -> " } , // Measurement of time for all layers.

		"layer_combines"   : { "displayThis":true, "r":null, "l":null, "d":null, "i":"    -> "   } , // Measurement of the layer combine time.
		"fade_timings"     : { "displayThis":true, "r":null, "l":null, "d":null, "i":"    -> "   } , // Measurement of the fade time.
		"output_timings"   : { "displayThis":true, "r":null, "l":null, "d":null, "i":"    -> "   } , // Measurement of the final graphics output time.

		"topbar1"          : { "displayThis":true, "r":null, "l":null, "d":null, "i":""          } , //
		"topbar2"          : { "displayThis":true, "r":null, "l":null, "d":null, "i":""          } , //
		"debug_timings"    : { "displayThis":true, "r":null, "l":null, "d":null, "i":""          } ,  // Measurement of the debug loop (which happens when the main loop does not run.)
		"doColorSwapping"  : { "displayThis":true, "r":null, "l":null, "d":null, "i":""          } , // Measurement of web-worker-based color swapping.
	},
	layerDataInfo_keys:{},
	//
	layerDataInfo : function(){
		// return;
		let elem = document.getElementById("DEBUG_performance_table1");

		// Set up the table if it has not yet been set up.
		if(! game.DEBUG.updateDebugDisplay_funcs.layerDataInfo_init){
			let frag = document.createDocumentFragment();

			// Save the keys.
			game.DEBUG.updateDebugDisplay_funcs.layerDataInfo_keys = Object.keys(game.DEBUG.updateDebugDisplay_funcs.layerDataInfo_data) ;
			let keys = game.DEBUG.updateDebugDisplay_funcs.layerDataInfo_keys ;

			for(let i=0; i<keys.length; i+=1){
				let key = keys[i];
				let rec = game.DEBUG.updateDebugDisplay_funcs.layerDataInfo_data[key];

				if(!rec.displayThis){ continue; }

				let div_cont   = document.createElement("div");
				let span_label = document.createElement("span");
				let span_data1 = document.createElement("span");

				div_cont.classList.add("DEBUG_layerDataInfo_div_cont");

				span_label.classList.add("DEBUG_layerDataInfo_span_label");
				span_label.innerText=(rec.i+key).toUpperCase();

				span_data1.classList.add("DEBUG_layerDataInfo_span_data1");

				// The default text differs for the topbar1 and topbar2.
				if(key=="topbar1" || key=="topbar2"){ span_data1.innerText="------------------";      }
				else                                { span_data1.innerText="AVG:  000.00% (000%) |>"; }

				// Add DOM references to the object.
				rec.r = div_cont;
				rec.l = span_label;
				rec.d = span_data1;
				// rec.i = rec.i;

				// Add the rows.
				div_cont.appendChild(span_label);
				div_cont.appendChild(span_data1);
				frag    .appendChild(div_cont);
			}
			game.DEBUG.updateDebugDisplay_funcs.layerDataInfo_init=true;

			elem.appendChild(frag);
			return;
		}

		// Used for getting an average.
		let sum = function(a,c){ return a + c; } ;

		// Update the info.
		let keys = game.DEBUG.updateDebugDisplay_funcs.layerDataInfo_keys ;

		for(let i=0; i<keys.length; i+=1){
			let key = keys[i];
			let rec = game.DEBUG.updateDebugDisplay_funcs.layerDataInfo_data[key];

			if(!rec.displayThis){ continue; }

			let span_data1 = rec.d ;

			if(key=="topbar1" || key=="topbar2"){
				// let topBarStatus = document.getElementById("debug_updateIndicator5");
				if     (key=="topbar1"){
					let str = "" +
						("(I"        + ": " + ((game.DEBUG.lastloopTimings.interval).toFixed(2) + "ms"+") " ).padStart(1, " ")).padEnd(1, " ") + ", " +
						("(BETWEEN"  + ": " + ((game.DEBUG.lastloopTimings.time    ).toFixed(2) + "ms"+") " ).padStart(1, " ")).padEnd(1, " ") + ", " +
						("(P"        + ": " + ((game.DEBUG.lastloopTimings.percent ).toFixed(2) + "%" +") " ).padStart(1, " ")).padEnd(1, " ") + ", " +
						// ("(CFPS" + ": " + ((game.DEBUG.lastloopTimings.calcFPS ).toFixed(2) + ""  +") " ).padStart(1, " ")).padEnd(1, " ") + ", " +
						// ("(SFPS" + ": " + ((game.DEBUG.lastloopTimings.setFPS  ).toFixed(2) + ""  +") " ).padStart(1, " ")).padEnd(1, " ") + "  " +
						""
					;
					span_data1.innerText = str;
				}
				else if(key=="topbar2"){
					let str = "" +
						// ("(I"    + ": " + ((game.DEBUG.lastloopTimings.interval).toFixed(2) + "ms"+") " ).padStart(1, " ")).padEnd(1, " ") + ", " +
						// ("(TSL"  + ": " + ((game.DEBUG.lastloopTimings.time    ).toFixed(2) + "ms"+") " ).padStart(1, " ")).padEnd(1, " ") + ", " +
						// ("(P"    + ": " + ((game.DEBUG.lastloopTimings.percent ).toFixed(2) + "%" +") " ).padStart(1, " ")).padEnd(1, " ") + ", " +
						("(CFPS" + ": " + ((game.DEBUG.lastloopTimings.calcFPS ).toFixed(2) + ""  +") " ).padStart(1, " ")).padEnd(1, " ") + ", " +
						("(SFPS" + ": " + ((game.DEBUG.lastloopTimings.setFPS  ).toFixed(2) + ""  +") " ).padStart(1, " ")).padEnd(1, " ") + "  " +
						""
					;
					span_data1.innerText = str;
				}
			}
			else{
				// let div_cont   = rec.r ;
				// let span_label = rec.l ;
				// let span_data1 = rec.d ;
				// let pre_indent = rec.i ;

				let src_data;
				// src_data = core.GRAPHICS.performance[key];
				try{ src_data = core.GRAPHICS.DEBUG[key].durs; } catch(err){ continue; }
				// src_data = core.GRAPHICS.performance.LAYERS[key]

				let org_avg;
				let avg;

				// Try to get the average of the time measurements for this key.
				try{
					if(src_data.length){
						avg = src_data.reduce(sum) / src_data.length;
						org_avg = avg;
						avg = avg.toFixed(2).padStart(6, " ");
					}
					else{
						// console.log("DEBUG: src_data did not have a length.", key, src_data);
						continue;
					}
				}
				catch(e){
					// console.log(e, core.GRAPHICS.performance.LAYERS[key]);
					let str = ["=E= DEBUG layerDataInfo:", e, key, core.GRAPHICS.performance.LAYERS[key]];
					console.log("***************", key, str);
					throw Error(str);
					return;
				}

				// span_data1
				// Determine the "graphical" level.

				let bg_css="";
				let level;
				let org_compareNum = (org_avg/JSGAME.SHARED.timing.interval)*100 << 0;
				// console.log(org_compareNum);

				let compareNum = JSGAME.SHARED.map_range(org_compareNum, 0, 100, 0, 26) << 0;
				// compareNum=111;
				// console.log(key, org_compareNum, compareNum);

				if     ( org_compareNum >= 0  && org_compareNum < 15  ) { level="L0 |"+"-".repeat( ( Math.min(compareNum,26) ) )+">"; bg_css="DEBUG_clear";        }
				else if( org_compareNum >= 15 && org_compareNum < 30  ) { level="L1 |"+"-".repeat( ( Math.min(compareNum,26) ) )+">"; bg_css="DEBUG_indeterminate";}
				else if( org_compareNum >= 30 && org_compareNum < 45  ) { level="L2 |"+"-".repeat( ( Math.min(compareNum,26) ) )+">"; bg_css="DEBUG_warning";      }
				else if( org_compareNum >= 45 && org_compareNum < 60  ) { level="L3 |"+"-".repeat( ( Math.min(compareNum,26) ) )+">"; bg_css="DEBUG_minor";        }
				else if( org_compareNum >= 60 && org_compareNum < 75  ) { level="L4 |"+"-".repeat( ( Math.min(compareNum,26) ) )+">"; bg_css="DEBUG_major";        }
				else if( org_compareNum >= 75 && org_compareNum < 95  ) { level="L5 |"+"=".repeat( ( Math.min(compareNum,26) ) )+">"; bg_css="DEBUG_critical";     }
				else                                                    { level="L6 |"+'='.repeat( ( Math.min(compareNum,26) ) )+">"; bg_css="DEBUG_tooLong";     }

				span_data1.classList.remove("DEBUG_clear");
				span_data1.classList.remove("DEBUG_indeterminate");
				span_data1.classList.remove("DEBUG_warning");
				span_data1.classList.remove("DEBUG_minor");
				span_data1.classList.remove("DEBUG_major");
				span_data1.classList.remove("DEBUG_critical");
				span_data1.classList.remove("DEBUG_tooLong");
				span_data1.classList.add(bg_css);
				span_data1.setAttribute("title", bg_css);

				let avg_txt       = "AVG:" + (avg.toString()).padStart(7, " ") + " ms";
				let compareNum_txt = ("("+org_compareNum+"%)").padStart(7, " ");
				let level_txt = " " + level;

				span_data1.innerText = "" +
				"" + avg_txt        + "" +
				"" + compareNum_txt + "" +
				"" + level_txt      + "" +
				""
				;
			}

		}
	},
};

// Visual showing the layers split up.
game.DEBUG.showIndividualLayers     = function(){
	let elem = document.getElementById("DEBUG_LAYERS_table1");

	if(elem.getAttribute("init")=="false"){
		let div = document.createElement("div");

		for(let c=0; c<_CS.layerDrawOrder.length; c+=1){
			let layerName = _CS.layerDrawOrder[c] ;
			let canvas    = core.GRAPHICS.canvas[layerName] ;
			// let ctx       = core.GRAPHICS.ctx[layerName] ;
			let VRAM_len;

			if     (core.GRAPHICS.DATA.FLAGS[layerName].type=="VRAM")  {
				VRAM_len = core.GRAPHICS.DATA.VRAM[layerName].length;
			}
			else if(core.GRAPHICS.DATA.FLAGS[layerName].type=="SPRITE"){
				VRAM_len = core.GRAPHICS.DATA.SPRITES[layerName].length;
			}

			let div2=document.createElement("div");
			let div3=document.createElement("div");
			let br1=document.createElement("br");
			let span1=document.createElement("span");

			// Create the canvas.
			let newCanvas = document.createElement("canvas");
			newCanvas.width = canvas.width;
			newCanvas.height = canvas.height;
			JSGAME.SHARED.setpixelated(newCanvas);
			newCanvas.classList.add("DEBUG_canvas");
			newCanvas.setAttribute("layer", layerName);
			newCanvas.setAttribute("title", layerName);
			newCanvas.id="DEBUG_"+layerName;

			div2.innerText=layerName ;
			span1.innerText=" (VRAM_len: "+VRAM_len+")";
			// span1.innerText=" (VRAM_len: "+VRAM_len+", TS:"+Object.keys(_CGA.tilemaps['_textstrings']).length+")";
			span1.classList.add("DEBUG_VRAM_len");

			// let prev_lastUpdate = performance.now();
			let prev_lastUpdate = core.GRAPHICS.DATA.FLAGS[layerName].lastUpdate || 0;
			prev_lastUpdate = parseFloat(prev_lastUpdate-1,10).toFixed(2);
			div3.innerText="Last Update: " + prev_lastUpdate;
			div3.setAttribute( "prev_lastUpdate", prev_lastUpdate );

			div2.classList.add("layerDiv2");
			div3.classList.add("layerDiv3");
			div2.appendChild(span1);
			div2.appendChild(br1);
			div2.appendChild(div3);
			div2.appendChild(newCanvas);
			div.append(div2);
		}
		elem.appendChild(div);
		elem.setAttribute("init", "true");
	}

	let DEBUG_canvases = document.querySelectorAll(".DEBUG_canvas");
	for(let c=0; c<DEBUG_canvases.length; c+=1){
		// Get the layer name.
		let layerName       = DEBUG_canvases[c].getAttribute("layer");

		// Get the last updates.
		let lastUpdate_div  = DEBUG_canvases[c].parentElement.querySelector(".layerDiv3");
		let prev_lastUpdate = lastUpdate_div.getAttribute("prev_lastUpdate");
		let lastUpdate      = core.GRAPHICS.DATA.FLAGS[layerName].lastUpdate;

		// Convert the updates to fixed strings.
		prev_lastUpdate = parseFloat(prev_lastUpdate,10).toFixed(2);
		lastUpdate = lastUpdate.toFixed(2);

		// Update the canvas if the update times do not match.
		if(prev_lastUpdate != lastUpdate){
			if(_CGA.tilemaps._textstrings){
				let numTextstrings  = Object.keys(_CGA.tilemaps._textstrings).length ;
				let cnt_div = document.getElementById("DEBUG_layers_textstrings");
				cnt_div.innerText=numTextstrings;
			}

			// Update VRAM_len.
			let VRAM_len_div    = DEBUG_canvases[c].parentElement.querySelector(".DEBUG_VRAM_len");
			let VRAM_len;

			if     (core.GRAPHICS.DATA.FLAGS[layerName].type=="VRAM")  {
				VRAM_len = core.GRAPHICS.DATA.VRAM[layerName].length;
			}
			else if(core.GRAPHICS.DATA.FLAGS[layerName].type=="SPRITE"){
				VRAM_len = core.GRAPHICS.DATA.SPRITES[layerName].length;
			}

			VRAM_len_div.innerText = " (VRAM_len: "+VRAM_len+")";
			// VRAM_len_div.innerText=" (VRAM_len: "+VRAM_len+", TS:"+Object.keys(_CGA.tilemaps['_textstrings']).length+")";

			// Update the last update times.
			lastUpdate_div.innerText="Last Update: " + lastUpdate;
			lastUpdate_div.setAttribute( "prev_lastUpdate", lastUpdate );

			// div2.innerText=layerName +"("+VRAM_len+")";

			// Update the canvas.
			let src_canvas      = core.GRAPHICS.canvas[layerName];
			let dest_canvas     = DEBUG_canvases[c];
			let dest_canvas_ctx = dest_canvas.getContext("2d");
			dest_canvas_ctx.clearRect(0,0, src_canvas.width, src_canvas.height);
			dest_canvas_ctx.drawImage(src_canvas, 0, 0);
		}
	}

};

//
game.DEBUG.showColorOnHover         = {
	hasListeners : false,
	colorTableDrawn : false,

	// Accepts mousemove on the output canvas.
	listener_mousemove : function(e){
		// important: correct mouse position:
		let rect = this.getBoundingClientRect();
		let x = Math.floor((e.clientX - rect.left) / (rect.right  - rect.left) * this.width ) ;
		let y = Math.floor((e.clientY - rect.top)  / (rect.bottom - rect.top)  * this.height) ;

		// let coord = "x=" + x + ", y=" + y;
		let ctx   = this.getContext('2d');
		let pixel = ctx.getImageData(x, y, 1, 1);
		let tile  = ctx.getImageData(x, y, _CS.TILE_WIDTH*4, _CS.TILE_HEIGHT*4);
		// let tile_canvas = document.createElement("canvas");

		let key =
			"#" +
			( (pixel.data[0]).toString(16).padStart(2, "0").toUpperCase() ) +
			( (pixel.data[1]).toString(16).padStart(2, "0").toUpperCase() ) +
			( (pixel.data[2]).toString(16).padStart(2, "0").toUpperCase() )
			// + ( (pixel.data[3]).toString(16).padStart(2, "0").toUpperCase() )
		;

		// Is this valid? Stop if it is not valid.
		let data = {};
		try{
			data = {
				// "uze_dec" : core.GRAPHICS.DATA.lookups.colors.r32_hex[key].uze_dec ,
				"uze_hex" : core.GRAPHICS.DATA.lookups.colors.r32_hex[key].uze_hex ,
				// "rgba"    : core.GRAPHICS.DATA.lookups.colors.r32_hex[key].rgba    ,
				"r32_hex" : core.GRAPHICS.DATA.lookups.colors.r32_hex[key].r32_hex ,
			};
		}
		catch(ex){
			// console.log("----", core.GRAPHICS.DATA.lookups.colors.r32_hex[key], key, ex);
			return;
		}

		// let debug_colorOutput_canvas1 = document.getElementById("debug_colorOutput_canvas1");
		// let debug_colorOutput_canvas2 = document.getElementById("debug_colorOutput_canvas2");
		// let debug_colorOutput         = document.getElementById("debug_colorOutput");
		let debug_colorOutput_canvas1 = document.getElementById("DEBUG_color_hover_preview_canvas1");
		let debug_colorOutput_canvas2 = document.getElementById("DEBUG_color_hover_preview_canvas2");
		let debug_colorOutput         = document.getElementById("DEBUG_color_hover_preview_textinfo");

		// Draw the tile.
		let debug_colorOutput_ctx1    = debug_colorOutput_canvas1.getContext("2d");
		debug_colorOutput_ctx1.putImageData(tile, 0, 0);

		// Draw the pixel.
		let debug_colorOutput_ctx2    = debug_colorOutput_canvas2.getContext("2d");
		debug_colorOutput_ctx2.putImageData(pixel, 0, 0);

		// Output some data.
		// debug_colorOutput.innerHTML = coord + "<br>" + key;
		// debug_colorOutput.innerHTML = "key: " + key;

		let str =
		"<pre>" +
		"DATA: " + JSON.stringify(data,null,1) +
		"</pre>" + "" ;

		debug_colorOutput.innerHTML = str;

		// core.GRAPHICS.DATA.lookups.colors.r32_hex[key]
	},
	// Accepts left-click on the output canvas.
	listener_mousedown1 : function(){
		// If the user clicks the output canvas then the currently highlighted pixel (should be displayed in the pixel canvas) will be "locked".

		// When clicking on the canvas_OUTPUT.

		// Get canvas info.
		let src_canvas = document.querySelector("#DEBUG_color_hover_preview_canvas2");
		let dst_canvas = document.querySelector("#DEBUG_color_hover_preview_source_canvas1");
		let dst_canvas_ctx = dst_canvas.getContext("2d");

		let ctx   = src_canvas.getContext('2d');
		let pixel = ctx.getImageData(0, 0, 1, 1);

		let key =
			"#" +
			( (pixel.data[0]).toString(16).padStart(2, "0").toUpperCase() ) +
			( (pixel.data[1]).toString(16).padStart(2, "0").toUpperCase() ) +
			( (pixel.data[2]).toString(16).padStart(2, "0").toUpperCase() )
			// + ( (pixel.data[3]).toString(16).padStart(2, "0").toUpperCase() )
		;

		// Is this valid? Stop if it is not valid.

		let data = {};
		try{
			data = {
				// "uze_dec" : core.GRAPHICS.DATA.lookups.colors.r32_hex[key].uze_dec ,
				"uze_hex" : core.GRAPHICS.DATA.lookups.colors.r32_hex[key].uze_hex ,
				// "rgba"    : core.GRAPHICS.DATA.lookups.colors.r32_hex[key].rgba    ,
				"r32_hex" : core.GRAPHICS.DATA.lookups.colors.r32_hex[key].r32_hex ,
			};
		}
		catch(ex){
			// console.log("----", core.GRAPHICS.DATA.lookups.colors.r32_hex[key], key, ex);
			return;
		}

		// Update the text info.
		let str =
		"<pre>" +
		"DATA: " + JSON.stringify(data,null,1) +
		"</pre>" + "" ;

		let textinfo = document.getElementById("DEBUG_color_hover_preview_source_textinfo");
		textinfo.innerHTML=str;

		// Draw canvas.
		dst_canvas_ctx.drawImage(src_canvas,0,0);
	},
	// Accepts left-click on the palette canvases and right-click on the output canvas.
	listener_mousedown2 : function(e){
		// If the user clicks one of the destination canvases then the currently highlighted pixel (should be displayed in the pixel canvas) will be "locked".
		let src_canvas ;
		if     (this.id=="canvas_OUTPUT"){
			src_canvas = document.getElementById("DEBUG_color_hover_preview_canvas2");
			e.preventDefault();
		}
		else if( this.classList.contains("debug_colorOutput_tile_canvases") ){ src_canvas = this ; }
		else   { return; }

		// When clicking on destination color choices.

		// Get canvas info.
		let dst_canvas = document.querySelector("#DEBUG_color_hover_preview_destination_canvas1");
		let dst_canvas_ctx = dst_canvas.getContext("2d");

		let ctx   = src_canvas.getContext('2d');
		let pixel = ctx.getImageData(0, 0, 1, 1);

		let key =
			"#" +
			( (pixel.data[0]).toString(16).padStart(2, "0").toUpperCase() ) +
			( (pixel.data[1]).toString(16).padStart(2, "0").toUpperCase() ) +
			( (pixel.data[2]).toString(16).padStart(2, "0").toUpperCase() )
			// + ( (pixel.data[3]).toString(16).padStart(2, "0").toUpperCase() )
		;

		// Is this valid? Stop if it is not valid.

		let data = {};
		try{
			data = {
				// "uze_dec" : core.GRAPHICS.DATA.lookups.colors.r32_hex[key].uze_dec ,
				"uze_hex" : core.GRAPHICS.DATA.lookups.colors.r32_hex[key].uze_hex ,
				// "rgba"    : core.GRAPHICS.DATA.lookups.colors.r32_hex[key].rgba    ,
				"r32_hex" : core.GRAPHICS.DATA.lookups.colors.r32_hex[key].r32_hex ,
			};
		}
		catch(ex){
			// console.log("----", core.GRAPHICS.DATA.lookups.colors.r32_hex[key], key, ex);
			return;
		}

		// Update the text info.
		let str =
		"<pre>" +
		"DATA: " + JSON.stringify(data,null,1) +
		"</pre>" + "" ;

		let textinfo = document.getElementById("DEBUG_color_hover_preview_destination_textinfo");
		textinfo.innerHTML=str;

		// Draw canvas.
		dst_canvas_ctx.drawImage(src_canvas,0,0);
	},
	// Add all required listeners.
	add_listeners    : function(){
		// Set the hasListeners flag.
		game.DEBUG.showColorOnHover.hasListeners=true;

		// Add the color table.
		if(!game.DEBUG.showColorOnHover.colorTableDrawn){
			// debug_colorOutput_canvas_div
			// core.GRAPHICS.DATA.lookups.colors.r32_hex
			// core.GRAPHICS.DATA.lookups.colors.r32_hex

			game.DEBUG.showColorOnHover.colorTableDrawn=true;

			let keys = Object.keys(core.GRAPHICS.DATA.lookups.colors.r32_hex);

			let frag = document.createDocumentFragment();

			let i=0;
			for(let y=0; y<16; y+=1){
				for(let x=0; x<16; x+=1){
					let key = keys[i];
					if(!key){ break; }

					let uze_hex = core.GRAPHICS.DATA.lookups.colors.r32_hex[key].uze_hex;

					let canvas=document.createElement("canvas");
					canvas.classList.add("debug_colorOutput_tile_canvases");
					canvas.setAttribute("title", "RGB HEX: " + key + ", uze_hex: "+ uze_hex);
					canvas.width  = _CS.TILE_WIDTH;
					canvas.height = _CS.TILE_HEIGHT;
					let ctx=canvas.getContext("2d");
					ctx.fillStyle = key;
					ctx.fillRect(0, 0, canvas.width, canvas.height);

					i+=1;

					frag.appendChild(canvas);
				}
				let br = document.createElement("br");
				frag.appendChild(br);
			}

			let debug_colorOutput_canvas_div = document.getElementById("debug_colorOutput_canvas_div");
			debug_colorOutput_canvas_div.appendChild(frag);
		}

		// Add the mousemove listener. (canvas_OUTPUT)
		core.GRAPHICS.canvas.OUTPUT.addEventListener("mousemove", game.DEBUG.showColorOnHover.listener_mousemove, false);

		// Add the mousedown listener. (canvas_OUTPUT)
		core.GRAPHICS.canvas.OUTPUT.addEventListener("mousedown"  , game.DEBUG.showColorOnHover.listener_mousedown1, false);

		// Add the contextmenu listener. (canvas_OUTPUT)
		core.GRAPHICS.canvas.OUTPUT.addEventListener("contextmenu", game.DEBUG.showColorOnHover.listener_mousedown2, false);

		// Add the mousedown listener for all the .debug_colorOutput_tile_canvases .
		let canvases = document.querySelectorAll(".debug_colorOutput_tile_canvases");
		for(let i=0; i<canvases.length; i+=1){
			let canvas = canvases[i];
			canvas.addEventListener("mousedown", game.DEBUG.showColorOnHover.listener_mousedown2, false);
		}
	},
	// Remove all required listeners.
	remove_listeners : function(){
		// Clear the hasListeners flag.
		game.DEBUG.showColorOnHover.hasListeners=false;

		// Remove the mousemove listener. (canvas_OUTPUT)
		core.GRAPHICS.canvas.OUTPUT.removeEventListener("mousemove", game.DEBUG.showColorOnHover.listener_mousemove, false);

		// Remove the mousedown listener. (canvas_OUTPUT)
		core.GRAPHICS.canvas.OUTPUT.removeEventListener("mousedown", game.DEBUG.showColorOnHover.listener_mousedown1, false);

		// Remove the contextmenu listener. (canvas_OUTPUT)
		core.GRAPHICS.canvas.OUTPUT.removeEventListener("contextmenu", game.DEBUG.showColorOnHover.listener_mousedown2, false);

		// Remove the mousedown listener for all the .debug_colorOutput_tile_canvases .
		let canvases = document.querySelectorAll(".debug_colorOutput_tile_canvases");
		for(let i=0; i<canvases.length; i+=1){
			let canvas = canvases[i];
			canvas.removeEventListener("mousedown", game.DEBUG.showColorOnHover.listener_mousedown2, false);
		}
	},
};

// Called periodically to update the displayed debug information.
game.DEBUG.updateDebugDisplay       = function(){
	// PERFORMANCE DISPLAY (AVG TIMINGS)
	game.DEBUG.updateDebugDisplay_funcs.layerDataInfo();

	// START
	// if(game.DEBUG.DOM.DEBUG_MENU_DIV_0.classList.contains("active")){
	// }

	// CORE
	// if(game.DEBUG.DOM.DEBUG_MENU_DIV_1.classList.contains("active")){
	// }

	// LAYERS
	if(game.DEBUG.DOM.DEBUG_MENU_DIV_2.classList.contains("active")){
		game.DEBUG.showIndividualLayers();
	}

	// COLOR SELECTOR
	if(game.DEBUG.DOM.DEBUG_MENU_DIV_3.classList.contains("active")){
		// Add the listener if it is not there.
		if(!game.DEBUG.showColorOnHover.hasListeners){
			console.log("Adding listeners for: showColorOnHover...");
			game.DEBUG.showColorOnHover.add_listeners();
		}
	}
	// Remove the listener if it is there.
	else if(game.DEBUG.showColorOnHover.hasListeners){
		console.log("Removing listeners for: showColorOnHover...");
		game.DEBUG.showColorOnHover.remove_listeners();
	}

	// VARS output.
	if(game.DEBUG.DOM.DEBUG_MENU_DIV_4.classList.contains("active")){
		// Key name (Output to dev console if clicked.)
		// Data (no wrap.
		// game.gs[game.gamestate];
		// game.gamestate;
		// Object.keys(game.gs[game.gamestate])

		// let keys;
		// let gs_key;
		// if     (game.gamestate=="TESTS1"){ gs_key="TESTS1"; keys=["vars", ]; }
		// else if(game.gamestate=="TESTS2"){ gs_key="TESTS2"; keys=["vars", "subMains"]; }
		// else                             { return; }

		// let str = "\nGAMESTATE: " + game.gamestate + "\n";

		// let fields = JSON.parse(JSON.stringify(game.gs[gs_key]));

		// keys.forEach(function(key){
		// 	let thisData     = game.gs[gs_key][key];
		// 	let thisDataKeys = Object.keys(thisData);

		// 	let key_txt = (key+":");
		// 	str += " " + key_txt + "\n";

		// 	thisDataKeys.forEach(function(d_key){
		// 		let innerData = JSON.stringify( thisData[d_key] );

		// 		let innerKeys = [];
		// 		try{ innerKeys = Object.keys(innerData); } catch(e){ innerKeys = [];}

		// 		innerKeys.forEach(function(d){
		// 			let innerkey = innerKeys[d].padEnd(20, " ");
		// 			str += innerkey+" ::: "+JSON.stringify(thisData[d_key],null,0) + "\n";
		// 		});

		// 		// let d_key_txt = (d_key+":");
		// 		// str += "   " + ""+d_key_txt+":" +"\n"+ "    " + innerData + "\n\n";
		// 	});
		// });
		// console.log(str + "\n");
		// throw "test";

		// // fields.forEach(function(d){
		// // 	let type = typeof game.gs[gs_key][d];
		// // 	console.log("---", d, type);
		// // });

		// let elem = document.getElementById("DEBUG_vars_textarea");
		// elem.innerText = str;
	}

	// Update the debug_updateIndicator
	let debug_updateIndicator=document.getElementById("debug_updateIndicator");
	if     (debug_updateIndicator.innerText=="!"){ debug_updateIndicator.innerText="."; }
	else if(debug_updateIndicator.innerText=="."){ debug_updateIndicator.innerText="!"; }
};

//
game.DEBUG.shakeTest                = function(){
	let list = [

		[0,0], [+2,+2], [+1,+1], [0,0], [-1,-1], [-2,-2], [0,0],
		[0,0], [+2,+2], [+1,+1], [0,0], [-1,-1], [-2,-2], [0,0],
		[0,0], [+2,+2], [+1,+1], [0,0], [-1,-1], [-2,-2], [0,0],
		[0,0], [+2,+2], [+1,+1], [0,0], [-1,-1], [-2,-2], [0,0],
		[0,0], [+2,+2], [+1,+1], [0,0], [-1,-1], [-2,-2], [0,0],
		[0,0], [+2,+2], [+1,+1], [0,0], [-1,-1], [-2,-2], [0,0],
		[0,0], [+2,+2], [+1,+1], [0,0], [-1,-1], [-2,-2], [0,0],
		[0,0], [+2,+2], [+1,+1], [0,0], [-1,-1], [-2,-2], [0,0],
		[0,0], [+2,+2], [+1,+1], [0,0], [-1,-1], [-2,-2], [0,0],
		[0,0], [+2,+2], [+1,+1], [0,0], [-1,-1], [-2,-2], [0,0],
		[0,0], [+2,+2], [+1,+1], [0,0], [-1,-1], [-2,-2], [0,0],
		[0,0], [+2,+2], [+1,+1], [0,0], [-1,-1], [-2,-2], [0,0],

	];
	// let index=0;
	let delay=50;

	// for(let r=0; r<10; r+=1){
		for(let i=0; i<list.length; i+=1){
			setTimeout(function(){
				_CGF.adjustOutputOffsets( list[i][0], list[i][1]);
			}, (delay*i));
		}
	// }
};
// *** GAME-SPECIFIC DEBUG TESTS ***

// ============================
// ==== FILE END: debug.js ====
// ============================
