import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
gsap.registerPlugin(CustomEase)
const myEase = CustomEase.create("custom", "M0,0,C0.118,0.65,0.492,1,1,1")

type ModalPitureProps = {
    isActive: boolean,
    toggleModal: (url: string) => void,
    url: string
}

export const ModalPicture:React.FC<ModalPitureProps> = ({ isActive, toggleModal, url }) => {
    
    const [isZoomed, setIsZoomed] = useState(false)
    const pictureRef = useRef<HTMLDivElement>(null)
    
    function toggleZoom() {
        setIsZoomed(oldState => {
            pictureRef.current?.setAttribute('data-zoomed', (!oldState).toString())
            return !oldState
        });
    }

    function is_touch_device() {
        return !!('ontouchstart' in window);
    }

    function mouseMoveListener (event: globalThis.MouseEvent) {
        console.log(pictureRef.current?.getAttribute('data-zoomed') === 'true')
        if (pictureRef.current?.getAttribute('data-zoomed') === 'true') {
            console.log(event.clientX, event.clientY)
            gsap.to(pictureRef.current, {
                ease: myEase,
                xPercent: (window.innerWidth - event.clientX) / window.innerWidth*100 - 50,
                yPercent: (window.innerHeight - event.clientY) / window.innerHeight*100 - 50
            })
        } else {
            gsap.to(pictureRef.current, {
                ease: myEase,
                xPercent: 0,
                yPercent: 0
            })
        }
    }

    useEffect(() => {
        if (!is_touch_device()) {   
            document.addEventListener('mousemove', mouseMoveListener);
        }
        return () => {
            document.removeEventListener('mousemove', mouseMoveListener)
        }
    }, [])
    

    useEffect(() => {
        if (isZoomed) {
            gsap.to(pictureRef.current, {
                ease: 'power1.inOut',
                scale: 2
            })
        } else {
            gsap.to(pictureRef.current, {
                ease: 'power1.inOut',
                scale: 1
            })
        }
    }, [isZoomed])

    return (
        <div 
            className={"modal modal-pic " + (isActive ? '_active' : '')}
            onClick={() => { 
                if (isZoomed) toggleZoom();
                toggleModal('')
            }}
        >
            <div ref={pictureRef} onClick={(event: React.MouseEvent) => {event.stopPropagation(); toggleZoom()}} className="modal-pic__picture"><img src={url} /></div>
        </div>
    )
}
