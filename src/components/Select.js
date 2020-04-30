import React, {useState, useEffect} from 'react';

function Select(props){
    const [ops, setOptions] = useState(["default"]);

    useEffect(() => {
        console.log("changing options")
        if(props.status){
            // console.log(props.variables)
            setOptions(props.variables.slice(1));
            ops.shift("none");
        }
    },[props.variables, props.status]);

    // useEffect(()=>{

    // },[])


    function selectChange(){
        var e = document.getElementById("selector");
        var selectedVar = e.options[e.selectedIndex].text;
        // console.log(selectedVar);

        props.setSelect(selectedVar)
    }

    return(

        <div className="select">
        Variable: 
            <select id="selector" defaultValue="DEFAULT" onChange={selectChange}>
                <option value="DEFAULT"  disabled> 
                    Select a variable to plot 
                </option> 
                {ops.map(item => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
            
        </div>
    )
}

export default Select;