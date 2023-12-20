import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Navbar = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate()
  const logout = ()=>{
    console.log('HEHEHE');
    localStorage.clear()
    navigate('/signup')
  }
  return (
    <div>
      {auth ? <ul className='nav-ul'>
        <li> <Link to={'/'}>Products</Link> </li>
        <li> <Link to={'/add'}>Add Product</Link> </li> 
        <li> <Link to={'/profile'}>User Profile</Link> </li>
        <li> <Link >{JSON.parse(auth).name}</Link> </li>
        <li> <Link to={'/update'}></Link> </li>

        <div className='logout'><li><Link onClick={logout} to='/signup'>Logout</Link></li></div>
        
    
      </ul>
      :<ul className='nav-ul rightSide'>
        <>
          <li><Link  to={'/signup'}>Signup</Link></li>
          <li> <Link to={'/login'}>Login</Link> </li>
          </>
        </ul>}
    </div>
  )
}

export default Navbar
