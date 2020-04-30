const express = require('express');

const app = express();
app.use(express.json({
    parameterLimit: 100000,
    limit:'100mb'
}));

app.use('/api', require('./routes.js'));

app.listen(5000, ()=>{
    console.log(`app listening on port 5000`);
})
