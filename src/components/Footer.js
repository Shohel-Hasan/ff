import { Link } from 'react-router-dom';
import style from '../styles/Footer.module.css';

export default function Footer() {
    return (
        <div className={`${style.main_container} container-fluid`}>
            <div className={`${style.footer_body} container d-flex flex-column`}>
                <div className='d-flex mx-2'>Research Rider</div>
                
                <div className={`${style.bar} my-3`}></div>

                <div className='d-flex flex-wrap'>
                    <Link className='mx-2 my-1 text-decoration-none text-muted' to="/">Login</Link>
                    <Link className='mx-2 my-1 text-decoration-none text-muted' to="/user/:userId">Dashboard</Link>
                    <Link className='mx-2 my-1 text-decoration-none text-muted' to="/privacy-policy">Privacy Policy</Link>
                    <Link className='mx-2 my-1 text-decoration-none text-muted' to="/cookie-policy">Cookie Policy</Link>
                    <Link className='mx-2 my-1 text-decoration-none text-muted' to="/product-policy">Product Policy</Link>
                    <Link className='mx-2 my-1 text-decoration-none text-muted' to="/data-policy">Data Policy</Link>
                    <Link className='mx-2 my-1 text-decoration-none text-muted' to="/about-us">About Us</Link>
                   
                </div>

                <div className='my-3 mx-2'>
                    <span>Research Rider &copy; 2022 </span>
                </div>
            </div>
        </div>
    )
}