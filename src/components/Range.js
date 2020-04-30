import React, {useEffect, useState} from 'react';

// import Test from "./Test";

function Range(props){
    /*
    props: dataObj, onUpdate(), rangeObj. dataArrayLength, setRange()
    */
    
    var range = props.rangeObj.end - props.rangeObj.start;
    var slideMax = props.dataArrayLength - range;
    var dataLength = props.dataArrayLength;
    var slideValue = 0;

    // console.log("ON RENDER", props.rangeObj);
    // props.setRange({start:left, end:right});

    // document.getElementById("window-slider").max = props.slideMax;
    function onChange(e){

        let leftIndex = Number(e.target.value);
        let rightIndex = leftIndex + range;
        let retObj = {
            start: leftIndex,
            end: rightIndex
        }

        if(rightIndex > dataLength){
            let diff = rightIndex - dataLength;
            rightIndex = rightIndex - diff;
            // console.log(leftIndex, rightIndex, " !!!!!")
        }

        slideValue = rightIndex;

        // console.log(retObj);
        props.onUpdate(retObj);
    }

    useEffect(()=>{
        document.getElementById("window-slider").max = slideMax;
    },[props.rangeObj])

    function onChange1(e){
        console.log(e.target.value); 
    }

    return (
        <div className="range">
        Slide Window: 
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
