import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm  '>

            {/* Left side */}

            <div>
                <img className='mb-5 w-40' src={assets.logo}/>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia recusandae voluptates libero, quam at cupiditate voluptate obcaecati rem quidem delectus.</p>
            </div>

            {/* Center section */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            {/* Right side */}
            <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+880 1705776033 or +880 01744387719</li>
                    <li>nazmul210121@diit.edu.bd or tanvir210111@diit.edu.bd</li>
                </ul>
            </div>
        </div>

                 {/* Copyright text */}

        <div>
                         <hr/>
            <p className='py-5 text-sm text-center'>Copyright © 2025 Nazmul(210121) & Tanvir(210111) . All rights reserved.</p>
        </div>

    </div>
  )
}

export default Footer
