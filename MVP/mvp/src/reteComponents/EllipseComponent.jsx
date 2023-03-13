import SocketList from "../SocketList";
import NumController from "../reteControllers/NumController";
import Rete from "rete";

export default class EllipseComponent extends Rete.Component {
    constructor(){
        super("Ellipse");
    }

    builder(node){
        var outputVisData = new Rete.Output("outputVisData", "output", SocketList.VisualSocket, false);
        var inputColour = new Rete.Input("colour", "colour", SocketList.colourSocket, false);
        var width = new NumController(this.editor, "width", node, false, "width");
        var height = new NumController(this.editor, "height", node, false, "height"); 
        var x = new NumController(this.editor, "xPos", node, false, "x"); 
        var y = new NumController(this.editor, "yPos", node, false, "y"); 

        return node.addInput(inputColour).addControl(width).addControl(height).addControl(x).addControl(y).addOutput(outputVisData);
    }
}