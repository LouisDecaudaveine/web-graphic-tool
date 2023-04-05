import SocketList from "../../SocketList";
import NumController from "../../reteControllers/NumController";
import Rete from "rete";

export default class StepComponents extends Rete.Component {
    constructor() {
        super("Step");
        this.path = ['Maths'];
    }

    builder(node) {
        var stepSize = new NumController(this.editor, "stepSize", node, true, "Step Size", false);
        var output = new Rete.Output("output","Output", SocketList.numSocket, true);


        return node.addControl(stepSize).addOutput(output);
    }

    worker(node, inputs, outputs) {
        
    }
}