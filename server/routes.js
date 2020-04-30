const router = require('express').Router();
const sqlite = require('sqlite3');

var db;

router.get('/init', (req, res)=>{
    db = new sqlite.Database(':memory:');
    db.run(`CREATE TABLE plotData (id TEXT, data TEXT)`);
    res.json("Database created");
});

router.get('/all', (req, res)=>{
    db.all(`SELECT * from plotData`, (err, rows)=>{
        res.json(rows)
    });
});

router.get('/:id', (req, res)=>{
    let id = req.params.id;
    db.get(`SELECT * from plotData WHERE id=?`, [id] ,(err, row)=>{
        if(err){
            console.log(err)
        }
        res.json(row);
    });
});

router.put('/put', (req, res)=>{
    let id = req.body.id;
    let data = req.body.data;
    db.serialize(function(){
        db.get(`SELECT * from plotData WHERE id=?`, [id], (err, row)=>{
            if(err){
                return console.log(err);
            }
            if(row===undefined){
                return res.json("Row does not exist");
            }
        });
        db.run(`DELETE from plotData WHERE id=?`, [id]);
        db.run(`INSERT INTO plotData(id, data) VALUES(?,?)`, [id, data], (err, row)=>{
            // res.json(`added data with id ${id}`);
        })
        
    });
});

router.post('/check', (req, res)=>{
    let id = req.body.id;
    console.log(id);
    db.get(`SELECT EXISTS(SELECT 1 FROM plotData WHERE id=? LIMIT 1)`, [id], (err, row)=>{
        if(err){
            return console.log(err);;
        }
        if(row){
            console.log("yooohooo");
            res.json({"bool": "true"});
        }
        else{
            console.log("nooooohoooo")
            res.json({"bool":"false"});
        }
        
    })
})

router.post('/add', (req, res)=>{
    let newid = req.body.id;
    let newData = req.body.data;
    console.log("add called:", newid);
    if(!newid){
        return console.log("no id");
    };
    db.run(`INSERT INTO plotData(id, data) VALUES (?,?)`, [newid, newData], (err, row)=>{
        res.json(`added data with id ${newid}`);
    })
});

router.get('/kill', (req, res)=>{
    db.close();
});

module.exports = router;

// TO solve: 
// deleting a row that does not exist