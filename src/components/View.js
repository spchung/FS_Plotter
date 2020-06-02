import React, {useEffect, useState} from 'react';
import useWindowDimensions from '../utils/useWindowDimensions'
import {Line} from 'react-chartjs-2';

/* Main graph window

Use third party react-chartjs-2 to power the visualization

useWindowDimensions -> specific util function calculating the height of the window 
The result windowHeight is not very accurate but is responsive -> I found the windowHeight/8 is the best height for the graph relative to the UI
 */

function View(props){
    /*
    props: head(array), array(array), select(string), rangeObj({start: , end: }), darkMode(bool), fileName(string)
    */
    const [_data, setData] = useState({data:{}, options:{} ,ready:false});

    // get height: 
    const windowHeight = useWindowDimensions().height;

    // PROP -> listen to change in array or range
    useEffect(() => {
        setData({
            data: createDataSet(props.array.data, props.select, props.head, props.array.states, props.rangeObj, props.darkMode), 
            options: createOptions(true, "Iterations", props.darkMode, props.fileName),
            ready: props.array.ready // only render if array is ready
        });
    },[props.array, props.rangeObj, props.darkMode, props.fileName, props.head, props.select]);

    // render 'To Plot Variable' screen if select var is at default 'init' -> will need to change if there is a variable that is called 'init'
    return (
        <div className="view" id="component">
            {props.select !== 'init' ? ( 
                <Line height={windowHeight/8} id="line-graph" data={_data.data} options={_data.options}/>
            ) : (
                <div id="no-input-div"> <div>To Plot Variable : Select In {props.fileName}</div> </div>
            )}
        </div>
    );
};

// To modify the look and specificy of the graphs, modify the following functions
// Check out https://www.chartjs.org/docs/latest/ for relative documentation 

// creat the option object for charts.js
function createOptions(showLine, xLabelName, darkMode, fileName){
    const fontColor = darkMode ? 'white' : 'grey';
    const gridColor = darkMode ? '#bababa' : '#3b3b3b';

    return {
        title:{
            display: true,
            text: fileName,
            fontColor: fontColor,
            fontSize: 20
        },
        legend:{
            labels:{
                fontColor: fontColor
            }
        },
        animation:{
            duration: 0
        },
        showLines: showLine,
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: xLabelName,
                    fontSize: 16,
                    fontColor: fontColor
                },
                gridLines : {
                    drawOnChartArea:false,
                    drawTicks: true,
                    color: gridColor
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    fontColor: fontColor
                }
            }],
            yAxes :[{
                gridLines: {
                    drawOnChartArea:false,
                    drawTicks: false,
                    color: gridColor
                },
                ticks: {
                    fontColor: fontColor
                }
            }]
        },
        responsive: true   
    };
}

// create data set object for charts.js
function createDataSet(array, select, head, states, rangeObj, darkMode){
    const darkTheme = ['rgba(101,190,242,1)', 'rgba(240, 249, 255,1)', 'rbga(255,74,74,1)'];
    const lightTheme = ['rgba(240,145,83,1)', 'rbga(255, 243, 235, 0.5)', 'rbga(0,153,255,1)'];
    const theme = darkMode? darkTheme : lightTheme;
    
    const data = {
        labels: states.slice(rangeObj.start,rangeObj.end),
        datasets: [
            {
                label: select,
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#00a2ff',
                borderColor: theme[0],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: theme[1],
                pointBackgroundColor: theme[0],
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: theme[2],
                pointHoverBorderColor: theme[2],
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                data: array.slice(rangeObj.start,rangeObj.end)
            }
        ]
    };
    return data;
}
export default View;