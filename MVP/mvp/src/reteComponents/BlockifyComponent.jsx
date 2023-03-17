import SocketList from "../SocketList";
import NumController from "../reteControllers/NumController";
import DropdownController from "../reteControllers/DropdownController";
import Rete from "rete";

export default class BlockifyComponent extends Rete.Component {
    constructor() {
        super("Blockify");
    }

    builder(node) {
        var size = new NumController(this.editor, "blockSize", node, false, "Block Size");
        var inputData = new Rete.Input("2DFloatArray", "Input Matrix", SocketList.floatArray2DSocket, false);
        var colourOptions = new DropdownController(this.editor, "ColFil", node,
        [
            {value:"GrayScale", label:"GrayScale" },
            {value: "Preset 1", label: "Preset 1"},
            {value: "Preset 2", label: "Preset 2"},
        ]
        ,"Colour Filter", "GrayScale");
        var outputVisData = new Rete.Output("outputVisData", "output", SocketList.VisualSocket, false);
        return node.addInput(inputData).addControl(colourOptions).addControl(size).addOutput(outputVisData);
    }

    worker() {
        console.log("Blockify component worked")
    }
}