import React from 'react';

function Stats(props){
    const display = props.stats.ready ? true : false;
    
    return(
        <div className="statistics">
            {display ?
                (
                    <div id="stat-lines">

                        <div id="mean-wrapper">
                            <p>Mean: &nbsp;</p> 
                            <div>
                                <div>{props.stats.mean}</div> 
                            </div>
                        </div>
                        &nbsp; &nbsp; &nbsp;
                        <div id="variance-wrapper">
                            <p>Variance: &nbsp;</p> 
                            <div>
                                <div>{props.stats.variance}</div> 
                            </div>
                        </div>

                    </div>

                ):(
                    null
                )
            }
            
        </div>
    )
}

export default Stats;