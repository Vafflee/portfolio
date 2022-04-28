import reactLogo from '../images/logos/react.svg'
import mongodbLogo from '../images/logos/mongodb.svg'
import nodejsLogo from '../images/logos/nodejs.svg'
import expressLogo from '../images/logos/express.svg'
import { useEffect, useRef } from 'react';
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
gsap.registerPlugin(CustomEase);
const myEase = CustomEase.create("custom", "M0,0,C0.118,0.65,0.492,1,1,1");

function is_touch_device() {
    return !!('ontouchstart' in window);
}

export const AboutStack = () => {
    
    

    const logosRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        
        const mouseMoveListener = (event:MouseEvent) => {
            if (event.clientX > logosRef.current!.getBoundingClientRect().x && event.clientX < logosRef.current!.getBoundingClientRect().x + logosRef.current!.getBoundingClientRect().width) {
                for (let i = 1; i < 5; i++) {
                    const x = (event.clientX - logosRef.current!.getBoundingClientRect().x) / logosRef.current!.getBoundingClientRect().width;
                    const logoRect = logosRef.current!.querySelector(`.section-stack__logo:nth-child(${i}) > img`)!.getBoundingClientRect();
                    const k = 1 - Math.abs((logoRect.x - logosRef.current!.getBoundingClientRect().x + logoRect.width/2) - (event.clientX - logosRef.current!.getBoundingClientRect().x)) / window.innerWidth;
                    gsap.to(`.section-stack__logos.col-xl-8 > .section-stack__logo:nth-child(${i}) > img`, {
                        scale: 0.8 + (k*k*k*k/4),
                        ease: myEase,
                    })
                }
            }
        }
        
        if (!is_touch_device()) { 
            document.addEventListener('mousemove', mouseMoveListener);
        }
        
        return () => {
            document.removeEventListener('mousemove', mouseMoveListener);
        }
    }, [])
    

    return (
        <div className="section-stack">
        <div className="container">
            <div className="row">
                <div className="section-stack__text col-xl-4">
                    <h2 className="section-stack__title">What I use</h2>
                    <div className="section-stack__subtitle">In my projects I always use HTML and CSS for app shell. Besides that i can write app using frameworks like React for frontend and Express for backend. Also i can use MongoDB.</div>
                </div>
                <div className="section-stack__logos col-xl-8" ref={ logosRef }>
                    <div className="section-stack__logo"><img src={reactLogo} alt="react logo" /></div>
                    <div className="section-stack__logo"><img src={mongodbLogo} alt="mongodb logo" /></div>
                    <div className="section-stack__logo"><img src={nodejsLogo} alt="nodejs logo" /></div>
                    <div className="section-stack__logo"><img src={expressLogo} alt="express logo" /></div>
                </div>
            </div>
        </div>
    </div>
    )
}
