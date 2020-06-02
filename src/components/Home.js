import React, { useState, useEffect} from 'react';
import View from './View.js';
import Select from './Select';
import Range from './Range';
import DataSection from './DataSets'
import InitInputGroup from './InitInputGroup';
import RangeInterval from './RangeInterval';
import Stats from './Stats';
import { FaUpload } from 'react-icons/fa'; //file upload icon for upload button
const DataProcessor = require('../libs/Processor');

/* home page 
- Initializes all states and pass down to children 
- Only prop is prop.dataFileNames -> use to collect names of inputted files.
*/

// declare outside of component becase need to keep track of internal data;
const dataUtils = new DataProcessor();

function Home(props){
    // Collection of states that needs to persist beyond each render
    const [_dataObj, setData] = useState({ data:"", head:"", ready:false }); //input dataset 
    const [_select, setSelect] = useState("init");  // variable being displayed
    const [_array, setArray] = useState({states:["init"], data:["init"], ready:false}); // selected variable data only
    const [_range, setRange] = useState({start:0, end:200}); // number of variables displayed at onece 
    const [_darkMode, setMode] = useState(false); // toggle dark or light mode 
    const [_datasets, setDatasets] = useState([]); // array of all dataset data 
    const [_dataSetNames, setDataSetNames] = useState([]); // names of datasets, used to populate DataSection drop down menu 
    const [_currFileName, setFileName] = useState("default"); // current selected file name, used for inital display on data set change 

    const handleUpload = () => {
        // Runs ONLY when users upload a new data set
        var fileToLoad = document.getElementById("file").files[0]
        setFileName(fileToLoad.name);
        var reader = new FileReader();
        reader.onload = (ev) => {
            
            // feed data to the data processor instance 
            // will keep track of the data set and can be outputted easily 
            dataUtils.setData(ev.target.result);
            
            // store data in state as an object
            setDatasets(_datasets.concat({
                name: fileToLoad.name,
                head: dataUtils.getHead(),
                data: dataUtils.getBody()
            }));

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

            // return variable select to default -> note a better way to do this is by using forwardRef but in this case this is fine because element 'selector'
            // will always be mounted before a unser can click on the upload button. Same applies to all the native HTML elemet selections 
            document.getElementById('selector').value='DEFAULT';
            // return range obj to init 
            setRange({start:0, end:200});
            // return window-slider to 0
            document.getElementById('window-slider').value = 0;
            //append to FileNameArray
            setDataSetNames(_dataSetNames.concat({id:dataUtils.exposeIndex(),fileName:fileToLoad.name}));
            //return _select to 'init'
            setSelect('init');
            //set DataSection select to newly uploaded file
            document.getElementById('data-selector').value = dataUtils.exposeIndex();
            //increment dataset index by 1
            dataUtils.incrementIndex();
        }
        // read the actual file, which calls the above function 
        reader.readAsText(fileToLoad);
    }

    // captures new variable array when variable selection changes
    useEffect(() => {
        if(_select!=="init"){
            setArray({
                states: dataUtils.query(_dataObj.head, _dataObj.data, _dataObj.head[0]),
                data: dataUtils.query(_dataObj.head, _dataObj.data, _select), 
                ready: true
            });
        }
    },[_select, _dataObj])

    return(
        <div className="home" id="home-main">
            {/* conditional rendering -> only render view if there is a dataset present */}
            {_dataObj.ready ? 
                ( <div id="data-ready-group">
                    <div id="statisics-wrapper">
                        <Stats 
                            array={_array} 
                            rangeObj={_range} 
                            select={_select}
                        />
                    </div>
                    <div id="controls-wrapper">
                        <View 
                            fileName={_currFileName} 
                            darkMode={_darkMode} 
                            head={_dataObj.head} 
                            array={_array} 
                            select={_select} 
                            rangeObj={_range}
                        />
                        <div id="main-control-group">
                            <div id="input-and-data-section">
                                <div id="input-select">
                                    <input name="file" id="file" type ='file' hidden onChange={handleUpload} autoComplete="off"/>
                                    <label htmlFor="file" id="input-label"> <FaUpload/> Upload Additional File </label>
                                </div>
                                &nbsp; &nbsp; &nbsp;
                                <DataSection 
                                    dataSets={_datasets} 
                                    setSelect={setSelect} 
                                    setFileName={setFileName} 
                                    setArray={setArray} 
                                    array={_array} 
                                    setRange={setRange} 
                                    availableFiles={_dataSetNames} 
                                    setData={setData}
                                />
                                &nbsp; &nbsp; &nbsp;
                                <Select 
                                    variables={_dataObj.head} 
                                    status={_dataObj.ready} 
                                    setSelect={setSelect}
                                />
                            </div>
                            <div id="range-interval-group">
                                <p> Range Interval: </p>
                                <RangeInterval 
                                    rangeObj={_range} 
                                    setRange={setRange} 
                                    dataReady={_dataObj.ready} 
                                    maxValue={_array.data.length}
                                />
                            </div>                            
                            <Range
                                dataObj={_dataObj} 
                                setRange={setRange} 
                                rangeObj={_range} 
                                dataArrayLength={_array.data.length} 
                                maxValue={_array.data.length} 
                                dataReady={_dataObj.ready}
                            /> 
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