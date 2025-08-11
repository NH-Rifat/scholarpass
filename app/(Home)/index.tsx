import React from 'react'
import CallToAction from './_components/CallToAction'
import Hero from './_components/Hero'
import HowItWorks from './_components/HowItWorks'
import Opportunities from './_components/Opportunites'
import WhoItFor from './_components/WhoItFor'
import WhyITMatters from './_components/WhyITMatters'

const Home = () => {
  return (
    <>
    <Hero />
    <Opportunities />
    <HowItWorks />
    <WhoItFor />
    <WhyITMatters />
    <CallToAction />
    </>
  )
}

export default Home