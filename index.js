var express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
const port = 8080;
var url = "mongodb://localhost:27017/IMSDB";
var MongoClient = require("mongodb").MongoClient;
var dbo;
app.listen(port, ()=>
{
    console.log("Server Up and Listening at " + port)
});



app.post('/imspost',(req, res)=>{
    console.log(req.body.name);
    var data = req.body;
    console.log(data.name);
    var query = {name: data.name.toUpperCase(), category: data.category.toUpperCase()};
    var k = 0;
    MongoClient.connect(url, {useNewUrlParser:true},(err, db)=>{
        if(err) throw err;
        console.log("Connection Established");
        dbo = db.db("IMSDB");
        dbo.collection("IMSColl").find(query).toArray(function(err, result){
            if(result.length>0)
            {
                console.log(result.length);
                for(let i = 0; i< result.length; i++)
                {
                    if(result[i].batch == data.batch.toUpperCase())
                    {
                        k=1;
                        dbo.collection("IMSColl").updateOne({batch: data.batch, name: result[i].name, category: result[i].category} , {$set: {quant : result[i].quant+data.quant}}, {upsert: true}, (err, resp)=>{
                            if(err) throw err;
                            return res.status(200).json({'message':"Data updated Successfully", 'quant':data.quant+result[i].quant});
                        });
                    }
                }
                if(k==0)
                {
                    console.log("isme aya kya");
                    var myobj = {name : data.name.toUpperCase(), category:data.category.toUpperCase(), quant: data.quant,price: data.price,batch: data.batch.toUpperCase(), expdate: data.expdate}
                    console.log(k);
                    dbo.collection("IMSColl").insertOne(myobj,(err, resful)=>{
                        if(err) throw err;
                        return res.status(200).json({'message': "New batch of item inserted"});
                    });
                }
            }
            else{
                console.log("isme bhi aya kya");
                var myobj = {name : data.name.toUpperCase(), category:data.category.toUpperCase(), quant: data.quant,price: data.price,batch: data.batch.toUpperCase(), expdate: data.expdate}
                dbo.collection("IMSColl").insertOne(myobj,(err, resful)=>{
                    if(err) throw err;
                    return res.status(200).json({'message': "Data added Successfully"});
                });
            }
        })
})
});

app.post('/imsgetlive', (req, res)=>{
    var searchTerm = req.body.name.toUpperCase();
    MongoClient.connect(url, {useNewUrlParser: true}, (err, db)=>{
        if(err) throw err;
        dbo=db.db("IMSDB");
        dbo.collection("IMSColl").find({name : {$regex : new RegExp(searchTerm)}}).toArray(function(err, result){
           return res.status(200).json(result);
        });
            

    })
});
app.post('/imsgetmedstock',(req, res)=>{
    var sum = 0;
    console.log(req.body.name);
    var query = {name : req.body.name.toUpperCase(), category : req.body.categ.toUpperCase()};
    MongoClient.connect(url, {useNewUrlParser: true},(err, db)=>{
        if(err) throw err;
        console.log("Connection hui gawa");
        dbo = db.db("IMSDB");
        dbo.collection("IMSColl").find(query).toArray(function(err, resp){
            console.log(resp);
            for(var i = 0; i < resp.length; i++)
            {
                sum+=resp[i].quant;
            }
           return  res.status(200).json( {'quant': sum, 'op':resp});
        });
    })

});

app.get('/getFullStock', (req, res)=>{
    var sum = 0;
    console.log(req.body.name);
    MongoClient.connect(url, {useNewUrlParser: true},(err, db)=>{
        if(err) throw err;
        console.log("Connection hui gawa");
        dbo = db.db("IMSDB");
        dbo.collection("IMSColl").find({}).toArray(function(err, resp){
            console.log(resp);
            for(var i = 0; i < resp.length; i++)
            {
                sum+=resp[i].quant;
            }
           return  res.status(200).json( {'quant': sum, 'op':resp});
        });
    })
})

app.post('/imsgetfulldata', (req, res)=>{
    var searchTerm = req.body.batch.toUpperCase();
    var query = {name : req.body.name, category : req.body.batch};
    console.log(req.body.name);
    MongoClient.connect(url, {useNewUrlParser: true},(err, db)=>{
        if(err) throwerr;
        console.log("Connection Established");
        dbo = db.db("IMSDB");
        dbo.collection("IMSColl").find({category : {$regex : new RegExp(searchTerm)}, name : req.body.name}).toArray(function(err, resp){
            
            return res.status(200).json(resp);
        })
    })
})

app.post('/selectitemdata', (req, res)=>{
    var query = {name : req.body.name, batch : req.body.batch};
    var quant = req.body.quant;
    console.log(quant);
    MongoClient.connect(url, {useNewUrlParser: true},(err, db)=>{
        if(err) throwerr;
        console.log("Connection Established");
        dbo = db.db("IMSDB");
        dbo.collection("IMSColl").find(query).toArray(function(err, resp){
            console.log(resp[0].quant);
            if(resp[0].quant<quant)
            {
                return res.status(200).json({'message': "Out of stock"});
            }
            else if(resp[0].quant==quant)
            {
                dbo.collection("IMSColl").remove(query);
                    return res.status(200).json(resp);
            }
            else{
                dbo.collection("IMSColl").updateOne({name: req.body.name, batch: req.body.batch}, {$set: {quant : resp[0].quant-req.body.quant}}, (err, respon)=>{
                    return res.status(200).json(resp);
                })
            
            }
        })
    })
})


