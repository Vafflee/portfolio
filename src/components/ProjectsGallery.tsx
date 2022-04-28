import React, { useEffect, useState } from 'react'
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase';
import { ModalPicture } from './ModalPicture';
import { LazyLoadImage, LazyLoadComponent, trackWindowScroll, ScrollPosition } from 'react-lazy-load-image-component';

type GallryProps = {
    scrollPosition: ScrollPosition
}

const ProjectsGallery:React.FC<GallryProps> = ({ scrollPosition }) => {

    const [imageURLs, setImageURLs] = useState<string[]>([])
    const [modalPictureActive, setModalPictureActive] = useState(false)
    const [activeURL, setActiveURL] = useState('')

    function toggleModal(url: string) {
        setModalPictureActive(oldState => {
          return !oldState
        });
        setActiveURL(oldURL => {
          return url
        });
    }

    function cardClickHandler(url: string) {
        toggleModal(url)
    }

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
    }, [])

    const images = imageURLs.map(url =>
        <LazyLoadComponent  key={url} scrollPosition={scrollPosition}>
            <div className="section-gallery__card" onClick={() => cardClickHandler(url)}>
                <img src={url} alt="gallery card" />
                {/* <LazyLoadImage scrollPosition={scrollPosition} src={url} alt={url} /> */}
            </div>
        </LazyLoadComponent>
    )

    return (
        <>
            <ModalPicture isActive={modalPictureActive} toggleModal={(url:string ) => toggleModal(url)} url={activeURL} />
            <div className="section-gallery">
                <div className="container">
                    <h2 className="section-gallery__title h2">Graphic design</h2>
                    <div className="section-gallery__content">
                    {images.length ? images : 
                        <div className='gallery-loader'>
                            <div className="loadingio-spinner-rolling-upw2qshvvl8">
                            <div className="ldio-y9c9revy52">
                                <div></div>
                            </div>
                            </div>
                        </div>
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

export default trackWindowScroll(ProjectsGallery);