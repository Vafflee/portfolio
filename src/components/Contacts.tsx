import { collection, getDocs } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { db, storage } from '../firebase/firebase'

type Contact = {
    title: string,
    subtitle: string,
    imgURL: string,
    url: string
}

export default function Contacts() {

    const [contacts, setContacts] = useState<Contact[]>([])

    useEffect(() => {
        
        window.scrollTo(0,0); 
      
        getDocs(collection(db, 'contacts'))
        .then(async snapshot => {
            const contactsData: Contact[] = [];
            for (let i = 0; i < snapshot.docs.length; i++) {
                const doc = snapshot.docs[i];
                try {
                  contactsData.push({
                      title: doc.data().title, 
                      subtitle: doc.data().subtitle,
                      url: doc.data().url,
                      imgURL: await getDownloadURL(ref(storage, doc.data().imgPath))
                  })
                } catch (err) { console.log(err) }
            };
            setContacts(contactsData);
        })
        .catch(err => console.log(err));

    }, [])

    const contactNodes = contacts.map(contact => 
        <a key={contact.subtitle} className="section-contacts__card contact-card" href={contact.url} target="_blank">
            <div className="contact-card__icon"> <img src={contact.imgURL} alt={contact.subtitle} /></div>
            <div className="contact-card__title bold">{contact.title}</div>
            <div className="contact-card__subtitle">{contact.subtitle}</div>
        </a>
    )

    return (
            <div className="section-contacts">
                <div className="section-contacts__bg1"></div>
                <div className="section-contacts__bg2"></div>
                <div className="section-contacts__bg3"></div>
                <div className="section-contacts__bg4"></div>
                <div className="container">
                    <h2 className="section-contacts__title h2">My contacts</h2>
                    <div className="section-contacts__cards"> 
                        {contactNodes.length ? contactNodes : 
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
    )
}
