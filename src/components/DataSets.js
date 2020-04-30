import React, {useState} from 'react';
const Processor = require('../libs/Processor');

const dataProcessor = new Processor();

function DataSection(props){
    // props: availableFiles(obj{id, fileName}), setData(func)
    const handleOnChange = (e) =>{
        let id = e.target.value;
        // console.log(id);
        fetch(`api/${id}`, {
            method:'GET',
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res => res.json())
        .then(JSONdata => {
            // console.log("Retrieved RAW",JSONdata.data)
            // PROCESS DATA
            dataProcessor.setData(JSONdata.data);
            // console.log("Retrieved Raw Data",  dataProcessor.getBody(JSONdata.data));
            props.setData({
                head: dataProcessor.getHead(JSONdata.data),
                data: dataProcessor.getBody(JSONdata.data),
                ready : true
            })
        });
    }

    return(
        <div>
            Choose DataSet:
            <select id="data-selector" defaultValue="DEFAULT" onChange={handleOnChange}>
                <option key="def" value="DEFAULT" disabled> 
                    Select a variable to plot 
                </option>
                {props.availableFiles.map( fileObj => (
                    <option key={fileObj.id} value={fileObj.id}>{fileObj.fileName}</option>
                ))}
            </select>
        </div>
    )
}

export default DataSection;