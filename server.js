const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const dbName = "food";
const url = `mongodb+srv://Kso-savage:Ortega@cluster0.f93jb.mongodb.net/${dbName}?retryWrites=true&w=majority`;


app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('fridge').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {fridge: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('fridge').insertOne({name: req.body.name, calories: req.body.calories, servings:req.body.servings}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/edit', (req, res) => {
  db.collection('fridge')
  .findOneAndUpdate({name: req.body.name, calories: req.body.calories, servings: req.body.servings}, {
    $set: {
      name: (req.body.newName.length === 0) ? req.body.name : req.body.newName,

      calories: (req.body.newCalories.length === 0) ? req.body.calories : req.body.newCalories,

      servings: (req.body.newServings.length === 0) ? req.body.servings : req.body.newServings,
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/remove', (req, res) => {
  db.collection('fridge').findOneAndDelete({name: req.body.name, calories: req.body.calories, servings: req.body.servings}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
