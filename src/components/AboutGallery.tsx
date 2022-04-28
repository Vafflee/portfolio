import { listAll, getDownloadURL, ref } from "firebase/storage"
import { useEffect, useRef, useState } from "react"
import { storage } from '../firebase/firebase'
import { gsap } from 'gsap'

export const AboutGallery: React.FC = () => {
    
    const [imageURLs, setImageURLs] = useState<string[]>([])

    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        listAll(ref(storage, 'design-compressed'))
            .then(images => {
                // get array of urls for images
                const imagePromises: Promise<string>[] = [];
                images.items.forEach((image) => {
                    imagePromises.push(getDownloadURL(image))
                });
                Promise.all(imagePromises)
                    .then(urls => setImageURLs(urls))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

        const galleryInterval = setInterval(() => {
            gsap.to(row1Ref.current, {
                duration: 3,
                ease: "power1.inOut",
                x: Math.random() * (window.innerWidth - row1Ref.current!.scrollWidth)
            });
            gsap.to(row2Ref.current, {
                duration: 3,
                ease: "power1.inOut",
                x: Math.random() * (window.innerWidth - row2Ref.current!.scrollWidth)
            });
        }, 5000);

        return () => {
            clearInterval(galleryInterval);
        }

        
    }, [])
    

    const galleryNodes = imageURLs.map(url => 
        <div key={url} className="about-section-gallery__element">
            <img src={url} alt="gallery-work" />
        </div>); 

    return (
        <div className="about-section-gallery">
            <div className="about-section-gallery__description-sm">
                <h2 className="about-section-gallery__title h2 bold">Graphic design</h2>
                <div className="about-section-gallery__subtitle">I&rsquo;m not an artist, but i&rsquo;m trying myself as a graphic designer, working in Photoshop, Illustrator and Figma</div>
            </div>
            <div className="about-section-gallery__row about-section-gallery__row1" ref={row1Ref} >
                { galleryNodes.slice(0, 2) }
                <div className="about-section-gallery__element about-section-gallery__description">
                    <div className="about-section-gallery__title h2 bold">Graphic design</div>
                    <div className="about-section-gallery__subtitle">I&rsquo;m not an artist, but i&rsquo;m trying myself as a graphic designer, working in Photoshop, Illustrator and Figma</div>
                </div>
                { galleryNodes.slice(2, 6) }
            </div>
            <div className="about-section-gallery__row about-section-gallery__row2" ref={row2Ref} >
                { galleryNodes.slice(6, 12) }
                </div>
        </div>
)
}
