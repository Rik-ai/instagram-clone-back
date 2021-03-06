const express = require('express')
const cors = require ('cors')
const mongoose = require ('mongoose')
const Pusher = require ('pusher')
const dbModel = require('./dbModel');


//app config
const app = express()
const port = process.env.PORT || 8080
const pusher = new Pusher({
  appId: '1081779',
  key: '47fac1b2cc2b969c3516',
  secret: '378f2e6cfde38c44eb61',
  cluster: 'eu',
  useTLS: true
});

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

    const changeStream = mongoose.connection.collection('posts').watch()

    changeStream.on('change', (change) => {
        console.log('Change Triggered on pusher...')
        console.log(change)
        console.log('End of change')

        if (change.operationType === 'insert') {
            console.log('Triggering Pusher ***IMG UPLOAD***')

            const postDetails = change.fullDocument
            pusher.trigger('posts', 'inserted', {
                user: postDetails.user,
                caption: postDetails.caption,
                image: postDetails.image
            })
        } else {
            console.log('Uknown trigger from Pusher')
        }
    })
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