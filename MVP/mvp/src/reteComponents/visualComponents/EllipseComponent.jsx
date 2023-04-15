import SocketList from "../../SocketList";
import NumController from "../../reteControllers/NumController";
import Rete from "rete";

export default class EllipseComponent extends Rete.Component {
    constructor(){
        super("Ellipse");
        this.path = ['Visual'];

    }

    builder(node){
        var outputVisData = new Rete.Output("outputVisData", "output", SocketList.VisualSocket, false);
        var inputColour = new Rete.Input("colour", "colour", SocketList.colourSocket, false);
        var width = new Rete.Input("width", "width", SocketList.numSocket, false);
        var height =  new Rete.Input("height", "height", SocketList.numSocket, false);
        var x = new NumController(this.editor, "xPos", node, false, "x"); 
        var y = new NumController(this.editor, "yPos", node, false, "y"); 

        width.addControl(new NumController(this.editor, "width", node, false, "width"));
        height.addControl(new NumController(this.editor, "height", node, false, "height"));

        return node.addInput(inputColour).addInput(width).addInput(height).addControl(x).addControl(y).addOutput(outputVisData);
    }

    worker(node, inputs, outputs){
        var w = inputs["width"].length ? inputs["width"][0] : node.data.width;
        var h = inputs["height"].length ? inputs["height"][0] : node.data.height;

        node.data.width = w;
        node.data.height = h;
    }
}