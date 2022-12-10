import axios from "axios";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";

export default function LoginForm({ setHasRole }){
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name] : event.target.value}
        );
    }

    // Set token to Authorization header for every axios request
    const setAuthToken = (token) => {
        delete axios.defaults.headers.common["Authorization"];

        if (token) {
            axios.defaults.headers.common["Authorization"] = token;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }

    const login = async () => {
        const formData = {
            "username": user.username,
            "password": user.password
        }
        setMessage('')
        try {
            await axios.post('https://spring.omppujarane.store/auth/login', formData)
            .then(response => {
                const jwToken = response.headers.get('Authorization');
                if(jwToken !== null){
                    sessionStorage.setItem("jwt", jwToken);
                    setAuthToken(jwToken);
                    setHasRole(jwt_decode(jwToken).role);
                }
            })
        } catch (error) {
            if (error.response.status === 403) {
                setMessage('Käyttäjätunnus tai salasana on väärä')
            } else {
                console.log(error)
            }
        }
    }

    return(
        <div style={{ textAlign:'center', paddingTop:'30px'}}>
            <input type="text" id="username" name="username" style={{marginBottom:'10px'}}
                placeholder={'Käyttätunnus'} onChange={handleChange} /><br />
            <input type="password" id="password" name="password" style={{marginBottom:'10px'}}
                placeholder={'Salasana'} onChange={handleChange} /><br />
            <p style={{color:'red'}}>{message}</p>
            <button className="btn btn-secondary" type="submit" onClick={login}>Kirjaudu</button>
        </div>
    );
}
