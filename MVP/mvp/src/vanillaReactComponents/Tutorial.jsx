export default function Tutorial(){
    return(
        <div style={{width:"50%", height:"auto", position:"center", margin:"auto", paddingTop:"5%"}}>
            <div className="video-responsive">
                <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/9XlhbvDioJs" 
                    title="Tutorial Video" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen
                />
            </div>
        </div>
        
    )
}