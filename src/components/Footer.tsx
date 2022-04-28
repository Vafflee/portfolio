import vkIcon from '../images/icons/vk.svg'
import emailIcon from '../images/icons/email.svg'
import phoneIcon from '../images/icons/phone.svg'

export const Footer = () => {
  
  return (
    <footer className="footer">
        <div className="container">
            <div className="footer__text">Designed and Programmed by <a href="https://github.com/Vafflee" target="_blank">Daniel Tarasov</a></div>
            <div className="footer__contacts">
                <div className="footer__contact"><a className="icon footer__icon" href="https://vk.com/tarasovdann"><img src={vkIcon} alt="vk link" /></a>tarasovdann</div>
                <div className="footer__contact"><a className="icon footer__icon" href="mailto:chelovekosa@gmail.com"><img src={emailIcon} alt="email link" /></a>chelovekosa@gmail.com</div>
                <div className="footer__contact"><div className="icon footer__icon"><img src={phoneIcon} alt="phone link" /></div>+7 987 712 15 34</div>
            </div>
        </div>
    </footer>
  )
}
