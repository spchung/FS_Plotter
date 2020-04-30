import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Home from './components/Home.js';


function App(){
    const [dataFileNames, setFileNames] = useState([]);
    return(
        <Home setFileNames={setFileNames} dataFileNames={dataFileNames}/>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
