// The data processor class 
// Used function scope for better security over class
// returns a object with private values and public functions

function Processor(string){
    // Think of these as private variables 
    var STRING="init";
    var Head = "init";
    var Matrix;
    var CurrentIndex = 1;
    
    // thing of these as public functions you can use to modify the interal private variables
    const setData = (string) => {
        STRING = string;
    } //allow calling following methods without params

    // keep an id inside an instance of this function to keep track of the datasets in memory by assigning them ids
    const exposeIndex = () =>{
        return CurrentIndex;
    }

    const incrementIndex = () =>{
        CurrentIndex+=1;
    }

    // head == the first row of the dataset or the variables in the dataset 
    const getHead = (string=STRING) => {
        Head = string.split("\n")[0].split(/(\s+)/).filter(e => e.trim().length>0);
        return Head;
    };

    // parse the rest of the text into a matrix where each column is a variable and each row is an iteration of the variables -> as if reading the plain text directly into a matrix
    const getBody = (string=STRING) => {
        // matrix without state values 
        var body = string.split("\n").slice(1);
        var temp=[]
        for(let i=0; i<body.length; i++){
            temp.push(body[i].split(/(\s+)/).filter(e => e.trim().length>0));
        }
        Matrix = temp;
        return temp;
    }

    const query = (head=Head, matrix=Matrix, queryString) => {
        // returns an array with the correct variable
        var var_index = head.indexOf(queryString);
        if(var_index === -1){
            console.log("bad query");
            return;
        }

        var targetArray = [];
        for(let i=0; i<matrix.length; i++){
            targetArray.push(matrix[i][var_index]);
        }
        return targetArray;
    }

    return {    
        getHead,
        getBody,
        setData,
        query,
        exposeIndex,
        incrementIndex
    }
}

module.exports = Processor;