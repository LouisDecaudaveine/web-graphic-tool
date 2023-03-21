import { createNoise3D } from 'simplex-noise';
import alea from 'alea';
import ObjCompProto from '../p5BaseComps/p5protoObj';


export default function NoiseComp(VPLNode) {
    ObjCompProto.call(this, VPLNode);

    this.seed = alea(this.data.seed.toString());
    this.noise3D = createNoise3D();
    this.data.noisePos = 0;

   
    this.setInputContext = () => {
        this.initNoise();
    }
    

    this.initNoise = () => {
        const noise = []
        this.data.w = this.outputContext[0].context.w;
        this.data.h = this.outputContext[0].context.h;
        for(let col = 0; col < this.data.h; col++){
            noise.push([]);
            for(let row = 0; row < this.data.w; row++){
                noise[col].push(this.noise3D(row/30,col/30,this.data.noisePos + 0.0001))
            }
        }
        this.outData.noise = noise;

        console.log(noise.length, noise[1].length)
    }

    this.updateNoise = async () => {
        const noise = [];
        for(let col = 0; col < this.data.h; col++){
            noise.push([]);
            for(let row = 0; row < this.data.w; row++){
                noise[col].push((this.noise3D(row/30,col/30,this.data.noisePos + 0.0001)+1)/2)
            }
        }
        this.outData.noise = noise;
        this.data.noisePos += this.data.speed;
        return;
    }

    this.updateFunc = async () => {
        // console.log(`Noise node ${this.id} has updated`)
        await this.updateNoise();
        
        return;
    }

}