import { useState } from "react";

export default function useIsLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let token = '';

    if (localStorage.auth_token) {
        token = localStorage.getItem('auth_token')
    } else {
        token = 'edthnrijrhg5g353gv3';
    }

    const header = {
        mode: 'cors', 
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token
        })
    };

    fetch('http://18.211.204.106/user/token-check', header)
        .then(response => response.json())
        .then(data => {
            // console.log(data.message)
            if (data.message) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false)
            }

            // console.log(isLoggedIn);
        })
        .catch(error => console.log(error))

    return {isLoggedIn};
}