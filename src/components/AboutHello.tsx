import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import scrollIcon from '../images/icons/scroll.svg'
gsap.registerPlugin(ScrollTrigger)

type AboutHelloProps = {
  toggleModal: () => void
}

export const AboutHello:React.FC<AboutHelloProps> = ({ toggleModal }) => {

  const helloTitleRef = useRef(null);
  const helloSubtitleRef = useRef(null);
  const helloScrollRef = useRef(null);

  useEffect(() => {

    const helloTl = gsap.timeline();
    helloTl.fromTo(helloTitleRef.current, {
      duration: 1,
        y: 30,
        opacity: 0
      }, {
        duration: 1,
        y: 0,
        opacity: 1
      }
    )

    helloTl.fromTo(helloSubtitleRef.current, {
      duration: 1,
        opacity: 0
      }, {
        duration: 1,
        opacity: 1
      }, 1
    )

    helloTl.fromTo(helloScrollRef.current, {
      duration: 1,
        opacity: 0
      }, {
        duration: 1,
        opacity: 1
      }, 1
    )

    const hscrollTl = gsap.timeline({repeat: -1, repeatDelay: 0.5, delay: 3});
    hscrollTl.to(helloScrollRef.current, {
        duration: 0.6,
        y: 8,
        ease: "power1.inOut",
    })
    hscrollTl.to(helloScrollRef.current, {
        duration: 0.6,
        y: 0,
        ease: "power1.inOut",
    })

    gsap.to(helloSubtitleRef.current, {
      scrollTrigger: {
          trigger: helloSubtitleRef.current,
          start: "bottom center",
          scrub: true,
      },
      ease: "power1.out",
      yPercent: -100,
    });
    gsap.to(helloTitleRef.current, {
      scrollTrigger: {
          trigger: helloSubtitleRef.current,
          start: "bottom center",
          scrub: true,
      },
      ease: "power1.out",
      yPercent: -100,
    });

  }, []);

  return (
    <div className="section-hello">
        <div className="section-hello__content container">
            <div className="section-hello__text">
                <h1 className="section-hello__title h1" ref={helloTitleRef} >Hello, my name is Daniel</h1>
                <p className="section-hello__subtitle" ref={helloSubtitleRef} >Im a frontend programmer and designer. This is my personal site, I collected here all my project that i wanted to share. You can find my works and contacts by the links in the header, or just scroll down to know more about me.</p>
            </div>
            <div className="section-hello__scroll icon" ref={helloScrollRef} ><img src={scrollIcon} alt="scroll icon" /></div>
            <button className="section-hello__textme btn" onClick={() => toggleModal()}>Text Me</button>
        </div>
    </div>
  )
}
