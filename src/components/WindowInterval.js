import React from 'react';

const WindowInterval = React.forwardRef((props, ref) => {
  // props: rangeObj, setRange(), dataReady, maxValue(data length)
  const range = Object.values(props.rangeObj); // -> [lower, upper]
  const maxValue = props.maxValue;
  const setRange = props.setRange;
  const dataReady = props.dataReady;

  function onLowerBoundChange(e){
    // takes upperbound value if any, else use placeholder
    const upperBound = Number(document.getElementById('upperbound').value) || Number(document.getElementById('upperbound').placeholder); 
    const lowerBound = Number(e.target.value); 
    evaluateAndUpdate(lowerBound, upperBound, maxValue, setRange);
  }

  function onUpperBoundChange(e){
    const lowerBound = Number(document.getElementById('lowerbound').value) || Number(document.getElementById('lowerbound').placeholder);
    const upperBound = Number(e.target.value);
    evaluateAndUpdate(lowerBound, upperBound, maxValue, setRange);
  }

  function evaluateAndUpdate(lb, up, max, cb){
    if (lb >= 0 && up > lb ){
      if(up <= max && lb < up){
        return cb({start:lb, end:up});
      }
    }
    else{
      console.log('bad')
    }
  }

  return(
    <div className="window-interval">
        {dataReady ? (
            <form id="interval-form">
              <div id="text-select-display" ref={ref}>
                <label> Showing iteration </label> 
                &nbsp;
                <input id="lowerbound" type="number" min={0} placeholder={range[0]} onChange={onLowerBoundChange}/> 
                &nbsp;
                <label>to iteration </label>
                &nbsp;
                <input id="upperbound" type="number"  min={0} placeholder={range[1]} onChange={onUpperBoundChange}/>
              </div>
            </form>
        ) : (
          null
        )}
    </div>
  )
})

export default WindowInterval;