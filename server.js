const express = require('express')
const cors = require ('cors')
const mongoose = require ('mongoose')
const Pusher = require ('pusher')
const dbModel = require('./dbModel');

//app config
const app = express()
const port = process.env.PORT || 8080


//middlewares
app.use(express.json())
app.use(cors())


//DB config
const connection_url = 'mongodb+srv://admin:xn7CqE6Oik9ul72U@cluster0.nkfdf.mongodb.net/insta-cloneDB?retryWrites=true&w=majority'
mongoose.connect (connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', ()=>{
    console.log('DB Connected')
})

//api routes
app.get('/', (req, res) => res.status(200).send('hello world'))

app.post('/upload', (req, res) => {
    const body = req.body

    dbModel.create(body, (err, data) => {
        if(err){
            set.status(500).send(err)
        } else {
            res.status(201).send(data)
        }

    })
})

app.get('/sync', (req, res) => {
    dbModel.find((err, data) => {
        if(err){
            set.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

//listener
app.listen(port, () => console.log(`listening on localhost:${port}`))