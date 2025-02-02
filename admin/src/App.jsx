
import './App.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import {Routes,Route} from 'react-router-dom'
import Orders from './pages/Orders'
import Add from './pages/Add'
import List from './pages/List'
import { ToastContainer} from 'react-toastify';

function App() {
  
 const url='https://food-delivery-um0q.onrender.com'
  return (
    <div>
      <Navbar/>
      <hr className="mt-0 mb-3 border-secondary" />
      <div className='d-flex'>
        <ToastContainer/>
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/orders' element={<Orders url={url}/>}/>
         
        </Routes>
      </div>
  
    </div>
  )
}

export default App
