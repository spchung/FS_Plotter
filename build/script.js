function constructSqlDB() {
    fetch('/api/init', {
      method:'GET',
    })
    .catch(()=>console.log("db construction error"))
}