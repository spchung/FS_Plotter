function Processor(string){
    var STRING="init";
    var Head = "init";
    var Matrix;
    var Mean = 0;
    var Variance = 0;
    var CurrentId = 0;
    
    const setData = (string) => {
        STRING = string;
    } //allow calling following methods without params

    const getHead = (string=STRING) => {
        Head = string.split("\n")[0].split(/(\s+)/).filter(e => e.trim().length>0);
        return Head;
    };

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

        var tempMean = 0;

        var temp = [];
        for(let i=0; i<matrix.length; i++){
            tempMean += Number(matrix[i][var_index]);
            temp.push(matrix[i][var_index]);
        }

        Mean = (tempMean/matrix.length).toFixed(4);

        var localVar = 0;
        for(let i=0; i<matrix.length; i++){
            localVar += Math.pow((Number(matrix[i][var_index]) - Mean),2)
        }
        Variance = (localVar/(matrix.length-1)).toFixed(10);
       
        return temp;
    }

    const getStats = () => {
        return{
            mean:Mean,
            variance:Variance
        };
    }

    return {    
        getHead,
        getBody,
        setData,
        query,
        getStats
    }
}

module.exports = Processor;