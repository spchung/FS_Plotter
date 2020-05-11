import React, {useState, useEffect} from 'react';

function Select(props){
    const [ops, setOptions] = useState(["default"]);
    // const text = "Variables: "

    useEffect(() => {
        if(props.status){
            // console.log(props.variables)
            setOptions(props.variables.slice(1));
            ops.shift("none");
        }
    },[props.variables, props.status]);
    
    function selectChange(){
        var e = document.getElementById("selector");
        var selectedVar = e.options[e.selectedIndex].text;
        // console.log(selectedVar);

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