const express = require('express')
const cors = require ('cors')
const mongoose = require ('mongoose')
const Pusher = require ('pusher')

//app config
const app = express()
const port = process.env.PORT || 8080


//middlewares
app.use(express.json())
app.use(cors())


//DB config


//api routes
app.get('/', (req, res) => res.status(200).send('hello world'))

//listener
app.listen(port, () => console.log(`listening on localhost:${port}`))