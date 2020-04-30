import React, { useEffect, useState } from 'react';

function RangeSetter(props){
    /*
    props: rangeObj, setRange(), dataArray, hasData
    */

    const dataLength = props.dataArray.data.length;

    function onSliderChange(e){
        /* Window RANGE

            The max should be range value - current left Index 

         */
        let windowRange = Number(e.target.value);
        let leftIndex = props.rangeObj.start;
        
        //set max 
        let maxWindowRange = dataLength-leftIndex;
        document.getElementById("window-width-slider").max = maxWindowRange;

        //set right index
        let rightIndex = leftIndex + windowRange;

        props.setRange({start:leftIndex, end:rightIndex});
    }

    function onTextSubmit(e){
        e.preventDefault()
        let numField = document.getElementById('number-range-setter');
        console.log(numField.value);
        if(!props.hasData){
            alert("No input file");
            return;
        }

        // update range value
        let rightIndex = props.rangeObj.start + Number(numField.value);
        let leftIndex = props.rangeObj.start;
        // console.log(leftIndex,rightIndex)

        // handle Right Edge Case -> see notes at EOF
        if(rightIndex > dataLength){
            let diff = rightIndex - dataLength;
            rightIndex = rightIndex - diff;
            // console.log(leftIndex, rightIndex, " !!!!!")
        }
        //update range 
        props.setRange({start: leftIndex, end: rightIndex});

        // update set range slider value 
        let slider = document.getElementById('window-width-slider');
        slider.value = numField.value;
    }

    // check if user input is out of range
    function onTextFieldChange(e){
        
    }

    function viewAll(){
        if(props.hasData){
            props.setRange({start:0, end:dataLength});
        }
    }

    return(
        <div className="range-setter">
            View all trees: 
            <button id="view-all-btn" onClick={viewAll}>View All</button>
            Adjust window width:
            <input id="window-width-slider" type="range" defaultValue={0} min={10} max={dataLength} onChange={onSliderChange}/>
            Input desired window width:
            <form id="number-range-submit" onSubmit={onTextSubmit}>
                <input 
                    id="number-range-setter" type="number" defaultValue={10}
                    min={10} max={props.hasData? dataLength : 100} onChange={onTextFieldChange}
                />
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )   
}

export default RangeSetter;


/*
Note:

RIGHT EDGE CASE: 
- Occurs when submitting a new range value via text input a where the (new value + original leftIndex value) is greater than the length of the dataArray. 
- Solution: when case detected set right index to the end of the dataset.

*/