function NoiseBlock(font, dimensions = 1 ,seed = -1) {

    this.seed = seed > 0 ? seed : (int)(Math.random(0,100000));
    this.base = new PCB(100,400, 100,100, "NOISE",font);
    this.dimensions = dimensions > 5 ? 5 : dimensions;
    this.isPaused = false;
    this.position = Math.zeros(dimensions);
    this.defaultSpread = 0.01


    

}