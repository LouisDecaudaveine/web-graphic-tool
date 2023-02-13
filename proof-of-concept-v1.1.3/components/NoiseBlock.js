function NoiseBlock(font, resolution = [200,100], dimensions = 1 ,seed = -1) {

    this.seed = seed > 0 ? seed : (int)(Math.random(0,100000));
    this.base = new PCB(100,100,300,200, "NOISE",font);

    this.resolution = [...resolution];
    //The amount of dimensions mean:
    //if 1 you get a point along 1 dimension
    //if 2 you get a still 2D image of noise
    //if 3D you get a moivng 2D image of noise
    this.dimensions = dimensions > 3  || dimensions < 1 ? 3 : dimensions;
    this.isPaused = false;
    this.position = (dimensions === 1) ? [0] : [0,0,0];
    this.defaultSpread = 0.1
    this.speed = 0.01;

    noiseSeed(this.seed);

    this.getNoise = () => {
        if(dimensions === 1)
            return [noise(this.position[0])];
        if(dimensions === 2 || dimensions === 3 ){
            let slice = [];
            for(let i=0; i<resolution[1];i++){
                slice.push([]);
                let yNoise = this.position[1] + this.defaultSpread*i;
                for(let j=0; j<resolution[0];j++){
                    let xNoise = this.position[0] + this.defaultSpread*j;
                    slice[i][j] = noise(xNoise, yNoise, this.position[2]);
                }
            }
            return slice;
        }
    }
    this.value = this.getNoise();

    this.updateX = (speed) => {
        this.position[0] += speed;
    }
    this.updateY = (speed) => {
        this.position[1] += speed;
    }
    this.updateZ = (speed) => {
        this.position[2] += speed;
    }

    this.threeDMove = () => {
        this.updateZ(this.speed);
        this.value = this.getNoise();
    }

    //this is if you just want to visualise noise over your canvas
    //should not be used often, extremely innificient
    //noise should be used as data, sampled at relatively low rates. aka: low resolution
    this.output = () => {
        let xResConv = this.resolution[0]/width;
        let yResConv = this.resolution[1]/height;
        loadPixels();
            for(let yY = 0; yY < height; yY++){
                for(let xX = 0; xX < width; xX++){
                    set(xX,yY, color(
                        this.value[(int)(yY*yResConv)][(int)(xX*xResConv)]*255));
                }  
            }
        updatePixels();
    }

    

    //NEED TO FIGURE OUT INHERITANCE
    //TEMP SOLUTION AINT THE ONE: 



}