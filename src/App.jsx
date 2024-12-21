import conf from './conf/conf'
import './App.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import userAuth from './appwrite/userAuth'
import { Header, Footer } from './components'

import{login, logout} from "./store/authSlice"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    const auth = new userAuth();
    auth.getCurrentUser()
    .then(()=>{
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])

  return !loading ? (
    <div>
      <Headers/>
      <Footer/>
    </div>
  ):null
    
  
}

export default App
