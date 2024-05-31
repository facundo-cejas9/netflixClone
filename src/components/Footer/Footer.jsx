import './Footer.css'
import Youtube from '../../assets/youtube_icon.png'
import Twitter from '../../assets/twitter_icon.png'
import Instagram from '../../assets/instagram_icon.png'
import Facebook from '../../assets/facebook_icon.png'



export const Footer = () => {

const IconsSocial = [
  Youtube,
  Twitter,
  Instagram,
  Facebook,
]

  return (
    <div className="footer">
      <div className="footer-icons">
        {IconsSocial.map((icon, index) => (
          <img src={icon} alt="icon" key={index} />
        ))}
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gifts Cards</li>
        <li>Media Centre</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of use</li>
        <li>Privacy</li>
        <li>Legal notices</li>
        <li>Cookie preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyright-text'>© 1997-2023 Netflix, Inc. or its affiliates</p>
    </div>
  )
}
