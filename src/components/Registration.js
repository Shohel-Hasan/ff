import { useRef, useState } from "react";
import style from '../styles/Login.module.css';
import Creatable, { useCreatable } from 'react-select/creatable';
import '../styles/Registration.module.css';
import { Toast } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Registration(props) {
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    // states for registration
    const [first_name, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [academicDescipline, setAcademicDescipline] = useState('');
    const [profession, setProfession] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [monthOfBirth, setMonthOfBirth] = useState('');
    const [yearOfBirth, setYearOfBirth] = useState('');
    const [gender, setGender] = useState('');

    const signupModal = useRef(0);

    const currentYear = new Date().getFullYear();
    const backYears = currentYear - 99;

    let yearArray = [];
    let dateArray = [];
    
    for (var i = backYears; i <= currentYear; i++) {
        yearArray.push(i);
    }

    for (var i = 1; i <= 31; i++) {
        dateArray.push(i);
    }

    // registration function
    const registrationHeader = {
        // mode: 'no-cors',
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            first_name : first_name,
            last_name: '',
            email : email,
            password : password,
            academic_discipline : academicDescipline,
            profession : profession,
            birthdate : yearOfBirth  + "-" +  monthOfBirth + "-" + dateOfBirth,
            monthOfBirth : monthOfBirth,
            yearOfBirth : yearOfBirth,
            gender : gender
        })
    };

    const handleRegistration = event => {
        event.preventDefault();
        console.log(registrationHeader.body)

        fetch('http://127.0.0.1:8000/user/registration', registrationHeader)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                props.closeModal();
            })
            .catch(error => console.log(error))
    }

    // Academic discipline select option 
    const discipline = [
        
        { value: 'Major in Hons.', label: 'Major in Hons.' },
        { value: 'Masters', label: 'Masters' }
        
      ]

      const handleValue = (value) =>{
        //   console.log(value)
          setAcademicDescipline(value.value);
      }

      //Profession Select Option

      const Profession = [
        { value: 'Researcher.', label: 'Researcher' },
        { value: 'Teacher', label: 'Teacher' },
        { value: 'Student', label: 'Student' }
        
      ]

      const handleProfession = (value) =>{
        // console.log(value.value)
        setProfession(value.value);
    }
  
      // set & confirm password
    const handlePasswrd = () =>{
        setShowA(false);
        if ( password !== confirmPassword){
            setShowA(true);
        }
        else{
            setShowA(false);
        }

    }

    return (
        <div className={`${style.reg_box} d-flex flex-column shadow` } ref={signupModal}>
                <div className={`d-flex flex-row align-items-center justify-content-between`}>
                    <div>
                        <h3>Sign Up</h3>
                        <p style={{color: 'grey', fontWeight: 'bold'}}>It's quick and easy.</p>
                    </div>
                    <i onClick={props.closeModal} className="material-icons" style={{cursor: 'pointer'}}>close</i>
                </div>

                <div className={`${style.reg_bar}`}></div>

                <div className={`my-3`}>
                    <form onSubmit={handleRegistration} className={`form-group `}>
                        <input onChange={e => setFirstName(e.target.value)} value={first_name} type="text" className={`form-control my-2`} required placeholder='Full first_name'/>
                        <input onChange={e => setEmail(e.target.value)} value={email} type="email" className={`form-control my-2`} required placeholder='Your Email'/>
                        <div className={`d-flex justify-content-center align-items-center `}>
                            <input onChange={e => setPassword(e.target.value)} value={password} type="password" className={`form-control my-2`} required placeholder='Password'/> &nbsp;
                            <input onBlur={()=>handlePasswrd()} onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" className={`form-control my-2`} required placeholder='Confirm Password'/>
                        </div>
                        <div className={`my-2`}> 
                           <Toast show={showA} >
                               <Toast.Body className="text-danger" onClick={toggleShowA}>Password did not matched...</Toast.Body>
                           </Toast>
                        </div>
                        <Creatable id="d_place"  className="my-2" onChange={handleValue} placeholder='Academic discipline' options={discipline} required></Creatable>
                       
                        <Creatable id="d_place" className="my-2" onChange={handleProfession} placeholder='Profession' options={Profession} required></Creatable>
                        
                        {/* <select onChange={e => setProfession(e.target.value)} className="form-select my-2" aria-label="Default select example" required>
                            <option selected disabled>Profession</option>
                            <option value="Researcher">Researcher</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option>
                        </select> */}
                      

                        <p className='mb-2'>Date of Birth</p>

                        <div className='d-flex justify-content-center align-items-center'>
                            <select onChange={e => setMonthOfBirth(e.target.value)} className="form-select mx-1" aria-label="Default select example" required>
                                <option className="m_font" selected disabled>month</option>
                                <option value="01">Jan</option>
                                <option value="02">Feb</option>
                                <option value="03">Mar</option>
                                <option value="04">Apr</option>
                                <option value="05">May</option>
                                <option value="06">Jun</option>
                                <option value="07">Jul</option>
                                <option value="08">Aug</option>
                                <option value="09">Sep</option>
                                <option value="10">Oct</option>
                                <option value="11">Nov</option>
                                <option value="12">Dec</option>
                            </select>
                            
                            <select onChange={e => setDateOfBirth(e.target.value)} className="form-select" aria-label="Default select example" required>
                                <option selected className="m_font" disabled>date</option>
                                {dateArray.map((item) => <option value={item}>{item}</option>)}
                                
                            </select>
                            
                            <select onChange={e => setYearOfBirth(e.target.value)} className="form-select mx-1" aria-label="Default select example" required>
                                <option className="m_font" selected disabled>year</option>
                                {yearArray.map((item) => <option value={item}>{item}</option>)}
                            </select>
                        </div>

                        <p className='my-2'>Gender</p>

                        <div className="input-group d-flex justify-content-center align-items-center">
                            <div className=" p-2 mx-2 fb-box-shadow ">
                                <label class="form-check-label mx-2 m_font" for="flexRadioDefault1">Male</label>
                                <input onChange={e => setGender(e.target.value)}  class="form-check-input" type="radio" value="Male" name="flexRadioDefault" id="flexRadioDefault1" required/>
                            </div>
                            
                            <div className=" p-2 mx-2 fb-box-shadow ">

                                <label class="form-check-label mx-2 m_font" for="flexRadioDefault2">Female</label>
                                <input onChange={e => setGender(e.target.value)} class="form-check-input" type="radio" value="Female" name="flexRadioDefault" id="flexRadioDefault2" required />
                               
                            </div>
                            
                            <div className=" p-2 mx-2 fb-box-shadow ">
                                <label class="form-check-label mx-2 m_font" for="flexRadioDefault3">Common</label>
                                <input onChange={e => setGender(e.target.value)} class="form-check-input" type="radio" value="Common" name="flexRadioDefault" id="flexRadioDefault3" required />
                            </div>
                        </div>

                        <p className='my-3' style={{width: '95%', color: 'grey'}}>By clicking Sign Up, you agree to our <Link to='/privacy-policy'>Privacy Policy</Link>, Data Policy and Cookie Policy.</p>
                        
                        <div className='d-flex justify-content-center align-items-center my-3'>
                            <input type="submit" className={`${style.register} ${style.button}`} />
                        </div>

                    </form>
                </div>
            </div>
    )
}