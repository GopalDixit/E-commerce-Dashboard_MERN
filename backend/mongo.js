const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/E-commerce')
.then(()=>{
    console.log("MongpDB Connected")
})
.catch(()=>{
    console.log("Error in connection")
})
