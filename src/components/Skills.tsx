import React, { useEffect, useState } from 'react'
import { storage, db } from '../firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage';

type Skill = {
    title: string,
    description: string,
    imgURL: string
}

type Skills = {
    markup: Skill[],
    programming: Skill[]
}

export default function Skills() {

    const [skills, setSkills] = useState<Skills>({markup: [], programming: []});

    useEffect(() => {
        window.scrollTo(0,0); 

        const skillsMarkup: Skill[] = [];
        const skillsProgramming: Skill[] = [];

        const qMarkup = query(collection(db, 'skills'), where('type', '==', 'markup'));
        const markupPromise = getDocs(qMarkup)
        .then(async snapshot => {
            for (let i = 0; i < snapshot.docs.length; i++) {
                const doc = snapshot.docs[i];
                try {
                  skillsMarkup.push({
                      title: doc.data().title, 
                      description: doc.data().description,
                      imgURL: await getDownloadURL(ref(storage, doc.data().imgPath))
                  })
                } catch (err) { console.log(err) }
            };
        })
        .catch(err => console.log(err));
        
        const qProgramming = query(collection(db, 'skills'), where('type', '==', 'programming'));
        const programmingPromise = getDocs(qProgramming)
        .then(async snapshot => {
            for (let i = 0; i < snapshot.docs.length; i++) {
                const doc = snapshot.docs[i];
                try {
                  skillsProgramming.push({
                      title: doc.data().title, 
                      description: doc.data().description,
                      imgURL: await getDownloadURL(ref(storage, doc.data().imgPath))
                  })
                } catch (err) { console.log(err) }
            };
        })
        .catch(err => console.log(err));

        Promise.all([markupPromise, programmingPromise]).then(() => {
            setSkills({
                markup: skillsMarkup,
                programming: skillsProgramming
            })
        })

    }, [])
    
    const markupNodes = skills.markup.map(skill => 
        <div key={skill.title} className="section-markup__skill skill">
            <div className="skill__icon"> <img src={skill.imgURL} alt={skill.title} /></div>
            <h2 className="skill__title bold">{skill.title}</h2>
            <div className="skill__subtitle">{skill.description}</div>
        </div> 
    );
    const programmingNodes = skills.programming.map(skill => 
        <div key={skill.title} className="section-programming__skill skill">
            <div className="skill__icon"> <img src={skill.imgURL} alt={skill.title} /></div>
            <h2 className="skill__title bold">{skill.title}</h2>
            <div className="skill__subtitle">{skill.description}</div>
        </div> 
    );

    return (
        <>
            <div className="section-markup">
                <div className="container">
                    <h1 className="h1 section-markup__title">My skills</h1>
                    <div className="section-markup__content">
                        {markupNodes.length ? markupNodes : 
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
            <div className="section-programming">
                <div className="container">
                    <div className="section-programming__content">
                        {programmingNodes.length ? programmingNodes : 
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
