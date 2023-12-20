import React, { useState } from 'react'

const Addproduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [brand, setBrand] = useState('')

    const [error,setError]= useState('')
    const handleClick = async () => {
        if(!name, !price, !brand){
            setError(true)
            return false
        }
        console.log(name, price, brand);
        const userID = JSON.parse(localStorage.getItem('user'))._id
        let result = await fetch('http://localhost:5600/add', {
                method: 'post',
                body: JSON.stringify({ name, price, brand, userID }),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            if (!result.ok) {
                throw new Error('Network response was not ok');
            }

            // Assuming the API call was successful, reset the input fields
            setName('');
            setPrice('');
            setBrand('');
            result =await result.json()
            console.log(result);
    }
    return (
        <div className='products'>
            <h1>Add Product</h1>
            <input className='inputBox' type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Product Name' />
            {error && !name && <span className='invalid-input'>Enter Valid Details</span>}

            <input className='inputBox' type="Number" value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter Product Price' />
            {error && !price && <span className='invalid-input'>Enter Valid Details</span>}

            <input className='inputBox' type="text" value={brand} onChange={(e) => { setBrand(e.target.value) }} placeholder='Enter Product Brand' />
            {error && !brand && <span className='invalid-input'>Enter Valid Details</span>}

            <button className='addButton' onClick={handleClick} type='submit'>Add Product</button>
        </div>
    )

}
export default Addproduct
