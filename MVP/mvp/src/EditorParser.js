//import p5 classes/objects not sure how they will be made
import ObjCompProto from "./p5BaseComps/p5protoObj";
import p5ComponentList from "./p5ComponentList";


function recursiveHelper(SE, obj, visited, layers, objects){
    obj.inputs && 
        Object.entries(obj.inputs).forEach((socket) => {
            console.log(socket[0],socket[1].connections);
            socket[1].connections.forEach((child) => {
                let curr = SE.nodes[child.node];
                recursiveHelper(SE, curr, visited, layers, objects);
            });
        })
}

function treeDescent(SE){

    let visitedComponents = new Map();

    //for every comp in SE.nodes[1].data.layers: 
        // add to visitedComponents: [comp.node, true]
        // init the appropriate component and add to objects and layers:
            // const VPLcomp = SerialisedEditor.nodes[visComp.node.toString()];
            // const p5Comp = new p5ComponentList[VPLcomp.name](VPLcomp)
            // objects.push(p5Comp);
            // layers.push(p5Comp);
        //for obj in objects:
            //recursiveFunc(obj, layers, objects, visited):
                //for inp in SE.nodes[obj.id].inputs
                //if visited: 
                    //undecided
                //else: build correct obj like above ^^^ and add to visited

    // this will go down the VPL tree starting at Sketch node inputs
    // following a depth first search pattern, 
    // on its way down it will either create the necessary objects
    // or add what is needed to them 
}


function initHelper(objs, SerialisedEditor, VPLcomp, parent, parentSoc) {
    let currP5Comp;
    if(!objs.has(VPLcomp.id)){
        currP5Comp = new ObjCompProto(VPLcomp);
        objs.set(VPLcomp.id, currP5Comp);
    }
    else currP5Comp = objs.get(VPLcomp.id);
    parent.addInput({socket: parentSoc, component: currP5Comp});

    if(JSON.stringify(VPLcomp.inputs) !== "{}"){
        Object.entries(VPLcomp.inputs).forEach((socket) => {
            socket[1].connections.forEach((con) =>{
                const currVPLComp = SerialisedEditor.nodes[con.node];
                initHelper(objs, SerialisedEditor,currVPLComp, currP5Comp, socket[0]);
            })
        });  
    }
}


export function ReadParser(SerialisedEditor, sketchIndex){

    //under the form [["2", <object>],["13", <object>]]
    const objs = new Map();
    const layers = [];
    SerialisedEditor.nodes &&
        SerialisedEditor.nodes[sketchIndex].data.layers
        .forEach((visComp) => {
            const VPLcomp = SerialisedEditor.nodes[visComp.node.toString()];
            const p5Comp = new p5ComponentList[VPLcomp.name](VPLcomp)
            objs.set(visComp.node, p5Comp);
            layers.push(p5Comp);

            if(JSON.stringify(VPLcomp.inputs) !== "{}"){
                Object.entries(VPLcomp.inputs).forEach((socket) => {
                    socket[1].connections.forEach((con) =>{
                        const currVPLComp = SerialisedEditor.nodes[con.node];
                        initHelper(objs, SerialisedEditor,currVPLComp, p5Comp, socket[0]);
                    })
                });  
            }

        });
    
    return [objs, layers]
}





// export function ReadParser(SerialisedEditor, sketchIndex) {
//     // const ellipseO = new EllipseObj(250,250);

//     const objects = [];
//     const layers = [];

//     initObjs(SerialisedEditor, sketchIndex);
//     //first checking if editor exist
//     //then going to inputs of sketch Node
//     //checking if node already exists if not adding it to objects

//     SerialisedEditor.nodes && 
//         SerialisedEditor.nodes[sketchIndex].data.layers
//         .forEach((visComp) => {
//            if(!objects.some((obj) => obj.id === visComp.node)){
//                 const VPLcomp = SerialisedEditor.nodes[visComp.node.toString()];
//                 recursiveHelper(SerialisedEditor, VPLcomp, null, layers, objects);
//                 const p5Comp = new p5ComponentList[VPLcomp.name](VPLcomp)
//                 objects.push(p5Comp);
//                 layers.push(p5Comp);
//            }
//         }); 

//     return [objects, layers];
// }