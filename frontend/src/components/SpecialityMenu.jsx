import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
        <h1 className='text-2xl font-semibold mb-2'>Find by Speciality</h1>
        <p>Need care fast? Find trusted doctors and secure your spot in seconds!</p>
        <div>
            {specialityData.map((item,index)=>(
                <Link key={index} to={'/doctors/${item.speciality}'}>
                    <img src={item.image} alt="" />
                    <p>{item.speciality}</p>
                
                </Link>
            ))}

        </div>
    </div>
  )
}

export default SpecialityMenu