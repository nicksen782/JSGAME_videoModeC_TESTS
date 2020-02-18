game.DEBUG       = {} ;
game.DEBUG.DOM   = {} ;
game.DEBUG.VALS  = {} ;
game.DEBUG.TESTS = {} ;
game.DEBUG.NAV   = {} ;

//
game.DEBUG.init = function(){
	// DEBUG DOM CACHE
	game.DEBUG.DOM["DEBUG_DIV"]      = document.getElementById("DEBUG_DIV");
	game.DEBUG.DOM["debug_mode_chk"] = document.getElementById("debug_mode");

	// Display of the performance.
	game.DEBUG.DOM["avg_BG"]     = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#avg_BG");
	game.DEBUG.DOM["avg_SPRITE"] = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#avg_SPRITE");
	game.DEBUG.DOM["avg_TEXT"]   = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#avg_TEXT");
	game.DEBUG.DOM["avg_FADE"]   = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#avg_FADE");
	game.DEBUG.DOM["avg_OUTPUT"] = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#avg_OUTPUT");
	game.DEBUG.DOM["avg_TOTAL"]  = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#avg_TOTAL");
	game.DEBUG.DOM["avg_LOGIC"]  = game.DEBUG.DOM["DEBUG_DIV"].querySelector("#avg_LOGIC");

	// Set flags and counters.
	game.DEBUG.VALS.lastDebugDisplay=performance.now();  //
	game.DEBUG.VALS.secondsToWait_debugDisplay = 1; // 1 equals 1 second.

	// *** Show the debug div. ***

	// Set the normal site container to inline-block.
	// Remove the hidden and noSelect classes from the debug DOM.
	JSGAME.DOM["siteContainerDiv"].classList.add("inline_block");
	JSGAME.DOM["sideDiv"].classList.remove("hide");
	game.DEBUG.DOM["DEBUG_DIV"].classList.remove("hidden");
	game.DEBUG.DOM["DEBUG_DIV"].classList.remove("noSelect");

	// Allow activing or de-activating the debug functions.
	game.DEBUG.DOM["debug_mode_chk"].addEventListener("change", function(){
		// Change the debug flag per the checked value of the checkbox.
		JSGAME.FLAGS.debug = this.checked;

		// Adjust the DEBUG_DIV visibility.
		if(JSGAME.FLAGS.debug){
			game.DEBUG.DOM["DEBUG_DIV"].classList.remove("notActive");
			game.DEBUG.DOM["DEBUG_DIV"].classList.remove("noSelect");
		}
		else{
			game.DEBUG.DOM["DEBUG_DIV"].classList.add("notActive");
			game.DEBUG.DOM["DEBUG_DIV"].classList.add("noSelect");
		}
	}, false);


	// *****************
	// *****************
	game.DEBUG.DOM["DEBUG_MENU_DIV_0"] = document.getElementById("DEBUG_MENU_DIV_0");

	game.DEBUG.DOM["DEBUG_MENU_DIV_1"] = document.getElementById("DEBUG_MENU_DIV_1");
	game.DEBUG.DOM["DEBUG_setToUpdate"] = document.getElementById("DEBUG_setToUpdate");
	game.DEBUG.DOM["DEBUG_forceRedraws"] = document.getElementById("DEBUG_forceRedraws");

	game.DEBUG.DOM["DEBUG_MENU_DIV_2"] = document.getElementById("DEBUG_MENU_DIV_2");

	// *****************
	// *****************

	// Populate DEBUG_setToUpdate.
	let populate_DEBUG_setToUpdate = function(){
		let span = document.createElement("span");
		span.classList.add("widespan1");
		span.innerText="SET LAYER TO UPDATE:";
		game.DEBUG.DOM["DEBUG_setToUpdate"].appendChild(span);

		// For each layer:
		for(let c=0; c<core.SETTINGS.layerDrawOrder.length; c+=1){
			let layerName = core.SETTINGS.layerDrawOrder[c]    ;
			let button = document.createElement("button");
			button.innerText="(" + layerName + ")";
			button.onclick=function(){ game.DEBUG.forceUpdate(layerName); };

			game.DEBUG.DOM["DEBUG_setToUpdate"].appendChild(button);
			// game.DEBUG.DOM["DEBUG_setToUpdate"].appendChild(document.createElement("br"));
		}
	};
	// Populate DEBUG_forceRedraws.
	let populate_DEBUG_forceRedraws = function(){
		let span = document.createElement("span");
		span.classList.add("widespan1");
		span.innerText="SET LAYER TO REDRAW:";
		game.DEBUG.DOM["DEBUG_forceRedraws"].appendChild(span);

		// For each layer:
		for(let c=0; c<core.SETTINGS.layerDrawOrder.length; c+=1){
			let layerName = core.SETTINGS.layerDrawOrder[c]    ;
			let button = document.createElement("button");
			button.innerText="(" + layerName + ")";
			button.onclick=function(){ game.DEBUG.forceRedraw(layerName); };

			game.DEBUG.DOM["DEBUG_forceRedraws"].appendChild(button);
			// game.DEBUG.DOM["DEBUG_forceRedraws"].appendChild(document.createElement("br"));
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
game.DEBUG.NAV.debug_showPanel  = function(panel_id, elem){
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
game.DEBUG.NAV.debug_hidePanels = function(){
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

game.DEBUG.drawFlagsToConsole = function(){
	console.log(
		""  , ( core.GRAPHICS.flags.BG         == true ? 'BG         : TRUE' :'BG         :     ' ),
		"\n", ( core.GRAPHICS.flags.SPRITE     == true ? 'SPRITE     : TRUE' :'SPRITE     :     ' ),
		"\n", ( core.GRAPHICS.flags.TEXT       == true ? 'TEXT       : TRUE' :'TEXT       :     ' ),
		"\n", ( core.GRAPHICS.flags.FADE       == true ? 'FADE       : TRUE' :'FADE       :     ' ),
		"\n", ( core.GRAPHICS.flags.OUTPUT     == true ? 'OUTPUT     : TRUE' :'OUTPUT     :     ' ),
		"\n", ( core.GRAPHICS.FADER.fadeActive == true ? 'fadeActive : TRUE' :'fadeActive :     ' ),
		""
	);
};

// *** DEBUG DISPLAY UPDATES ***

game.DEBUG.forceUpdate = function(layer){
	core.GRAPHICS.DATA.FLAGS[layer].UPDATE=true;
};
game.DEBUG.forceRedraw = function(layer){
	let VRAM      = core.GRAPHICS.DATA.VRAM[layer]         ;
	for(let i in VRAM){ VRAM[i].drawThis=true; }

	core.GRAPHICS.DATA.FLAGS[layer].REDRAW=true;
};

// Used by game.DEBUG.updateDebugDisplay.
game.DEBUG.updateDebugDisplay_funcs = {
	//
	layerDataInfo : function(){
		let elem = document.getElementById("DEBUG_performance_table1");

		let output="";

		// Get a list of the canvas layers.
		let keys = Object.keys(core.GRAPHICS.performance.LAYERS);

		let sum = function(a,c){ return a + c; }

		//
		for(let k=0; k<keys.length; k+=1){
			let key=keys[k];
			let rec = core.GRAPHICS.performance.LAYERS[key] ;
			let avg;

			try{
				if(rec.length){
					avg = rec.reduce(sum) / rec.length;
					avg = avg.toFixed(2).padStart(6, " ");
				}
				else{
					console.log("DEBUG: rec did not have a length.", key, rec);
					return;
				}
			}
			catch(e){
				// console.log(e, core.GRAPHICS.performance.LAYERS[key]);
				let str = ["=E= DEBUG layerDataInfo:", e, key, core.GRAPHICS.performance.LAYERS[key]];
				console.log(str);
				throw Error(str);
				return;
			}

			let recs = rec.map(function(d){ return d.toFixed(2).padStart(6, " "); });
			recs = recs.join(", ");

			let text = "";
			text +="";
			text +="";

			output+="<div class='DEBUG_layerDataInfo_div_cont'>";

				// Label:
				output+="<span class='DEBUG_layerDataInfo_span_label'>";
				output+="<b><u>"+key+"</u></b>";
				output+="";
				output+="</span>";

				// Data1:
				output+="<span class='DEBUG_layerDataInfo_span_data1'>";
				output+=("<b><u>AVG:</u></b> "+avg+" ms, ");
				output+="</span>";

				// Data2:
				output+="<span class='DEBUG_layerDataInfo_span_data2'>";
				output+="<b></u>DATA:</u></b> "+recs+"";
				output+="</span>";

			output+="</div>\n";

			// Add the text to the output.
			output+=text;
		}

		output='<div class="">'+output+'</div>';

		elem.innerHTML=output;
	},
};

// Visual showing the layers split up.
game.DEBUG.showIndividualLayers = function(){
	let elem = document.getElementById("DEBUG_LAYERS_table1");

	if(elem.getAttribute("init")=="false"){
		let div = document.createElement("div");

		for(let c=0; c<core.SETTINGS.layerDrawOrder.length; c+=1){
			let layerName = core.SETTINGS.layerDrawOrder[c] ;
			let canvas    = core.GRAPHICS.canvas[layerName] ;
			let ctx       = core.GRAPHICS.ctx[layerName] ;
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

			// Update the last update times.
			lastUpdate_div.innerText="Last Update: " + lastUpdate;
			lastUpdate_div.setAttribute( "prev_lastUpdate", lastUpdate );


			// div2.innerText=layerName +"("+VRAM_len+")";

			// Update the canvas.
			let src_canvas      = core.GRAPHICS.canvas[layerName];
			let dest_canvas     = DEBUG_canvases[c];
			let dest_canvas_ctx = DEBUG_canvases[c].getContext("2d");
			dest_canvas_ctx.clearRect(0,0, src_canvas.width, src_canvas.height);
			dest_canvas_ctx.drawImage(src_canvas, 0, 0);
		}
	}

};

// Called periodically to update the displayed debug information.
game.DEBUG.updateDebugDisplay = function(){
	// PERFORMANCE DISPLAY (AVG TIMINGS)
	game.DEBUG.updateDebugDisplay_funcs.layerDataInfo();

	// START
	if(game.DEBUG.DOM["DEBUG_MENU_DIV_0"].classList.contains("active")){
	}

	// CORE
	if(game.DEBUG.DOM["DEBUG_MENU_DIV_1"].classList.contains("active")){
	}

	// LAYERS
	if(game.DEBUG.DOM["DEBUG_MENU_DIV_2"].classList.contains("active")){
		game.DEBUG.showIndividualLayers();
	}

	// Update the debug_updateIndicator
	debug_updateIndicator=document.getElementById("debug_updateIndicator");
	if     (debug_updateIndicator.innerText=="!"){ debug_updateIndicator.innerText="." }
	else if(debug_updateIndicator.innerText=="."){ debug_updateIndicator.innerText="!" }
}

// *** GAME-SPECIFIC DEBUG TESTS ***
