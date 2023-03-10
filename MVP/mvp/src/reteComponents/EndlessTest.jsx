import SocketList from "../SocketList";
import NumController from "../reteControllers/NumController";
import Rete from "rete";

export default class EndlessTest extends Rete.Component {
    constructor() {
        super("Test");
    }

    builder(node) {
        var inputTest = new Rete.Input("testInput", "in1", SocketList.testSocket, true);
        var inputTest2 = new Rete.Input("testInput1", "in2", SocketList.testSocket, true);
        var outTest1 = new Rete.Output("testOutput", "vis", SocketList.VisualSocket, false);
        var outTest2 = new Rete.Output("testOutput1", "out1", SocketList.testSocket, false);
        return node.addInput(inputTest).addInput(inputTest2).addOutput(outTest1).addOutput(outTest2);
    }

    worker() {
    }
}