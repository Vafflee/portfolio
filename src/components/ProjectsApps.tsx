import { useEffect, useState } from 'react'
import { storage, db } from '../firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage';

type AppCardProps = {
  title: string,
  url: string,
  imgURL: string
}

const AppCard:React.FC<AppCardProps> = ({ title, url, imgURL }) => {
  return (
    <a className="section-apps__card" href={url} target="_blank">
      <img className="section-apps-app-cover" src={imgURL} alt="player app cover" />
      <div className="section-apps__app-title bold">
          {title}
      </div>
    </a>
  )
}

interface App {
    title: string,
    url: string,
    imgURL: string
}

export const ProjectsApps = () => {

    const [apps, setApps] = useState<App[]>([])

    useEffect(() => {
        getDocs(collection(db, 'myapps'))
        .then(async snapshot => {
            const appsData:App[] = [];
            for (let i = 0; i < snapshot.docs.length; i++) {
                const doc = snapshot.docs[i];
                try {
                  appsData.push({
                      title: doc.data().title, 
                      url: doc.data().url,
                      imgURL: await getDownloadURL(ref(storage, doc.data().imgPath))
                  })
                  
                } catch (err) {
                  console.log(err);
                }
            };
            setApps(appsData);
        })
        .catch(err => console.log(err));
    }, [])
    
    const appNodes = apps.map(app => 
        <AppCard key={app.title} title={app.title} url={app.url} imgURL={app.imgURL}/>
    );

    return (
      <div className="section-apps">
        <div className="container">
          <div className="section-apps__title">
            <h2 className="h2">Programming</h2>
          </div>
          <div className="section-apps__content">
            {appNodes.length ? appNodes : 
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
    );
}
