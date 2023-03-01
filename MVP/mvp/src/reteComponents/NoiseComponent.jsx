import React, { useState, useEffect, useCallback, useRef } from "react";
import FloatController from "../reteControllers/FloatController";
import SocketList from "../SocketList";
import Rete from "rete";


export default class NoiseComponent extends Rete.Component {
    constructor() {
        super("Noise");
    }

    builder(node) {
        var in1 = new Rete.Input("float", "Speed", SocketList.floatSocket, false);
        in1.addControl(new FloatController(this.editor, "float", node))
        var out1 = new Rete.Output("2DFloatArr", "Noise Array", SocketList.floatArray2DSocket, true)
        return node.addInput(in1).addOutput(out1);
    } 

    worker() {
        console.log("Noise component worked");
    }
}