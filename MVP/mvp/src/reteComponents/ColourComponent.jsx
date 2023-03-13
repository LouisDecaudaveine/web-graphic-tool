import Rete from "rete";
import NumController from "../reteControllers/NumController";
import SocketList from "../SocketList";
import rgbHex from 'rgb-hex';
import ColourPreviewCon from "../reteControllers/ColourPreviewCon";


export default class ColourComponent extends Rete.Component {

    constructor(){
        super("Colour");
    }

   
    builder(node){
        var rCon = new NumController(this.editor,"red", node, false, "red", false);
        var gCon = new NumController(this.editor,"green", node, false, "green", false);
        var bCon = new NumController(this.editor,"blue", node, false, "blue",false);
        var colPrev = new ColourPreviewCon(this.editor,"colourPrev",node,this.hexVal);
        var outCol = new Rete.Output("colour", "output", SocketList.colourSocket, true);
        return node.addControl(colPrev).addControl(rCon).addControl(gCon).addControl(bCon).addOutput(outCol)
    }


    worker(node){
        console.log(node);
        var hexVal = rgbHex(node.data.red, node.data.green, node.data.blue);

        this.editor.nodes.find((n) => n.id == node.id)
            .controls.get("colourPrev")
            .setValue(hexVal)
    }
}