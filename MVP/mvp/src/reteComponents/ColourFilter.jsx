import SocketList from "../SocketList";
import DropdownController from "../reteControllers/DropdownController";
import Rete from "rete";

export default class ColourFilterComponent extends Rete.Component {
    constructor() {
        super("Colour Filter");
    }

    builder(node) {
        var inputArr = new Rete.Input("2DFloatArray", "Input Matrix", SocketList.floatArray2DSocket, false);
        var outCol = new Rete.Output("2DColourArray", "output", SocketList.colourArray2DSocket, false);
        var colourOptions = new DropdownController(this.editor, "ColFil", node,
        [
            {value:"GrayScale", label:"GrayScale" },
            {value: "Preset 1", label: "Preset 1"},
            {value: "Preset 2", label: "Preset 2"},
        ]
        ,"Colour Filter");
        return node.addInput(inputArr).addControl(colourOptions).addOutput(outCol);
    }

    worker() {
       
    }
}