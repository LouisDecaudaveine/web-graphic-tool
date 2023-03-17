import VisualCompProto from "../p5BaseComps/p5VisualProto";

export default function BlockifyComp(VPLNode) {
    VisualCompProto.call(this,VPLNode);

    console.log(this.data);

    this.data.blockSize = this.data.blockSize === 0 ? 5 : this.data.blockSize;
    this.data.colourBlocks = [];

    this.setInputContext = () => {
        this.inputContext = {
            w: Math.ceil(this.outputContext[0].context.width/this.data.blockSize),
            h: Math.ceil(this.outputContext[0].context.height/this.data.blockSize),
        }
    }

    this.updateFunc = async () => {
        // console.log(`Blockify node ${this.id} has updated`)

        const colFilter =  this.colourFilter.get(this.data.ColFil);
        this.data.colourBlocks = colFilter(this.inputs.get("2DFloatArray")[0].outData.noise)
    }


    this.show = (p5) => {
        for(let i = 0; i< this.data.colourBlocks.length; i++){
            for(let j = 0; j< this.data.colourBlocks[1].length; j++){
                p5.push();
                    const col = this.data.colourBlocks[i][j];  
                    p5.fill(col.r,col.g, col.b);
                    p5.noStroke();
                    p5.rect(j*this.data.blockSize,i*this.data.blockSize, this.data.blockSize,this.data.blockSize);
                p5.pop();
            }
        }
    }
    ///////
    ////colour filter functions
    //////

    this.colourFilter = new Map();
    this.colourFilter.set("GrayScale", (inputMat) => {
        const outputMat = [];
        for(let i = 0; i< inputMat.length; i++){
            outputMat.push([]);
            for(let j = 0; j< inputMat.length; j++){
                const col = Math.floor(inputMat[i][j] * 255)
                outputMat[i].push({r: col, g:col, b:col});
            }
        }
        return outputMat;
    } );


    this.colourFilter.set("Preset 1", (inputMat) => {
        const outputMat = [];
        for(let i = 0; i< inputMat.length; i++){
            outputMat.push([]);
            for(let j = 0; j< inputMat.length; j++){
                outputMat[i].push({r: inputMat[i][j]*100, g:inputMat[i][j]*255, b:inputMat[i][j]*100});
            }
        }
        return outputMat;
    });


    this.colourFilter.set("Preset 2", (inputMat) => {
        const outputMat = [];
        for(let i = 0; i< inputMat.length; i++){
            outputMat.push([]);
            for(let j = 0; j< inputMat.length; j++){
                outputMat[i].push({r: inputMat[i][j]*200, g:inputMat[i][j]*255, b:0});
            }
        }
        return outputMat;
    });
}