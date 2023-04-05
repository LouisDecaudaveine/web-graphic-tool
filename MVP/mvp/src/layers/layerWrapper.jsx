import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {useState, useEffect} from 'react';



export default function LayerWrapper(props) {

    const [layers, setLayers] = useState(Array.from(props.layers));

    //not sure if this works with component lifecycle but oh well
    useEffect(() => {
        setLayers(props.layers);
        // console.log("layer wrapper effect used");
    }, [props.layers])


    const handleOnDragEnd = (event) => {
        const items = Array.from(layers);
        const [reorderedItems] = items.splice(event.source.index, 1);
        items.splice(event.destination.index, 0, reorderedItems);
        //need to send updated layer back to app
        //and then rerender p5 with updated layers
        props.updateLayers(items);
    }

    return(
        <div className='layersContainer'>
            <h2 style={{position:"sticky"}}>Layers</h2>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId = "layers">
                {(provided) => (
                    <ul {...provided.droppableProps} ref ={provided.innerRef} className="layersUL">
                        {layers.map(({id,name}, index) => {
                            return (
                                <Draggable key={id} draggableId={id.toString()} index={index}>

                                    {(provided) => (
                                        <li  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="layersLI"> 
                                            <div>
                                                {name}
                                            </div>
                                        </li>
                                    )}
                                    
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </ul>
                )}
                </Droppable>
            </DragDropContext>
            
        </div>
    )
}