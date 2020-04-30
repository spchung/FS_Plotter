function constructSqlDB() {
    fetch('/api/init', {
      method:'GET',
    })
    .then(()=> console.log('db success'))
    .catch(()=>console.log("db construction error"))
}