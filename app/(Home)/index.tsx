import { useAppDispatch } from '@/store';
import React from 'react';
import Hero from './_components/Hero';
import LearningGoals from './_components/LearningGoals';
import RecommendedCourses from './_components/RecommendedCourses';
import RecommendedExams from './_components/RecommendedExams';
import RecommendedGames from './_components/RecommendedGames';
import TopInstitutes from './_components/TopInstitutes';
import TrendingCourses from './_components/TrendingCourses';


const Home = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Hero />
      <LearningGoals />
      <RecommendedCourses />
      <RecommendedGames />
      <RecommendedExams />
      <TrendingCourses />
      <TopInstitutes />
    </>
  )
}

export default Home