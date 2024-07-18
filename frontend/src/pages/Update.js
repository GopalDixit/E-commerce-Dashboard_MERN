import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Update = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [brand, setBrand] = useState('')

    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getProductDetails()
    },[])

    const getProductDetails =async ()=>{
        console.log(name,price,brand);
        let result = await fetch(`https://e-commerce-dashboard-mern-4.onrender.com/product/${params.id}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
        });
        result = await result.json()
        setName(result.name)
        setPrice(result.price)
        setBrand(result.brand)
    }
    const handleClick = async () => {
        let result = await fetch(`https://e-commerce-dashboard-mern-4.onrender.com/product/${params.id}`,{
            method:'put',
            body:JSON.stringify({name,price,brand}),
            headers:{
                'Content-Type':'application/json',
                 authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })
        result = await result.json()
        console.log(result);
        navigate('/')
    }
    return (
        <div className='products'>
            <h1>Update Product</h1>
            <input className='inputBox' type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Product Name' />
            

            <input className='inputBox' type="Number" value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter Product Price' />
          

            <input className='inputBox' type="text" value={brand} onChange={(e) => { setBrand(e.target.value) }} placeholder='Enter Product Brand' />
       

            <button className='updateButton' onClick={handleClick} type='submit'>Update Product</button>
        </div>
    )

}
export default Update
