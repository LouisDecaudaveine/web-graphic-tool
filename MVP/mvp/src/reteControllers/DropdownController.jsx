import React, { useState, useEffect, useCallback, useRef } from "react";
import Select from 'react-select'

import Rete from "rete";

export default class DropdownController extends Rete.Control {
    static component = ({value, onChange, options}) => (
        <div>
            <Select value={{value: value, label:value}} onChange={(e) => onChange(e.value)} options={options} />
        </div> 
    )

    constructor(emitter, key, node, options, title = "", defaultVal = "-- --", readonly=false){
        super(key);
        this.title = title;
        this.emitter = emitter;
        this.key = key;
        this.component = DropdownController.component;
        const initial = node.data[key] || defaultVal;

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            onChange: (v) => {
                this.setValue(v);
                this.emitter.trigger("process");
            },
            options,
            title: this.title,
        };
    }


    setValue(val) {
        this.props.value = val;
        this.putData(this.key, val);
        this.update();
    }
}