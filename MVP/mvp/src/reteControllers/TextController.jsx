import React, { useState, useEffect, useCallback, useRef } from "react";
import Rete from "rete";

export default class TextController extends Rete.Control {

    static component = ({value, onChange}) => (
        <div>

            <input 
                type = "text"
                value = {value}
                ref = {(ref) => {
                    ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
                }}
                onChange = {(e) => onChange(e.target.value)}
            />
        </div>
    )

    constructor(emitter, key, node, readonly = false){
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = TextController.component;

        const initial = node.data[key] || "No Text";

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

}