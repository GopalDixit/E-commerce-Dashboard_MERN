const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://gopaldixit9450:N4tEEMO3UwssJiYP@admincluster.rgu9w.mongodb.net/E-com?retryWrites=true&w=majority&appName=admincluster')
.then(()=>{
    console.log("MongpDB Connected")
})
.catch(()=>{
    console.log("Error in connection")
})
