import React, { useEffect, useState } from 'react'
import { ProjectsApps } from './ProjectsApps'
import ProjectsGallery from './ProjectsGallery'

export default function Projects() {

  useEffect(() => {
    window.scrollTo(0,0); 
  }, [])

  return (
    <>
      <ProjectsApps/>
      <ProjectsGallery/>
    </>
  )
}
