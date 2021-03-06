import React, {useState, useEffect} from 'react';

// handle variable selection change 
function Select(props){
    const [ops, setOptions] = useState(["default"]);
    // props: variables(array), status(boolean), setSelect(function)

    // populate variable selcetion drop down menu when there is a change to variables
    useEffect(() => {
        if(props.status){
            setOptions(props.variables.slice(1));
        }
    },[props.variables, props.status]);
    
    function selectChange(){
        var e = document.getElementById("selector");
        // extract text from selected var
        var selectedVar = e.options[e.selectedIndex].text;
        props.setSelect(selectedVar)
    }

    return(
        <div className="select">
            <p>Variables: &nbsp;</p> 
            <span id="dropdown">
                <select id="selector" defaultValue="DEFAULT"  onChange={selectChange}>
                    <option value="DEFAULT"  disabled> 
                        Select a variable to plot 
                    </option> 
                    {ops.map(item => (
                        <option key={item} name={item} value={item}>{item}</option>
                    ))}
                </select>
            </span>
        </div>
    )
}

export default Select;