import Rete from "rete";
import NumController from "../reteControllers/NumController";
import SocketList from "../SocketList";
import rgbHex from 'rgb-hex';
import ColourPreviewCon from "../reteControllers/ColourPreviewCon";


export default class ColourComponent extends Rete.Component {

    constructor(){
        super("Colour");
        this.path = [];
    }

   
    builder(node){
        var rCon = new Rete.Input("red", "red", SocketList.numSocket, false);
        rCon.addControl(new NumController(this.editor,"red", node, false, "red", false));
        var gCon = new Rete.Input("green", "green", SocketList.numSocket, false);
        gCon.addControl(new NumController(this.editor,"green", node, false, "green", false));
        var bCon = new Rete.Input("blue", "blue", SocketList.numSocket, false);
        bCon.addControl(new NumController(this.editor,"blue", node, false, "blue",false));
        var colPrev = new ColourPreviewCon(this.editor,"colourPrev",node,this.hexVal);
        var outCol = new Rete.Output("colour", "output", SocketList.colourSocket, true);
        return node.addControl(colPrev).addInput(rCon).addInput(gCon).addInput(bCon).addOutput(outCol)
    }


    worker(node){
        console.log(node);
        var hexVal = rgbHex(node.data.red, node.data.green, node.data.blue);

        this.editor.nodes.find((n) => n.id == node.id)
            .controls.get("colourPrev")
            .setValue(hexVal)
    }
}