function DBUtils(){
    var CurrDataSetId = 1;

    const incrementId = () =>{
        CurrDataSetId+=1;
    }

    const exposeId = () =>{
        return CurrDataSetId;
    }

    const postDataSet = (data) => {
        fetch('/api/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id : CurrDataSetId,
                data : data
            })
        })
        .then(()=>{ 
            incrementId();
        })
        .catch(err=>console.log(err))
    }

    return{
        postDataSet,
        exposeId,
    }
}

export default DBUtils;