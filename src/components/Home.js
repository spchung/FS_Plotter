import React, { useState, useEffect} from 'react';
import View from './View.js';
import Select from './Select';
import Range from './Range';
import DataSection from './DataSets'
import WindowInterval from './WindowInterval';
import InitInputGroup from './InitInputGroup';
import RangeInterval from './RangeInterval';
import Stats from './Stats';

import { FaUpload } from 'react-icons/fa'
import DBUtils from '../libs/dbUtils';
const DataProcessor = require('../libs/Processor');

// declare outside of component becase need to keep track of internal id;
const dbUtils = new DBUtils()
const dataUtils = new DataProcessor();

function Home(props){
    // props: dataFileNames, setFileNames();

    const [_dataObj, setData] = useState({ data:"", head:"", ready:false }); //input dataset 
    const [_select, setSelect] = useState("init");  // variable being displayed
    const [_array, setArray] = useState({states:["init"], data:["init"], mean:0, ready:false}); // select variable data only
    const [_stats, setStats] = useState({mean:0, variance:0, ready:false}) // stats
    const [_range, setRange] = useState({start:0, end:200}); // number of variables displayed at onece 
    const [_darkMode, setMode] = useState(false);

    // current file name 
    const [_currFileName, setFileName] =useState("default");

    const handleUpload = () => {
        var fileToLoad = document.getElementById("file").files[0]
        setFileName(fileToLoad.name);
        var reader = new FileReader();
        reader.onload = (ev) => {
            
            // Post data into db
            dbUtils.postDataSet(ev.target.result)

            // callback
            dataUtils.setData(ev.target.result);
            setData({   
                head : dataUtils.getHead(),
                data : dataUtils.getBody(),
                ready: true
            });

            // set array.ready to false on new file upload so View renders welcoming message 
            setArray({
                states: _array.states,
                data: _array.data,
                ready: false
            });

            // return variable select to default
            document.getElementById('selector').value='DEFAULT';
            // return range obj to init 
            setRange({start:0, end:200});
            // return window-slider to 0
            document.getElementById('window-slider').value = 0;

            // change DOM 
            if(!document.getElementById('home-main-active')){
                const homeDiv = document.getElementById('home-main');
                homeDiv.id = homeDiv.id + "-active";
            }

            //append to FileNameArray
            props.setFileNames(props.dataFileNames.concat({id:dbUtils.exposeId(),fileName:fileToLoad.name}))

            //set DataSection select to newly uploaded file
            document.getElementById('data-selector').value = dbUtils.exposeId();
            
        }
        reader.readAsText(fileToLoad);
    }

    // variable to plot select
    useEffect(() => {
        if(_select!=="init"){
            setArray({
                states: dataUtils.query(_dataObj.head, _dataObj.data, _dataObj.head[0]),
                data: dataUtils.query(_dataObj.head, _dataObj.data, _select), 
                ready: true
            });
        }
    },[_select])

    useEffect(()=>{
        const stats = dataUtils.getStats()
        setStats({
            mean: stats.mean,
            variance: stats.variance,
            ready:true
        })
    },[_array])

    return(
        <div className="home" id="home-main">
            {_dataObj.ready ? 
                ( <div id="data-ready-group">
                    <div id="statisics-wrapper">
                        <Stats stats={_stats} />
                    </div>
                    <div id="controls-wrapper">
                    <View fileName={_currFileName} darkMode={_darkMode} head={_dataObj.head} array={_array} select={_select} rangeObj={_range}/>
                    <div id="main-control-group">
                        <div id="input-and-data-section">
                            <div id="input-select">
                                <input name="file" id="file" type ='file' hidden onChange={handleUpload} autoComplete="off"/>
                                <label htmlFor="file" id="input-label"> <FaUpload/> Upload Additional File </label>
                            </div>
                            &nbsp; &nbsp; &nbsp;
                            {/* id: "data-section" */}
                            <DataSection setFileName={setFileName} setArray={setArray} array={_array} setRange={setRange} availableFiles={props.dataFileNames} setData={setData}/>
                            &nbsp; &nbsp; &nbsp;
                            <Select variables={_dataObj.head} status={_dataObj.ready} setSelect={setSelect}/>
                        </div>
                        
                        <div id="range-interval-group">
                            <p> Range Interval: </p>
                            <RangeInterval rangeObj={_range} setRange={setRange} dataReady={_dataObj.ready} maxValue={_array.data.length}/>
                        </div>
                        
                        <div id="range-input-window">
                            {/* id: range */}
                            <Range dataObj={_dataObj} setRange={setRange} rangeObj={_range} dataArrayLength={_array.data.length}/> 
                            {/* id: windowInterval */}
                            <WindowInterval rangeObj={_range} setRange={setRange} dataReady={_dataObj.ready} maxValue={_array.data.length}/>
                        </div>
                    </div>
                    </div>
                  </div>

                ) : ( 
            
                <InitInputGroup setColorTheme={setMode} handleUpload={handleUpload}/> )
            }
        </div>
    )
};

export default Home;