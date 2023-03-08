import React, { useEffect } from "react";
import Sketch from "react-p5";
import  {ReadParser}  from "./EditorParser"
import mirrorFont from "./assets/mirror82_v2.otf"

export default (props) => {
	//objects: these are all the nodes that you can see on the vpl 
	//layers: is a list of all the visual component they are rendered from lowest index to highest index
	const [objects,layers] = ReadParser(props.VPLState);

	let needsResizing = false

	//this queues a resize of canvas whenever the sketch VPL component changes its dimensions
	useEffect((p5) => {
		needsResizing = true;
	}, [props.width, props.height])

	let font;
	const preload = (p5) => {
		font = p5.loadFont(mirrorFont);
	}

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(props.width, props.height).parent(canvasParentRef);
		p5.textFont(font);
	};

	const draw = (p5) => {
		if(needsResizing){
			p5.resizeCanvas(props.width,props.height);
			needsResizing = false;
		}

		p5.background(0);
		// p5.ellipse(props.width/2, props.height/2, 70, 70);

		objects.forEach(element => {
			element.update();
		});

		layers.forEach(layer => {
			layer.show(p5);
		})
	};

	const mousePressed = (p5) => {

	} 

	const mouseDragged = (p5) => {

	}

	const mouseReleased = (p5) => {

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