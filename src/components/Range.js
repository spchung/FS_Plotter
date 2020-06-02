import React, {useEffect} from 'react';
import WindowInterval from './WindowInterval';

function Range(props){
    /*
    props: dataObj, onUpdate(), rangeObj. dataArrayLength, setRange() onSliderMove()
    */
    
    const range = props.rangeObj.end - props.rangeObj.start;
    const slideMax = props.dataArrayLength - range;

    // pass reference to child component and attach to a selected HTML element 
    // in this case we attach it to the div that contains the two text input field
    const intervalRef = React.useRef() 

    function resetInputFields(){
        // if child component is mounted -> reset text input field on slider drag  
        if(intervalRef.current){
            intervalRef.current.children[1].value = ''; // lowerbound input text field
            intervalRef.current.children[3].value = ''; // upperbound ...
        }
    }
    
    function onChange(e){
        let leftIndex = Number(e.target.value);
        let rightIndex = leftIndex + range;

        // range check, right index should not exceed the length of the data array
        if(rightIndex > props.dataArrayLength){
            rightIndex--;
        }
        // set new range
        props.setRange({start:leftIndex, end:rightIndex});

        // reset input field if either input fields have value
        if( intervalRef.current.children[1].value !== '' || intervalRef.current.children[3].value !== '' ){
            resetInputFields();
        }
    }
    // update maximum on slider elem when there is a change to the range 
    useEffect(()=>{
        document.getElementById("window-slider").max = slideMax;
    },[props.rangeObj, slideMax])

    return (
        <div id="range-input-window">
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
            <WindowInterval 
                ref={intervalRef} 
                rangeObj={props.rangeObj} 
                setRange={props.setRange} 
                dataReady={props.dataReady} 
                maxValue={props.maxValue}
            />
        </div>
    )
}

export default Range;
