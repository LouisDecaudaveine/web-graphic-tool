import './App.css';
import { useRete } from './FlowVPLWrapper';
import P5Wrapper from './P5Wrapper';
import Header from './vanillaReactComponents/Header';
import { useState, useEffect } from 'react';
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import About from './vanillaReactComponents/About';
import Tutorial from './vanillaReactComponents/Tutorial';


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

  const getSerialisedParentHandler = (se) => {
    setSerialisedData(se);

    console.log("Saved VPE", serialisedData);
  }

  const setEditedParentHandler = (jsonData) => {
    setEditedSerialised(jsonData);
  } 

  
  return(
    <div className='App'>
      <Editor getSerializedData={getSerialisedParentHandler} editedSerialised={editedSerialised}/>
      {
        serialisedData.nodes && 
        Object.keys(serialisedData.nodes).length > 0 &&
        console.log(Math.min(Math.min(...Object.keys(serialisedData.nodes).map(Number))).toString())
      }
      {
        serialisedData.nodes && 
        Object.keys(serialisedData.nodes).length > 0 &&
        serialisedData.nodes[Math.min(...Object.keys(serialisedData.nodes).map(Number)).toString()].name === "Sketch" && 
        <P5Wrapper VPLState={serialisedData} 
          width={serialisedData.nodes[  Math.min(...Object.keys(serialisedData.nodes).map(Number)).toString()].data.width} 
          height ={serialisedData.nodes[  Math.min(...Object.keys(serialisedData.nodes).map(Number)).toString()].data.height}
          editedSerialisedHandler={setEditedParentHandler}
          sketchNodeIndex={Math.min(...Object.keys(serialisedData.nodes).map(Number)).toString()}/>
      }

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
