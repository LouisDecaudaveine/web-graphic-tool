import './App.css';
import { useRete } from './FlowVPLWrapper';
import P5Wrapper from './P5Wrapper';
import Header from './vanillaReactComponents/Header';
import { useState, useEffect } from 'react';
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import About from './vanillaReactComponents/About';
import Tutorial from './vanillaReactComponents/Tutorial';
import LayerWrapper from './layers/layerWrapper';


function Editor(props){

  const [setContainer, getEditor,setEditor] = useRete();

  const [sketchCreated, setSketchCreated] = useState(false);

  useEffect(()=>{
    if(sketchCreated){
      setEditor(props.editedSerialised).
      then(() => {
        props.getSerializedData(getEditor());
      });
    }
  },[props.editedSerialised]);

  return (
    <div>
      <div 
        style = {{
          width: "75vw",
          height: "75vh",
          margin: "auto",
          marginTop: "1rem",
        }}>
          <div
          style = {{backgroundColor:"#E7AB9A"}} 
          ref={(ref) => {
            ref && setContainer(ref);
            }}/>

      </div>
      <button
      onClick={ () =>{
        props.getSerializedData(getEditor());
        setSketchCreated(true);
      }}>Save Editor</button>
    </div>
  )
}

const Home = () => {
  const [serialisedData, setSerialisedData] = useState({});
  const [editedSerialised, setEditedSerialised] = useState();
  //of the form: [{id: 1, name: layer 1}]
  const [layers, setLayers] = useState([]);


  const updateLayers = (added, removed) => {
    const layersLeft = layers.filter(layer => !removed.includes(layer.id));
    const newLayers = added.map(layer => {return {id:layer.node, name:layer.output}});
    const updatedLayers = [...layersLeft,...newLayers];
    console.log("updated Layers",updatedLayers);
    setLayers(updatedLayers);
  }
  
  const getSerialisedParentHandler = (se) => {
    setSerialisedData(se);
    
    //this segment is to update the layers
    const serialisedlayers = se.nodes[Math.min(...Object.keys(se.nodes).map(Number)).toString()].data.layers;
    console.log("serialisedLayers:", serialisedlayers, "app layers:", layers)
    const addedLays = serialisedlayers.filter(slob => !layers.find(lob => lob.id === slob.node));
    const removedLays = layers.filter(lob => !serialisedlayers.find(slob => lob.id === slob.node)).map(obj => {return obj.id});

    updateLayers(addedLays, removedLays);

    console.log("Saved VPE", serialisedData);
  }

  const setEditedParentHandler = (jsonData) => {
    setEditedSerialised(jsonData);
  } 

  return(
    <div className='App'>
      <Editor 
        getSerializedData={getSerialisedParentHandler} 
        editedSerialised={editedSerialised} 
      />
      {
        serialisedData.nodes && 
        Object.keys(serialisedData.nodes).length > 0 &&
        serialisedData.nodes[Math.min(...Object.keys(serialisedData.nodes).map(Number)).toString()].name === "Sketch" && 
        <P5Wrapper 
          VPLState={serialisedData} 
          width={serialisedData.nodes[  Math.min(...Object.keys(serialisedData.nodes).map(Number)).toString()].data.width} 
          height ={serialisedData.nodes[  Math.min(...Object.keys(serialisedData.nodes).map(Number)).toString()].data.height}
          editedSerialisedHandler={setEditedParentHandler}
          sketchNodeIndex={Math.min(...Object.keys(serialisedData.nodes).map(Number)).toString()}/>
      }
      <LayerWrapper layers={layers} updateLayers={setLayers} />

    </div>
  )
}



function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route  path='/' element={<Home/>}></Route>
        <Route  path='/about' element={<About/>}></Route>
        <Route  path='/tutorial' element={<Tutorial/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
