import './verify.css'
import React, { useContext, useEffect } from 'react'
import {  useNavigate, useSearchParams } from 'react-router-dom'
import { Context } from '../../Context/Context';
import axios from 'axios'

export default function Verify() {
  const [searchParams,setSearchParams]=useSearchParams();
  const success=searchParams.get("success");
  const orderId=searchParams.get("orderId");
  const {url}=useContext(Context)
  const navigate=useNavigate()

  const verifyPayment=async()=>{
    const response = await axios.post(url+"/api/order/verify",{success,orderId})
    if(response.data.success){
        navigate("/myorders")
    }
    else{
      navigate('/')
    }
  }

  useEffect(()=>{
    verifyPayment();
  })
  return (
    <div>
      <div className='verify'>
        <div className='spinner'>

        </div>
      </div>
    </div>
  )
}
