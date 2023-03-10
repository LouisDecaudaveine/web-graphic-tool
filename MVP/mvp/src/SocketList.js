import Rete from "rete";

const SocketList =  {
    numSocket : new Rete.Socket("Float Value"),
    floatArray2DSocket : new Rete.Socket("2D Float Array"),
    textSocket : new Rete.Socket("String value"),
    coordArray : new Rete.Socket("Array of coordinates"),
    layerSocket : new Rete.Socket("Array of visual compoents"), 
    testSocket: new Rete.Socket("Purely for testing the ,erialised Parser"),
    ListSocket: new Rete.Socket("Any Type that fits in a list"),
    VisualSocket: new Rete.Socket("Any Type of input that has a visual representation"),
}

SocketList["layerSocket"].combineWith(SocketList["VisualSocket"]);

//not sure if I want a list component yet so this may be axed
Object.entries(SocketList).forEach(([key,value]) => {
    if(key !== "ListSocket"){
        value.combineWith(SocketList["ListSocket"]);
    }
});



export default SocketList;