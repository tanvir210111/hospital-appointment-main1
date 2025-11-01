import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

 
const MyAppoinments = () => {

  const { doctors , backendUrl , token , getDoctorsData  } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const months = [ '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

  const slotDateFormate = (slotDate) => {
      const dateArray = slotDate.split('_')
      return dateArray[0] + ' ' + months[Number(dateArray[1]) ] + ' ' + dateArray[2]
  }



  const getUserAppointments = async () => {
    try {

      const {data} = await axios.get(backendUrl + '/api/user/appointments', {headers:{token}})
      if (data.success) {
        setAppointments(data.appointments.reverse())
      //  console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
     toast.error(error.message)
      
    }
  }


  const cancelAppointment = async (appointmentId) => {
     
    try {

      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId} , {headers:{token}})
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData() // Refresh doctors data to update slots
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }


  const makePayment = async (appointmentId)=>{
 
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
 
    try {
     
        const response = await axios.post(backendUrl + '/api/user/create-checkout-session', {appointmentId} , {headers:{token}})
    console.log(response )

   const result = stripe.redirectToCheckout({
    sessionId: response.data.id
   })

   console.log(result , "result")
   if(result.error){
    console.error("Error redirecting to checkout",result.error)
   }


    } catch (error) {
            console.error("error creating checkout", error)
    }
}

 

  useEffect(() => {
    if(token) {
      getUserAppointments()
    }
  }, [token])


  

  return (
    <div  >
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>

      <div>
        {appointments.map((item , index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}  >
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image}  />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address :</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'> <span className='text-sm text-neutral-700 font-medium'>Date & Time :</span> {slotDateFormate(item.slotDate) } | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>

             { item.isCompleted && <button  className=' sm:min-w-48 border py-2 border-green-500   text-green-500'>Completed</button>}
             {!item.cancelled && item.payment && !item.isCompleted &&   <button  className=' sm:min-w-48 border py-2 hover:bg-primary hover:text-white text-stone-500 bg-indigo-50 transition-all duration-300'>Paid</button>}
             {!item.cancelled && !item.payment && !item.isCompleted &&  <button onClick={()=>makePayment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 border py-2 hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
             {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 border py-2 hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button> }
             {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border  border-red-500 rounded text-red-500'>Appointment cancelled</button> }
            </div>
            
          </div>
         
        ))}
      </div>

 
      
    </div>
  )
}

export default MyAppoinments