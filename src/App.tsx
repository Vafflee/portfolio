import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer";
import { ModalMessage } from "./components/ModalMessage";
import Loader from "./components/Loader";

const About = React.lazy(() => import("./components/About"));
const Projects = React.lazy(() => import("./components/Projects"));
const Skills = React.lazy(() => import("./components/Skills"));
const Contacts = React.lazy(() => import("./components/Contacts"));

function App() {
  
  
  const [modalMessageActive, setModalMessageActive] = useState(false)

  function is_touch_device() {
    return !!('ontouchstart' in window);
  }

  useEffect(() => {
    
    if (is_touch_device()) {
      document.querySelector('body')?.classList.add('_touch');
      document.querySelector('header')?.classList.add('_touch');
    } else {
      document.querySelector('body')?.classList.remove('_touch');
      document.querySelector('header')?.classList.remove('_touch');
    }

    if (modalMessageActive) {
      document.querySelector('body')?.classList.add('_scroll-block');
      document.querySelector('header')?.classList.add('_scroll-block');
    } else {
      document.querySelector('body')?.classList.remove('_scroll-block');
      document.querySelector('header')?.classList.remove('_scroll-block');
    }
    
  })

  function toggleModal() {
    setModalMessageActive(oldState => {
      // document.querySelector('.modal-message')?.classList.toggle('_active');
      return !oldState
    });
    
  }
  
  
  return (
    <div className="App">
      <Router>
        <ModalMessage isActive={modalMessageActive} toggleModal={() => toggleModal()} />
        
        <Header toggleModal={() => toggleModal()} />
        <Routes>
          <Route path="/" 
            element={ <React.Suspense fallback={<Loader/>}><About toggleModal={() => toggleModal()}/></React.Suspense> } />
          <Route path="/projects" 
            element={ <React.Suspense fallback={<Loader/>}><Projects/></React.Suspense> } />
          <Route path="/skills" 
            element={ <React.Suspense fallback={<Loader/>}><Skills/></React.Suspense> } />
          <Route path="/contacts" 
            element={ <React.Suspense fallback={<Loader/>}><Contacts/></React.Suspense> } />
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
