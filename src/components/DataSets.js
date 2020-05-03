import React from 'react';
const Processor = require('../libs/Processor');

const dataProcessor = new Processor();

function DataSection(props){
    // props: availableFiles(obj{id, fileName}), setData(func)
    const handleOnChange = (e) =>{
        let id = e.target.value;
        fetch(`api/${id}`, {
            method:'GET',
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res => res.json())
        .then(JSONdata => {
            // PROCESS DATA
            dataProcessor.setData(JSONdata.data);
            props.setData({
                head: dataProcessor.getHead(JSONdata.data),
                data: dataProcessor.getBody(JSONdata.data),
                ready : true
            })
        })
        .then(()=>{
            let file = props.availableFiles[id-1];
            console.log(file.fileName);
            props.setFileName(file.fileName);
        });

        // toggle View.js render status on new file selection. -> return to init meddage
        props.setArray({
            states: props.array.states,
            data: props.array.data,
            ready:false
        });
        
        // return variable select to default
        document.getElementById('selector').value='DEFAULT';
        // return range obj to init 
        props.setRange({start:0, end:200});
        // return window-slider to 0
        document.getElementById('window-slider').value = 0;
    }

    return(
        <div className="data-section">
            <div id="choose-data-set-text">
                <p>Choose DataSet:</p>
            </div>
            &nbsp; 
            <select id="data-selector" defaultValue="DEFAULT" onChange={handleOnChange}>
                <option key="def" value="DEFAULT" disabled> 
                    Select Data Set  
                </option>
                {props.availableFiles.map( fileObj => (
                    <option key={fileObj.id} value={fileObj.id}>{fileObj.fileName}</option>
                ))}
            </select>
        </div>
    )
}

export default DataSection;