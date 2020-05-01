import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const Range = Slider.Range;

function RangeInterval(props){
    const maxValue = props.maxValue;
    const setRange = props.setRange;
    const dataReady = props.dataReady;
    const range = Object.values(props.rangeObj);
    
    function onSliderChange(value){
        if(dataReady){
            const [lower, upper] = value;
            setRange({start:lower, end:upper});
        }
    }
    return(
        <div className="range-interval">
            <Range allowCross={false} value={range} onChange={onSliderChange} max={maxValue}/>
        </div>
    )
}

export default RangeInterval;