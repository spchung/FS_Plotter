import React, {useEffect} from 'react';

var Mean = 0;
var Variance = 0;

function Stats(props){
    //props rangeObj{start:, end:}, array({data:, ready: ,states:}) select(String)
    function mean(){
        // if array is not in initial state
        let targetArray = props.array.data.slice(props.rangeObj.star,props.rangeObj.end);
        const Total = targetArray.reduce((a, b)=> Number(a)+Number(b), 0);
        return Total/targetArray.length;
    }
    function variance(){
        const LocalMean = mean();
        let targetArray = props.array.data.slice(props.rangeObj.star,props.rangeObj.end);
        
        let sums = targetArray.map( elem =>{
            let diff = Math.pow(Number(elem) - LocalMean,2);
            return diff
        })
        let Sum = sums.reduce((a,b)=> Number(a) + Number(b),0)
        return Sum/Number(targetArray.length -1);
    }

    if (props.array.data.length > 1){
        Mean = mean();
        Variance = variance();
    }else{
        Mean = 0;
        Variance = 0;
    }
    
    return(
        <div className="statistics">
            <div id="stat-lines">

                <div id="mean-wrapper">
                    <p>Mean: &nbsp;</p> 
                    <div>
                        <div>{Mean}</div> 
                    </div>
                </div>
                &nbsp; &nbsp; &nbsp;
                <div id="variance-wrapper">
                    <p>Variance: &nbsp;</p> 
                    <div>
                        <div>{Variance}</div> 
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Stats;