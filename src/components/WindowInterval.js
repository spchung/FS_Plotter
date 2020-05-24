import React, {useState} from 'react';

function WindowInterval(props){
  // props: rangeObj, setRange(), dataReady, maxValue(data length)
  const range = Object.values(props.rangeObj);
  const maxValue = props.maxValue;
  const setRange = props.setRange;
  const dataReady = props.dataReady;

  // DOM elems 
  const lower = document.getElementById('lowerbound');
  const upper = document.getElementById('upperbound');

  // local states 
  const [_lowerBound, setLowerBound] = useState(0);
  const [_upperBound, setUpperBound] = useState(20);

  function lowerBoundChange(e){
    if(dataReady)
      setLowerBound(+e.target.value);
  }

  function upperBoundChange(e){
    if(dataReady)
      setUpperBound(+e.target.value);
  }

  function handleApply(){
    // update range 
    if(dataReady){

      // If lowerbound > upperbound 
      if(_lowerBound >= _upperBound){
        alert("Please select an interval where upperbound is greater than lowerbound");
        clearInputs();
        return;
      }

      // if eiter bound exceed dataLength
      if(_lowerBound > maxValue || _upperBound > maxValue){
        alert("Range exceeds dataset length");
        clearInputs();
        return;
      }

      setRange({start:_lowerBound, end:_upperBound});
      
      // empty input field 
      clearInputs();
    }
  }

  function clearInputs(){
    lower.value = null;
    upper.value = null;
  }

  return(
    <div className="window-interval">
        {dataReady ? (
            <div>
              <div id="text-select-display">
              <label> Showing iteration </label> 
              &nbsp;
              <input id="lowerbound" type="number" onInput={lowerBoundChange} min={0} placeholder={range[0]}/> 
              &nbsp;
              <label>to iteration </label>
              &nbsp;
              <input id="upperbound" type="number" onInput={upperBoundChange} min={0} placeholder={range[1]}/>
              &nbsp;
              <button onClick={handleApply}>Apply</button>
              </div>
            </div>
        ) : (
          null
        )}
    </div>
  )
}

export default WindowInterval;