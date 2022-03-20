import style from '../styles/Welcome.module.css';
import Footer from './Footer';
import Login from "./Login";
import Navbar from "./Navbar";

export default function Welcome() {
  return (
    <div className={`${style.body}`}>
      {/* <Navbar /> */}
      <Login />
      <Footer />
    </div>
  )
}
