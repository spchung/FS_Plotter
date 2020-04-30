import React, { useState, useEffect} from 'react';
import View from './View.js';
import Select from './Select';
import Range from './Range';
import DataSection from './DataSets'
// import RangeSetter from './RangeSetter';
// import TreeTracker from './TreeTracker';
import WindowInterval from './WindowInterval';
import InitInputGroup from './InitInputGroup';

import { FaUpload } from 'react-icons/fa'
import DBUtils from '../libs/dbUtils';
const DataProcessor = require('../libs/Processor');

// declare outside of component becase need to keep track of internal id;
const dbUtils = new DBUtils()

function Home(props){
    // props: dataFileNames, setFileNames();

    var ProcessUtils = new DataProcessor();
    const [_dataObj, setData] = useState({ data:"", head:"", ready:false }); //input dataset 
    const [_select, setSelect] = useState("init");  // variable being displayed
    const [_array, setArray] = useState({states:["init"], data:["init"], ready:false}); // select variable data only
    const [_range, setRange] = useState({start:0, end:200}); // number of variables displayed at onece 

    const handleUpload = () => {
        var fileToLoad = document.getElementById("file").files[0]
        var reader = new FileReader();
        reader.onload = (ev) => {
            
            // Post data into db
            dbUtils.postDataSet(ev.target.result)

            // callback
            ProcessUtils.setData(ev.target.result);
            setData({   
                head : ProcessUtils.getHead(),
                data : ProcessUtils.getBody(),
                ready: true
            });
            // console.log(_dataObj.data)

            // change DOM 
            if(!document.getElementById('home-main-active')){
                const homeDiv = document.getElementById('home-main');
                homeDiv.id = homeDiv.id + "-active";
            }

            //append to FileNameArray
            props.setFileNames(props.dataFileNames.concat({id:dbUtils.exposeId(),fileName:fileToLoad.name}))
            
        }
        reader.readAsText(fileToLoad)
    }

    //dataFileName Update 
    useEffect(() => {
        // console.log(props.dataFileNames)
    }, [props.dataFileNames])

    // set display range
    const updateSlideVal = function(rangeObj){
        // val = size of batch 
        setRange({
            start: rangeObj.start,
            end: rangeObj.end
        });
    }

    // Data object
    useEffect(() => {
        //on Data update

        //set Select to first variable on dataset switch 
        // setSelect(_dataObj.head[0]);

    },[_dataObj]);

    // var select
    useEffect(() => {
        if(_select!=="init"){
            setArray({
                states: ProcessUtils.query(_dataObj.head, _dataObj.data, _dataObj.head[0]),
                data: ProcessUtils.query(_dataObj.head, _dataObj.data, _select), 
                ready: true});
        }
    },[_select])

    // var range 
    useEffect(() => {
        // console.log(_range.start, _range.end);
    }, [_range])

    return(
        <div className="home" id="home-main">
            {_dataObj.ready ? 
                ( <div id="data-ready-group">
                    <View head={_dataObj.head} array={_array} select={_select} rangeObj={_range}/>
                    <div id="main-control-group">
                        <Select variables={_dataObj.head} status={_dataObj.ready} setSelect={setSelect}/>
                        <WindowInterval rangeObj={_range} setRange={setRange} dataReady={_dataObj.ready} maxValue={_array.data.length}/>
                        <Range dataObj={_dataObj} onUpdate={updateSlideVal} rangeObj={_range} dataArrayLength={_array.data.length} setRange={setRange}/> 
                        <div id="input-select">
                            <input name="file" id="file" type ='file' hidden onChange={handleUpload} autoComplete="off"/>
                            <label htmlFor="file" id="input-label"> <FaUpload/> Choose File </label>
                        </div>
                        <DataSection availableFiles={props.dataFileNames} setData={setData}/>
                    </div>
                  </div>

                ) : ( 
            
                <InitInputGroup handleUpload={handleUpload}/> )
            }
        </div>
    )
};

export default Home;