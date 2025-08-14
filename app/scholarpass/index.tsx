import React from 'react'
import CallToAction from './_components/CallToAction'
import Hero from './_components/Hero'
import HowItWorks from './_components/HowItWorks'
import Opportunities from './_components/Opportunites'
import WhoItFor from './_components/WhoItFor'
import WhyItMatters from './_components/WhyITMatters'



const ScholarPass = () => {
    // Load data directly from Redux store
  // const { user, isAuthenticated, isLoading } = useAppSelector(selectAuth);
  // console.log('🏠 Home - Auth state from Redux store:', {
  //   user,
  //   isAuthenticated,
  //   isLoading,
  // });

  // Restore auth state when component mounts
  // useEffect(() => {
  //   console.log('🏠 Home - Dispatching restoreAuthState...');
  //   dispatch(restoreAuthState());
  // }, [dispatch]);
  return (
    <>
    <Hero />
    <Opportunities />
    <HowItWorks />
    <WhoItFor />
    <WhyItMatters />
    <CallToAction />
    </>
  )
}

export default ScholarPass