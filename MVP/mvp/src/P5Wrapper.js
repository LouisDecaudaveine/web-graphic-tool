import React from "react";
import Sketch from "react-p5";
import  {ReadParser}  from "./EditorParser"

export default (props) => {

	const [objects,layers] = ReadParser(props.VPLState);

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(props.width, props.height).parent(canvasParentRef);
	};

	const draw = (p5) => {
		p5.background(0);
		// p5.ellipse(props.width/2, props.height/2, 70, 70);

		objects.forEach(element => {
			element.update();
		});

		layers.forEach(layer => {
			layer.show(p5);
		})
		
	};

	return <Sketch setup={setup} draw={draw}/>;
};


// NOTE: Do not use setState in the draw function or in functions that are executed
// in the draw function...
// please use normal variables or class properties for these purposes