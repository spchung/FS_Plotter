import React from 'react';

function DataSection(props){
    // props: availableFiles(obj{id, fileName}), setData(func), dataSets (obj)
    // console.log(props.dataSets)

    const handleOnChangeState = (e) => {
        let index = e.target.value -1;
        const currentDataset = props.dataSets[index];
        props.setData({
            head: currentDataset.head,
            data: currentDataset.data,
            ready: true
        })
        props.setFileName(currentDataset.name);

        // toggle View.js render status on new file selection. -> return to init meddage
        props.setArray({
            states: props.array.states,
            data: props.array.data,
            ready: false
        });
        
        // return variable select to default
        document.getElementById('selector').value='DEFAULT';
        // set select back to default
        props.setSelect("init")
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
            <select id="data-selector" defaultValue="DEFAULT" onChange={handleOnChangeState}>
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