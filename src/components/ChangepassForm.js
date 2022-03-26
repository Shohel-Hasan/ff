import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../styles/ChangepassForm.module.css';

export default function ChangepassForm(props) {
    const navigate = useNavigate();

    const [newPass, setNewPass] = useState('')
    console.log(newPass, localStorage.getItem('auth_token'))

    const changePassHeader = {

        mode: 'cors',
        method: 'PATCH',
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            new_password: newPass
        })
    };
    const handleChangePass = (event) => {
        event.preventDefault();
        // console.log(changePassHeader)

        // **** process for changing password request to server goes here **** //
        fetch('http://18.211.204.106/user/change-password', changePassHeader)
            .then(res =>{ res.json()
                        console.log(res.status)
                if (res.status===200) {
                    alert("password changed successfully.")
                    navigate("/");
                }         
            })
            // .then(data => )
            .catch(error => alert(error))
    }
    return (
        <div className={`${style.main_container} d-flex flex-column`}>
            <div className='d-flex align-items-center justify-content-between'>
                <h3>Change Password</h3>
                <i onClick={props.toggle} className="material-icons" style={{cursor: 'pointer'}}>close</i>
            </div>

            <div className={`${style.bar}`}></div>

            <div className='my-3'>Enter your previous password and set a new password</div>

            <form action="" className={`form-group`} onSubmit={handleChangePass}>
                {/* <input type="password" className={`form-control my-2`} required placeholder='Old Password'/> */}
                <input type="password" onChange={e=> setNewPass(e.target.value)} className={`form-control my-2`} required placeholder='New Password'/>

                <div className='d-flex justify-content-center align-items-center my-3'>
                    <input type="submit" className={`${style.register} ${style.button}`} />
                </div>
            </form>
        </div>
    )
}