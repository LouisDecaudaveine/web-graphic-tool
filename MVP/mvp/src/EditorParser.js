//import p5 classes/objects not sure how they will be made
import ObjCompProto from "./p5BaseComps/p5protoObj";
import p5ComponentList from "./p5ComponentList";


function initHelper(objs, SerialisedEditor, VPLcomp, parent, parentSoc) {
    let currP5Comp;
    if(!objs.has(VPLcomp.id)){
        currP5Comp = new p5ComponentList[VPLcomp.name](VPLcomp);
        objs.set(VPLcomp.id, currP5Comp);
    }
    else currP5Comp = objs.get(VPLcomp.id);
    currP5Comp.registerParentContext({socket: parentSoc, outputId: parent.id, context: parent.inputContext})
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
            const p5Comp = new p5ComponentList[VPLcomp.name](VPLcomp);
            p5Comp.registerParentContext({socket: "visSock", outputId: sketchIndex, context: SerialisedEditor.nodes[sketchIndex].data})
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
