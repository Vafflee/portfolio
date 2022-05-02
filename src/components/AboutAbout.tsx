import quizPicture from '../images/apps/quiz.webp'
import clockPicture from '../images/apps/clock.webp'
import playerPicture from '../images/apps/player.webp'
import { useEffect, useRef } from 'react';
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
gsap.registerPlugin(CustomEase);
const myEase = CustomEase.create("custom", "M0,0,C0.118,0.65,0.492,1,1,1");

import is_touch_device from './is_touch_device'

type AboutAboutProps = {
    mousePos: number[]
}

export const AboutAbout = () => {

    const appsRef = useRef<HTMLDivElement>(null);
    const smAppsRef = useRef<HTMLDivElement>(null);

    const appsElement = gsap.utils.selector(appsRef);

    const mouseMoveListener = (event: MouseEvent) => {
        let x = event.clientX / window.innerWidth;
        let y = event.clientY / window.innerHeight;
        gsap.to(appsElement('.section-about__app:nth-child(3)'), {
            // duration: 1,
            x: -(x * 80 - 40),
            y: (y - 0.5) * -10,
            ease: myEase,
        })
        gsap.to(appsElement('.section-about__app:nth-child(2)'), {
            // duration: 1,
            x: -(x * 50 - 25),
            y: (y - 0.5) * -10,
            ease: myEase,
        })
        gsap.to(appsElement('.section-about__app:nth-child(1)'), {
            x: -(x * 30 - 15),
            y: (y - 0.5) * -10,
            ease: myEase,
        })
    }

    useEffect(() => {
        if (is_touch_device()) {
            gsap.to(smAppsRef.current, {
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                x: window.innerWidth - smAppsRef.current!.scrollWidth
            })
        } else {
            document.addEventListener('mousemove', mouseMoveListener)
        }

        return () => {
            document.removeEventListener('mousemove', mouseMoveListener);
        }
    }, [])
    
    useEffect(() => {
      
        

    })
    

  return (
    <div className="section-about">
        <div className="container">
            <div className="row">
                <div className="section-about__text col-md-4">
                    <h2 className="section-about__title h2">About me</h2>
                    <p className="section-about__subtitle">Now I am a second year student at KSPEU majoring in Software Development Technologies. In addition to the curriculum, I actively study HTML, CSS and JavaScript to make my Pet-projects.</p>
                </div>
                <div className="section-about__apps col-md-8" ref={ appsRef }>
                    <div className="section-about__app"><img src={ clockPicture } alt="my app galery" /></div>
                    <div className="section-about__app"><img src={ quizPicture } alt="my app galery" /></div>
                    <div className="section-about__app"><img src={ playerPicture } alt="my app galery" /></div>
                </div>
            </div>
        </div>
        <div className="section-about__apps-sm col-md-8" ref={ smAppsRef }>
            <div className="section-about__app"><img src={ clockPicture } alt="my app galery" /></div>
            <div className="section-about__app"><img src={ quizPicture } alt="my app galery" /></div>
            <div className="section-about__app"><img src={ playerPicture } alt="my app galery" /></div>
        </div>
    </div>
  )
}
