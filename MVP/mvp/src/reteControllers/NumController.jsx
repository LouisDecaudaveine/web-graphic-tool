import React, { useState, useEffect, useCallback, useRef } from "react";
import Rete from "rete";

export default class NumController extends Rete.Control {


    //I have no idea what is happening in that ref thing but it looks important
    static component = ({ value, onChange, isFloat, title }) => (
        <div>
            {title !== "" && <span className="controllerTitle">{title}</span>}
            <input
                type="number"
                step={isFloat ? "0.00001" : "1"}
                value={value}
                ref={(ref) => {
                    ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
                }}
                onChange={(e) => onChange(+e.target.value)}
            />
        </div>
    )

    constructor(emitter, key, node, isFloat, title = "", readonly = false) {
        super(key);
        this.title = title;
        this.emitter = emitter;
        this.key = key;
        this.isFloat = isFloat;
        this.component = NumController.component;
        const initial = node.data[key] || 0;

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            onChange: (v) => {
                this.setValue(v);
                this.emitter.trigger("process");
            },
            isFloat,
            title: this.title,
        };
    }

    setValue(val) {
        this.props.value = val;
        this.putData(this.key, val);
        this.update();
    }
};