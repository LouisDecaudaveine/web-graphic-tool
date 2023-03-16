export default function ObjCompProto(VPLNode){
    this.id = VPLNode.id;
    this.name = VPLNode.name;
    //this acts as verifier to check if component has been updated by another parent
    this.frameCount = 0;
    //will look like:
    /* 
        [
            {socket: "socket1", outs: [_compRef_]},
            {socket: "socket2", outs: [_compRef1_, _compRef2_]}
        ]
    */ 
    this.outputs = new Map();
    this.inputs = new Map();


    //this is the core of component: when a component updates this is what will change
    //when sending out data to outputs this is what will be sent
    this.data = {};

    //output/input  will be of the form: 
    // {socket: "socketName", component: _compRef_ }
    this.addOutput = (output) => {
        if(this.outputs.has(output.socket)){
            this.outputs.get(output.socket).push(output.component);
        }
        else {
            this.outputs.set(output.socket, [output.component]);
        }
    }

    this.addInput = (input) => {
        if(this.inputs.has(input.socket)){
            this.inputs.get(input.socket).push(input.component);
        }
        else {
            this.inputs.set(input.socket, [input.component])
        }
    }

    this.updateProcess = async () => {
        console.log(`node ${this.id} updated`);
        return true;
    }

    this.updatePromise = () => {

        //init list of updates that need to be done
        //filling it with the components update functions
        //then using reduce to apply Promise.resolve(x) sequentially to each element
        //once all that is done then call the current node update function
        let inputUpdates = [];
        if(this.inputs.size > 0){
            this.inputs.forEach((socket, components) => {
                inputUpdates.push(...components)
            })
                .map((inComp) => inComp.updatePromise)
                .reduce((p,f) => p.then(f), Promise.resolve())
                .then((result) => this.updateProcess())
                .catch((err) => console.error(`update failed at node ${this.id} because of ${err}`));
        } else {
            Promise.resolve(() => this.updateProcess());
        }
       
    }

}




























// class Component {
//     constructor() {
//       this.parent = null;
//       this.children = [];
//     }
  
//     setParent(parent) {
//       this.parent = parent;
//     }
  
//     addChild(child) {
//       this.children.push(child);
//       child.setParent(this);
//     }
  
//     async onChildCallbackComplete(child, err, result) {
//       // code to handle child callback results
//       if (err) {
//         console.error(`Child ${child} returned an error: ${err}`);
//       } else {
//         console.log(`Child ${child} returned a result: ${result}`);
//       }
//       // code to check if all child callbacks have completed
//       if (this.children.every(child => child.callbackCompleted)) {
//         // code to perform processing after all child callbacks have completed
//         console.log("All child callbacks have completed");
//       }
//     }
  
//     async doAsyncOperation(callback) {
//       try {
//         // code to perform some asynchronous operation
//         const result = await someAsyncOperation();
//         callback(null, result);
//       } catch (error) {
//         callback(error, null);
//       }
//     }
  
//     async run() {
//       // code to perform some asynchronous operation
//       await this.doAsyncOperation((err, result) => {
//         if (err) {
//           console.error(`Error: ${err}`);
//           return;
//         }
//         console.log(`Result: ${result}`);
//       });
  
//       // code to run child callbacks
//       this.children.forEach(child => {
//         child.doAsyncOperation((err, result) => {
//           child.callbackCompleted = true;
//           this.onChildCallpbackComlete(child, err, result);
//         });
//       });
//     }
//   }
  
//   // example usage
//   const parent = new Component();
//   const child1 = new Component();
//   const child2 = new Component();
  
//   parent.addChild(child1);
//   parent.addChild(child2);
  
//   parent.run();


///////////////////////////////////////////////////
///////////////////////////////////////////////////

// this.id = VPLNode.id;
// this.type = null //VPLNode.Something
// this.frameCount = 0;

// this.data = {};

// /*example input:
//     [
//         {
//             name: "colour",
//             type: Colour,
//             sources: [{id: 3, updateCallBack:updateFunc, dataHandler:dataCallback, data:null}]
//         },
//         {
//             name: "noises",
//             type: Float,
//             source: [
//                 {id: 14, updateCallBack:updateFunc, dataHandler:dataCallback, data:null},
//                 {id: 17, updateCallBack:updateFunc, dataHandler:dataCallback, data:null}
//             ]
//         }

//     ]
// */
// //stores all the input ports, and inputs with their types, id and async callbacks
// this.inputs = [];

// //when being built an object should also be sent a callback to its parent
// //if object already built then add to the array
// this.outputs = [];

// this.notifyParent = async (callBack) => {
//     try{

//     } catch {
        
//     }
// }

// this.update = async (parentFrameCount) => {
//     if(parentFrameCount !== this.frameCount){
//         const childCallbackFunctions = [/*this will be filled with all input callbacks*/];

//         const promises = childCallbackFunctions.map(childUpdate => new Promise((resolve, reject) => {
//             childUpdate( (err,result) => {
//                 if(err) {
//                     reject(err);
//                 } else {
//                     resolve(result);
//                 }
//             }, this.frameCount);
//         }));
//         const results = await Promise.all(promises);
//         this.frameCount = parentFrameCount;
//         //process
//     } 
// }

// this.receiveFromChildren = (dataKey) => {
//     this.inputs.forEach((socket) => {
//         socket.sources.forEach((child) => {
//             child.data = child.dataHandler(dataKey) && child.dataHandler(dataKey);
//         })
//     })
// }

// this.dataHandler = (dataKey) => {
//     return this.data.dataKey ? this.data.dataKey : null;
// }



/*
async function parentCallbackFunction() {
  const childCallbackFunctions = []; // array to store child callback functions
  // code to push child callback functions into the array
  
  const promises = childCallbackFunctions.map(childCallback => new Promise((resolve, reject) => {
    childCallback((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }));

  const results = await Promise.all(promises);
  // code to process results after all child callbacks have completed
}
*/