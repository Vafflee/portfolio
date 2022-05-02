import React, { useEffect, useState } from 'react'
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase';
import { LazyLoadComponent, trackWindowScroll, ScrollPosition } from 'react-lazy-load-image-component';
import { Link, Outlet } from 'react-router-dom';


type GallryProps = {
    scrollPosition: ScrollPosition
}

type ImageObject = {
    name: string,
    url: string
}

const ProjectsGallery:React.FC<GallryProps> = ({ scrollPosition }) => {

    const [images, setImages] = useState<ImageObject[]>([])

    useEffect(() => {
        listAll(ref(storage, 'design-compressed'))
            .then(images => {
                // get array of urls for images
                const imagePromises: Promise<ImageObject>[] = [];
                images.items.forEach((image) => {
                    imagePromises.push(new Promise((res, rej) => {
                        getDownloadURL(image).then((url) => {
                            res({name: image.name, url: url})
                        }).catch((err) => rej(err))
                    }))
                });
                Promise.all(imagePromises)
                    .then(imgs => setImages(imgs))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }, [])

    const imagesNodes = images.map((image:ImageObject) =>
        <LazyLoadComponent  key={image.name} scrollPosition={scrollPosition}>
            <Link to={`/projects/${image.name.split('.')[0]}`} className="section-gallery__card">
                <img src={image.url} alt={image.name} />
            </Link>
        </LazyLoadComponent>
    )

    return (
        <>
            <Outlet />
            <div className="section-gallery">
                <div className="container">
                    <h2 className="section-gallery__title h2">Graphic design</h2>
                    <div className="section-gallery__content">
                    {imagesNodes.length ? imagesNodes : 
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
