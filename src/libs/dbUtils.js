function DBUtils(){
    var CurrDataSetId = 1;

    const incrementId = () =>{
        CurrDataSetId+=1;
        // console.log("incre,emt", CurrDataSetId);
    }

    const exposeId = () =>{
        return CurrDataSetId;
    }

    const postDataSet = (data) => {
        console.log("calling api");
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
            // console.log(CurrDataSetId, "HENLO");
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