import Rete from "rete";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const FileButton = styled.button`
    
`



function InputMedia(props){
    const [filePath,setFilePath] = useState(props.filePath);
    const hiddenFileInput = useRef(null);
    const handleClick = (event) => {
        hiddenFileInput.current.click()
    }

    useEffect(() => {
        console.log("file path Changed",filePath);
    }, [filePath])

    function onMediaChange(e) {
        const filePath = e.target.files[0].name
        const newMediaUrl = URL.createObjectURL(e.target.files[0]);
        setFilePath(filePath);
        props.onChange({filePath: filePath, media: newMediaUrl});
    }

    return (
        <>
            <FileButton onClick={handleClick}>Choose File</FileButton> 
            {filePath}
            <input type="file" 
                accept={props.type+"/*"} 
                onChange={onMediaChange}
                ref={hiddenFileInput} 
                style={{display: "none"}}/>
        </>
    )
}





export default class FileExplorerCon extends Rete.Control {

    static component = ({id, onChange, type,filePath}) => (
        <div>
            <InputMedia  id={id} onChange={onChange} type={type} filePath={filePath}/>
        </div> 
    )

    constructor(emitter, key, node, type){
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = FileExplorerCon.component;
        const initial = node.data[key] || {filePath:"", media:null};
        node.data[key] = initial;
        this.props = {
            onChange: (v) => {
                this.setValue(v)
                this.emitter.trigger("process");
            },
            id : node.id,
            type,
            filePath: initial.filePath,
            
        };
    }


    setValue(val){
        this.props.value = val;
        this.putData(this.key,val);
        this.update();
    }
}