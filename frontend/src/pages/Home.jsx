import React from 'react'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home