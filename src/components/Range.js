import React, {useEffect, useRef} from 'react';
import WindowInterval from './WindowInterval';

function Range(props){
    /*
    props: dataObj, onUpdate(), rangeObj. dataArrayLength, setRange() onSliderMove()
    */
    
    const range = props.rangeObj.end - props.rangeObj.start;
    const slideMax = props.dataArrayLength - range;

    // const slide = document.getElementById('lowerbound').value
    // console.log(slide)
    const intervalRef = React.useRef()

    function reset(){
        if(intervalRef.current){
            intervalRef.current.children[1].value = null;
            intervalRef.current.children[3].value = null;
        }
    }

    function onChange(e){
        let leftIndex = Number(e.target.value);
        let rightIndex = leftIndex + range;
        props.setRange({start:leftIndex, end:rightIndex});
        reset();
    }

    useEffect(()=>{
        document.getElementById("window-slider").max = slideMax;
    },[props.rangeObj, slideMax])

    return (
        <div>
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
            <WindowInterval ref={intervalRef} rangeObj={props.rangeObj} setRange={props.setRange} dataReady={props.dataReady} maxValue={props.maxValue}/>
        </div>
    )
}

export default Range;
