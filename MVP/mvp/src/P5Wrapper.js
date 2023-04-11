import React, { useEffect } from "react";
import Sketch from "react-p5";
import  {ReadParser}  from "./EditorParser"
import consoleFont from "./assets/LucidaConsoleRegular.ttf"
import { objectToString } from "@vue/shared";
import { useState } from "react";

export default (props) => {
	const [font, setFont] = useState();

	//this is where images (and maybe video/sound) is stored
	const [extraMedia, setExtraMedia] = useState(new Map());

	const editedVPL = JSON.parse(JSON.stringify(props.VPLState)); 
	//objects: these are all the nodes that you can see on the vpl 
	//layers: is a list of all the visual component they are rendered from lowest index to highest index
	console.log("p5Wrapper Rerendered");
	const [objects,layers] = ReadParser(props.VPLState, props.sketchNodeIndex);

	
	let needsResizing = false
	//this queues a resize of canvas whenever the sketch VPL component changes its dimensions
	useEffect(() => {
		needsResizing = true;
	}, [props.width, props.height])

	
	//This is where the font is assigned to any text object	
	const checkFont = () =>{
		if(font){
			objects.forEach((object) => {
				if(object.type === "Text") {	
					if(object.font == null){
						object.setFonty(font);
					}
				}  
			});
		}
		else console.log("No font has been loaded uuuuh ooooh!");
	}

	const setSerialisedLayer = (layer) => {
		console.log(layer.updatedSerialised);
		editedVPL.nodes[layer.id.toString()].data = JSON.parse(JSON.stringify(layer.updatedSerialised));
	}

	//used to move visual objects around the canvas
	const move = (obj, mouseX, mouseY) => {
		let xDiff = Math.floor(mouseX - obj.anchorPoint.x);
		let yDiff = Math.floor(mouseY - obj.anchorPoint.y);

		if(obj.posX)
			obj.posX += xDiff;
		if(obj.posY)
			obj.posY += yDiff;

		obj.anchorPoint = {x: mouseX, y: mouseY};
	}

	//In the scenario in which a media component changes image, is deleted, or is created
	//this function will update extraMedia
	const updateExtraMedia = (p5) => {
		objects.forEach(object => {
			if(object.name === "Image"){
				object.loadMedia(p5, extraMedia, setExtraMedia);
				console.log("in setup",extraMedia);
			}
		})
	}


	// hacky but gets around the weird lifecycle of this nested component
	let tempFont;
	const preload = (p5) => {
		tempFont = p5.loadFont(consoleFont, (fonty) => {
			setFont(fonty);
		});
	}

	//again dealing with the react component lifecycle in this library 
	//you cannot attach all the necessary mouse events to the canvas without causing problems
	//therefore this boolean is tell the global mouse event listeners that the click started in the canvas
	let startedInCanvas = false

	const setup = (p5, canvasParentRef) => {
		// console.log("in setup: ", objects);
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		const cvn = p5.createCanvas(props.width, props.height).parent(canvasParentRef);

		p5.textFont(tempFont);

		objects.forEach(object => {
			if(object.name === "Image"){
				object.loadMedia(p5, extraMedia, setExtraMedia);
				console.log("in setup",extraMedia);
			}
		})
		// console.log("jfsdjfksjfk",extraMedia)

		
	};
	
	const draw = (p5) => {
		//this seems really hacky but hopefully will work fine
		checkFont();
		
		//updating image sources
		objects.forEach( object => {
			if(object.name === "Image")
				object.loadMedia(p5, extraMedia, setExtraMedia);
		})

		if(needsResizing){
			p5.resizeCanvas(props.width,props.height);
			needsResizing = false;
		}

		p5.background(0);

		layers.forEach((element) => {
			const update = element.updatePromise(p5.frameCount);
			update();
		});

		props.orderedLayers.forEach(({id, name}) => {
			const layer = layers.find(obj => obj.id === id);
			if(layer.name === "Image") layer.show(p5, extraMedia);
			else layer.show(p5);
		})
		
		// p5.frameRate(1);
	};  


	const mousePressed = (p5) => {
		if(p5.mouseX < p5.width && p5.mouseX >= 0  && p5.mouseY < p5.height && p5.mouseY >= 0){
			startedInCanvas = true;
		
			layers.reverse().every((layer) => {
				if(p5.mouseX > layer.bBox.x &&
					p5.mouseX < layer.bBox.x + layer.bBox.w &&
					p5.mouseY > layer.bBox.y && 
					p5.mouseY < layer.bBox.y + layer.bBox.h){
						
						layer.anchorPoint = {
							x: Math.floor(p5.mouseX),
							y: Math.floor(p5.mouseY)
						}
						layer.anchored = true;
						return false;
					}
				return true;	
			})
		}
	} 

	const mouseDragged = (p5) => {
		if(startedInCanvas){
			layers.reverse().every((layer) => {
				if(layer.anchored) {
					move(layer,p5.mouseX,p5.mouseY);
					return false;
				}
				return true;
			})
	
		}
	}

	const mouseReleased = (p5) => {
		if(startedInCanvas){
			layers.reverse().forEach((layer) => {
				if(layer.anchored){
					setSerialisedLayer(layer);
					layer.anchored = false;
					layer.anchorPoint = {x:null, y:null};
				}
			})
			props.editedSerialisedHandler(editedVPL);
			startedInCanvas = false
		}
	}

	return <Sketch setup={setup} 
		draw={draw} 
		preload={preload} 
		mousePressed={mousePressed}
		mouseDragged={mouseDragged} 
		mouseReleased={mouseReleased} />;
};


// NOTE: Do not use setState in the draw function or in functions that are executed
// in the draw function...
// please use normal variables or class properties for these purposes