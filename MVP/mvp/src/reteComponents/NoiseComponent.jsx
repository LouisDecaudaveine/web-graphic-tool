import React, { useState, useEffect, useCallback, useRef } from "react";
import NumController from "../reteControllers/NumController";
import SocketList from "../SocketList";
import Rete from "rete";


export default class NoiseComponent extends Rete.Component {
    constructor() {
        super("Noise");
        this.path = [];
    }

    builder(node) {
        var in1 = new Rete.Input("float", "speedInp", SocketList.numSocket, false);
        var seed = new NumController(this.editor, "seed", node, false, "Seed");
        in1.addControl(new NumController(this.editor, "speed", node, true,"Speed"));
        var out1 = new Rete.Output("noiseOutput", "Output", SocketList.floatArray2DSocket, false)
        return node.addInput(in1).addControl(seed).addOutput(out1);
    } 

    worker(node) {
    }
}