import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Product = () => {
    const [product, setProduct] = useState([])
    useEffect(()=>{ 
        getProduct()
    },[])
    const getProduct =async ()=>{
        let result =await fetch('https://e-commerce-dashboard-mern-4.onrender.com/products',{
          headers:{
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        result = await result.json()
        setProduct(result)
    }
    console.log(product);

    const handleDelete =async (id)=>{
      let result =await fetch(`https://e-commerce-dashboard-mern-4.onrender.com/product/${id}`,{
        method:"Delete",
        headers:{authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }})
      result = await result.json()
      if(result){
        getProduct()
      }
    }
    const handleSearch = async(event)=>{
      // console.log(event.target.value);
      let key = event.target.value
      let result =await fetch(`https://e-commerce-dashboard-mern-4.onrender.com/search/${key}`)
      result= await result.json()
      if(result)
      {
        setProduct(result);
      }
      else{
        getProduct(result)
      }

    }
  return (
    <div className='product-list'> 
      <h1>This is product page</h1>
      <input className='searchbox' onChange={handleSearch} type='text' placeholder='Search Product'></input>
      <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Brand</li>
        <li>Operation</li>

      </ul>
    {
      product.map((item,index)=><ul key={item._id}>
      <li>{index+1}</li>
      <li>{item.name}</li>
      <li>{item.price}</li>
      <li>{item.brand}</li>
      <li><button onClick={() => handleDelete(item._id)}>Delete</button>
      <Link to={"/update/"+item._id}>Update</Link></li>

    </ul>)
    }
    </div>
  )
}

export default Product
