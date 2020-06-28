import React from 'react';
import { FaUpload } from 'react-icons/fa'

/* What the user sees before a dataset is uploaded

Repalce the lorem text with a description of the application
*/
const project_description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

function InitInputGroup(props) {
    //props setColorTheme() -> setting dark or white mode

    // toggles light and dark mode
    function changeTheme(darkTheme){
        if(darkTheme){
            transition();
            document.documentElement.setAttribute('data-theme', 'dark');
            props.setColorTheme(true);
        }
        else{
            transition();
            document.documentElement.setAttribute('data-theme', 'light');
            props.setColorTheme(false);
        }
    }

    function transition(){
        document.documentElement.classList.add('transition');
        setTimeout(() => {
            document.documentElement.classList.remove('transition');
        }, 1000);
    }
    return(
        <div className="input-panel">
            <h1 id="project-name">Time Series Plotter</h1>
            <p id="project-description"> 
                {project_description}
            </p>
            <div id="theme-changer">
                <div id="light" onClick={ ()=> changeTheme(false) } value={false}><div id="inner-default" ><p>Light Theme</p></div></div>
                <div id="dark" onClick={ ()=> changeTheme(true) }><div id="inner-dark"><p>Dark Theme</p></div></div>
            </div>
            <div id="input-select-panel">
                <input name="file" id="file" type ='file' hidden onChange={props.handleUpload} autoComplete="off"/>
                <label htmlFor="file" id="file-label-panel"> <FaUpload/> Choose File To Begin Plotting </label>
            </div>
        </div>
    )
};

export default InitInputGroup;