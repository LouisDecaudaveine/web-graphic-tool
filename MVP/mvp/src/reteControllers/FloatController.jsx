import React, { useState, useEffect, useCallback, useRef } from "react";
import Rete from "rete";

export default class FloatController extends Rete.Control {

    //I have no idea what is happening in that ref thing but it looks important
    static component = ({value, onChange}) => (
        <div>
            {"Speed"}
            <input
                type = "number"
                step = "0.0001"
                value = {value}
                ref = {(ref) => {
                    ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
                }}
                onChange = {(e) => onChange(+e.target.value)}
            />
        </div>  
    )

    constructor(emitter, key, node, readonly = false){
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = FloatController.component;

        const initial = node.data[key] || 0;

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            onChange: (v) => {
                this.setValue(v);
                this.emitter.trigger("process");
            }
        };
    }

    setValue(val) {
        this.props.value = val;
        this.putData(this.key, val);
        this.update();
    }


};