function Slider(title,minVal,maxVal, Parent, steps = -1, value = null) {
    this.title = title;
    this.steps = steps;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.value = (value !== null && value <= maxVal && value >= minVal)?
        value : (maxVal-minVal)/2;  

    //not sure if this whole parent thing is a good idea
    //will come back to this.
    this.x = Parent.itemCoords[Parent.itemCoords.length-1][0];
    this.y = Parent.itemCoords[Parent.itemCoords.length-1][1];
    this.slider = createSlider(this.minVal, this.maxVal, this.value);

    this.show = () =>{
        this.slider.position(this.x,this.y);
        push();
            fill(125);
            text(this.title, 100, 100)
        pop();
    }
    
    //down the line changing the slider to block slider
    //displayed through this function
    this.prettyShow = () => {}
}