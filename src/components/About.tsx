import React, { useEffect } from 'react'
import { AboutAbout } from './AboutAbout'
import { AboutHello } from './AboutHello'
import { AboutStack } from './AboutStack'
import { AboutGallery } from './AboutGallery'

type AboutProps = {
  toggleModal: () => void
}

const About: React.FC<AboutProps> = ({ toggleModal }) => {
  
  useEffect(() => {
    window.scrollTo(0,0); 
  }, [])

  return (
    <>
        <AboutHello toggleModal={() => toggleModal()}/>
        <AboutAbout/>
        <AboutStack/>
        <AboutGallery/>
    </>
  )
}
export default About;