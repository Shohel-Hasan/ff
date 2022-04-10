import style from '../styles/Welcome.module.css';
import Footer from './Footer';
import Login from "./Login";
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';

export default function Welcome({isLoggedIn}) {
  console.log(isLoggedIn);
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate('/home');
  }

  return (
    <div className={`${style.body}`}>
      {/* <Navbar /> */}
      <Login />
      <Footer />
    </div>
  )
}
