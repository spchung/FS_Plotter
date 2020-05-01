function Processor(string){
    var STRING="init";
    var Head = "init";
    var Matrix;
    
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

        var temp =[];
        for(let i=0; i<matrix.length; i++){
            temp.push(matrix[i][var_index])
        }
        return temp;
    }

    return {    
        getHead,
        getBody,
        setData,
        query,
    }
}

module.exports = Processor;