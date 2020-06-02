import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Home from './components/Home.js';

function App(){
    return(
        <Home/>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))
