import React, {useEffect, useState} from 'react';


function TreeTracker(props){
    let leftIndex = props.leftIndex;
    let rightIndex = props.rightIndex;
    let display = `Showing Tree ${leftIndex} to Tree ${rightIndex}`;

    return (
        <div>
            <span>{display}</span>
        </div>
    )
}

export default TreeTracker;