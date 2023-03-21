import Rete from "rete";
import { useEffect, useState } from "react";

function InputMedia(props){

    function onMediaChange(e) {

        const newMediaUrl = URL.createObjectURL(e.target.files[0]);
        props.onChange({id:props.id, media: newMediaUrl});
    }

    return (
        <>
            <input type="file" accept={props.type+"/*"} onChange={onMediaChange}/>
        </>
    )
}





export default class FileExplorerCon extends Rete.Control {

    static component = ({id, onChange, type}) => (
        <div>
            <InputMedia  id={id} onChange={onChange} type={type}/>
        </div> 
    )

    constructor(emitter, key, node, type, callback){
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = FileExplorerCon.component;

        this.props = {
            onChange: (v) => {
                callback(v);
                this.emitter.trigger("process");
            },
            id : node.id,
            type,
        };
    }

}