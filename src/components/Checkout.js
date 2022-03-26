import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../styles/ChangepassForm.module.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Checkout(props) {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();


    console.log("courseId", props.courseId)
    const courseId = props.courseId;

    const submitHandler = (event) => {
        event.preventDefault();

        const header = {
            mode: 'cors',
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem('auth_token')}`
            },
            body: JSON.stringify({
                payment_method: paymentMethod,
                number: phoneNumber,
                transaction_id: transactionId

            })
        };
    
        fetch(`http://127.0.0.1:8000/course/${courseId}/enrollment/course-enrollment-payment/`, header)
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(`${data.message},  "Please pay the enrollment fee"`)
                    navigate(`/course/${courseId.courseId}/details`)
                } else{
                    navigate(`/user/${localStorage.getItem('id')}`)
                    console.log(data)
                } 
               })
    }

    return (
        <div className={`${style.main_container} d-flex flex-column`}>
            <div className='d-flex align-items-center justify-content-between'>
                <h3>Checkout</h3>
                <i onClick={props.toggleCheckout} className="material-icons" style={{cursor: 'pointer'}}>close</i>
            </div>

            <div className={`${style.bar}`}></div>

            <div className='my-3'>
                <p>Checkout here to enroll into this course</p>
                <p>Please send money in the given number and put the tranxaction number and your phone number</p>
                <p>01841779449</p>
            </div>

            <form action="" className={`form-group`} onSubmit={submitHandler}>
                {/* <input type="password" className={`form-control my-2`} required placeholder='Old Password'/> */}
                <select name="method" id="" className='form-control my-1' onChange={event => setPaymentMethod(event.target.value)} required>
                    <option value="" selected disabled>Select payment method</option>
                    <option value="bkash">Bkash</option>
                    <option value="bkash">Rocket</option>
                    {/* <option value="bkash">Nogod</option> */}
                </select>
                <PhoneInput
                  inputProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: true
                  }}
                  onBlur={event => setPhoneNumber(event.target.value)}
                />
                <input className='form-control my-1' type="text" required placeholder="Transaction ID" onChange={event => setTransactionId(event.target.value)}/>

                <div className='d-flex justify-content-center align-items-center my-3'>
                    <input type="submit" className={`${style.register} ${style.button}`} />
                </div>
            </form>
        </div>
    )
}