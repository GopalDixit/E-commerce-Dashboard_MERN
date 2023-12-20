import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './pages/Login';
import Addproduct from './pages/Addproduct';
import Product from './pages/Product';
import Update from './pages/Update'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route element={<PrivateComponent/>}>

        <Route path='/' element={<Product/>}></Route>
        <Route path='/add' element={<Addproduct/>}></Route>
        <Route path='/update/:id' element={<Update/>}></Route>
        <Route path='/logout' element={<h1>Logout Component</h1>}></Route>
        <Route path='/profile' element={<h1>User Profile Component</h1>}></Route>

        </Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>

      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
