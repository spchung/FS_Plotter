import React, {useEffect} from 'react';

function Range(props){
    /*
    props: dataObj, onUpdate(), rangeObj. dataArrayLength, setRange()
    */
    
    var range = props.rangeObj.end - props.rangeObj.start;
    var slideMax = props.dataArrayLength - range;

    function onChange(e){

        let leftIndex = Number(e.target.value);
        let rightIndex = leftIndex + range;
        
        props.setRange({start:leftIndex, end:rightIndex});
    }

    useEffect(()=>{
        document.getElementById("window-slider").max = slideMax;
    },[props.rangeObj])

    return (
        <div className="range">
            <div id="slide-window-text">
                <p>Slide Window:</p>
            </div> 
            <input
                id="window-slider"
                type="range"
                defaultValue={0}
                max={props.dataObj.ready? slideMax:100}
                onChange={onChange}
                >
            </input>
        </div>
    )
}

export default Range;
