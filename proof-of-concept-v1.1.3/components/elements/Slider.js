function Slider(title,minVal,maxVal, Parent, steps = 0, value = null, id) {
    this.id = id;
    this.title = title;
    this.steps = steps;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.value = (value !== null && value <= maxVal && value >= minVal)?
        value : (maxVal-minVal)/2;  
    
    this.style = "";

    //not sure if this whole parent thing is a good idea
    //will come back to this.
    this.x;
    this.y;
    if(Parent.elements.length > 0){
        this.x = Parent.elements[Parent.elements.length-1].bbox[0];
        this.y = Parent.elements[Parent.elements.length-1].bbox[1]+ 
            Parent.elements[Parent.elements.length-1].bbox[3] + Parent.margin;
    }
    else {
        this.x = Parent.title.bbox.x;
        this.y =  Parent.title.bbox.y;
    }


    this.slider = createSlider(minVal, maxVal, this.value ,steps);

    this.show = () =>{
        // this.slider.position(this.x,this.y,"absolute");
        // rect(this.slider.x, this.slider.y, this.slider.width, this.slider.height);
        push();
            fill(125);
            text(this.title, this.slider.x + this.slider.width, this.y)
        pop();
        
        //this is probs not the best way of doing it
        this.value = this.slider.value();
    }
    //down the line changing the slider to block slider
    //displayed through this function
    this.prettyShow = () => {}

    this.updatePos = (xDiff, yDiff) => {
        this.x += xDiff;
        this.y += yDiff;
    }
}