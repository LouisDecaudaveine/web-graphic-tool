import React, { useState, useEffect, useCallback, useRef } from "react";
import Rete from "rete";

export default class ColourPreviewCon extends Rete.Control {
    static component = ({value}) => (
        <div>
            <span className="controllerTitle"> Preview </span>
                <div style= {{
                backgroundColor: "#" + value,
                border: "1px solid black",
                borderRadius: "3px",
                margin: "auto",
                marginTop: "5px",
                width:"20px",
                height:"20px",
                padding:"3px",
            }}/> 
        </div>
        
    )

    constructor(emitter, key, node, hexVal){
        super(key);
        this.key = key;
        this.hexVal = hexVal;
        this.component = ColourPreviewCon.component;
        
        const initial = node.data[key] || "0000ff";
        node.data[key] = initial;
        this.props = {
            value: initial
        }
    }

    setValue(newCol){
        this.props.value = newCol;
        this.putData(this.key,newCol);
        this.update();
    }
}
