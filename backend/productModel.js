const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    userID:{
        type:mongoose.Schema.Types.Mixed
    }
})

module.exports = mongoose.model('products',productSchema)