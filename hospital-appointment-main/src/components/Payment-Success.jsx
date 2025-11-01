import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const PaymentSuccess = () => {

 const { doctors , backendUrl , token , getDoctorsData  } = useContext(AppContext)

    useEffect(()=>{
        const query = new URLSearchParams(window.location.search);
        const session_id = query.get("session_id");
        console.log(session_id)
        if(session_id){
      
          const confirmedPayment = async () => {
      
              const {data}  =await axios.post(backendUrl + '/api/user/confirm-payment',{
                      session_id: session_id },
                  {
                    headers:{
                      token
                    }
                  })
                  
      
      
                  console.log( data , "confirm response")
                 
                  }
                  confirmedPayment();
      
          }
          
        
      }, [])
  return (
    <div className="w-full h-[90vh] flex flex-col items-center justify-center text-center">
    <h2 className="text-2xl font-bold text-green-600">✅ Payment Successful</h2>
    <p className="text-gray-600 mt-2">Your appointment is now confirmed.</p>
    <Link
      to="/"
      className="mt-4 text-blue-500 hover:underline font-medium"
    >
      Go To Home →
    </Link>
  </div>
  )
}

export default PaymentSuccess