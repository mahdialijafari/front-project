import React from 'react'
import MainSlider from './MainSlider'
import Categories from './Categories'
import RadioGroupRating from './RadioGroupRating'
import ChooseUs from './ChooseUs'
import Newsletter from './Newsletter'
import BlogSection from './BlogSection'

export default function Home() {
  return (
    <>
     <MainSlider/> 
     <Categories/>
     <BlogSection/>
     <ChooseUs/>
     <Newsletter/>
     <RadioGroupRating/>
    </>
  )
}
