import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
gsap.registerPlugin(CustomEase)
const myEase = CustomEase.create("custom", "M0,0,C0.118,0.65,0.492,1,1,1")
import { useParams } from 'react-router-dom'
import { storage } from '../firebase/firebase'
import { getDownloadURL, ref } from 'firebase/storage'

type ModalPitureProps = {
    isActive: boolean,
}

export const ModalPicture:React.FC<ModalPitureProps> = ({ isActive }) => {
    
    const [image, setImage] = useState<string>('')
    const [isZoomed, setIsZoomed] = useState(false)
    const pictureRef = useRef<HTMLDivElement>(null)
    let paramsHook = useParams()
    
    function toggleZoom() {
        setIsZoomed(oldState => {
            pictureRef.current?.setAttribute('data-zoomed', (!oldState).toString())
            return !oldState
        });
    }

    function hashChangeHandler() {
        if (isZoomed) {
            toggleZoom();
        }
    }
    function is_touch_device() {
        return !!('ontouchstart' in window);
    }

    function mouseMoveListener (event: globalThis.MouseEvent) {
        // console.log(pictureRef.current?.getAttribute('data-zoomed') === 'true')
        if (pictureRef.current?.getAttribute('data-zoomed') === 'true') {
            // console.log(event.clientX, event.clientY)
            if (!is_touch_device()) {
                gsap.to(pictureRef.current, {
                    ease: myEase,
                    xPercent: (window.innerWidth - event.clientX) / window.innerWidth*100 - 50,
                    yPercent: (window.innerHeight - event.clientY) / window.innerHeight*100 - 50
                })
            }
        } else {
            gsap.to(pictureRef.current, {
                ease: myEase,
                xPercent: 0,
                yPercent: 0
            })
        }
    }

    useEffect(() => {
        document.querySelector('body')?.classList.add('_scroll-block');
        document.querySelector('header')?.classList.add('_scroll-block');
        getDownloadURL(ref(storage, `design-compressed/${paramsHook.imageName}.webp`))
            .then(url => {
                // console.log(url)
                setImage(url);
            })
            .catch(err => console.log(err))
        if (!is_touch_device()) {   
            document.addEventListener('mousemove', mouseMoveListener);
        }
        return () => {
            document.querySelector('body')?.classList.remove('_scroll-block');
            document.querySelector('header')?.classList.remove('_scroll-block');
            document.removeEventListener('mousemove', mouseMoveListener)
        }
    }, [])
    

    useEffect(() => {
        if (isZoomed) {
            if (!is_touch_device()) {
                gsap.to(pictureRef.current, {
                    ease: 'power1.inOut',
                    scale: 2
                })
            }
        } else {
            gsap.to(pictureRef.current, {
                ease: 'power1.inOut',
                scale: 1
            })
        }
    }, [isZoomed])

    const params = useParams()

    return (
        <div 
            className={"modal modal-pic " + (isActive ? '_active' : '')}
            onClick={() => { 
                if (isZoomed) toggleZoom()
                window.history.back()
            }}
        >
            <div ref={pictureRef} onClick={(event: React.MouseEvent) => {event.stopPropagation(); toggleZoom()}} className="modal-pic__picture"><img src={image} /></div>
        </div>
    )
}
