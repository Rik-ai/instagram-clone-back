const mongoose = require('mongoose')


const instance = mongoose.Schema({
    caption: String,
    user: String,
    image: String,
    comments: [],
})


//collection
const exportMachine = mongoose.model('posts', instance)

module.exports = exportMachine