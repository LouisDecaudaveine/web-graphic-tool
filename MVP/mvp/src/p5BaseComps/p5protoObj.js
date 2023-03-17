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

    //this object is passed down to all inputs
    //editing this will send info down to all inputs
    this.inputContext = {};
    
    //this is readonly
    //this is all the data that the object recieves from its parents
    /*example: 
        [
            {
                socket: parentSoc, 
                outputId: parent.id, 
                context: parent.inputContext
            }
        ]
    */
    this.outputContext = [];

    //in the scenario where your inputContext is dependent on your outputContext
    //this function should be edited to set inputContext
    this.setInputContext = () => {

    }
    
    //used when given context from parent
    this.registerParentContext = (pContext) => {
        this.outputContext.push(pContext);
        this.setInputContext();
    }

    //this is the core of component: when a component updates this is what will change
    this.data = VPLNode.data;

    //this is the processed data that is sent to the outputs
    this.outData = {};

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
    this.updateFunc = async () => {
        console.log(`node ${this.id} updated`);
        return
    }

    this.updateProcess = async (parentFrameCount) => {
        if(parentFrameCount != this.frameCount){
            await this.updateFunc();
            this.frameCount = parentFrameCount;
            return true;
        }
        
        return false;
    }

    this.updatePromise = (parentFrameCount) => {

        return async () => {
            //init list of updates that need to be done
            //filling it with the components update functions
            //then using reduce to apply Promise.resolve(x) sequentially to each element
            //once all that is done then call the current node update function
            let inputUpdates = [];
            
            if(this.inputs.size > 0){
                this.inputs.forEach((components) => {
                    inputUpdates.push(...components)
                })
                inputUpdates
                    .map((inComp) => inComp.updatePromise(parentFrameCount))
                    .reduce((p,f) => p.then(f), Promise.resolve())
                    .then(() => {
                        const update = this.updateProcess(parentFrameCount)
                        return update;
                    })
                    .catch((err) => console.error(`update failed at node ${this.id} because of ${err}`));
            } else {
                Promise.resolve().then(this.updateProcess(parentFrameCount))
            }
        }  
    }

}