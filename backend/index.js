const express = require('express')
const mongoose = require('./mongo')
const product = require('./productModel')
const user = require('./userModel')
const cors = require('cors')

const Jwt = require('jsonwebtoken')
const jwtKey = "E-comm" // It should be secret

const app = express();

app.use(express.json())
app.use(cors());


app.post('/signup',async (req,resp)=>{
    let userdata =new user(req.body);
    let result = await userdata.save()
    Jwt.sign({result},jwtKey,(err,token)=>{
      if(err){
        resp.send("Something went wrong......")
      }
      else{
        resp.send({result,SecretToken:token})
      }

    })
})

app.post('/login',async(req,resp)=>{

    let userdata = await user.findOne(req.body)
    if(req.body.password && req.body.name){ // is line ka mtlb hame dono details chahhiye
        if(userdata){
          Jwt.sign({userdata},jwtKey,(err,token)=>{
            if(err){
              resp.send("Something went wrong......")
            }
            else{
              resp.send({userdata,SecretToken:token})
            }

          })
        }
        else{
            resp.send("No user found")
        }
    }
    else{
        resp.send("No user found")
    }
    
})

app.post('/add',verifyToken,async(req,resp)=>{

    let productdata = new product(req.body)
    let result = await productdata.save()
    resp.send(result)

})

app.get('/products',verifyToken, async (req, resp) => {
    try {
      let products = await product.find();
      if (products.length > 0) {
        resp.send(products);
      } else {
        resp.send("Add product");
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      resp.status(500).send("Internal Server Error");
    }
  });

app.delete('/product/:id',async (req,resp)=>{
    const result =await product.deleteOne({_id:req.params.id})
    resp.send(result)

})

app.get('/product/:id',async (req,resp)=>{
    let result = await product.findOne({_id:req.params.id})
    if(result){
        resp.send(result)
    }
    else{
        resp.send("No Record Found")
    }
})

app.put('/product/:id',async (req,resp)=>{
    let result = await product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        })
        resp.send(result)
})

app.get('/search/:key',verifyToken, async (req, resp) => {
    try {
      let result = await product.find({
        $or: [
          { name: { $regex: req.params.key, $options: 'i' } },
          { price: { $regex: req.params.key, $options: 'i' } },
          { brand: { $regex: req.params.key, $options: 'i' } },
        ],
      });
      resp.send(result);
    } catch (error) {
      console.error('Error searching products:', error);
      resp.status(500).send("Internal Server Error");
    }
  });

  function verifyToken(req,resp,next){
    let token = req.headers['authorization']
    if(token){
      token = token.split(' ')[1]
      console.log("Middleware called.........",token);
    Jwt.verify(token,jwtKey,(err,valid)=>{
      if(err){
        resp.send("Error occured becoz of invalid token")
      }
      else{
        next()
      }
    })
    }
    else{
      resp.send("ERRRRRRRR")
    }
  }
app.listen(5600)
