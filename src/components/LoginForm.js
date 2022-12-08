import axios from "axios";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";

function LoginForm({ hasRole, setHasRole }){
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name] : event.target.value}
        );
    }

    const setAuthToken = (token) => {
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
                .catch(error => console.error(error))
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async () => {
        try {
            await axios.post('https://spring.omppujarane.store/logout')
                .then(response => {
                    sessionStorage.removeItem("jwt");
                    setAuthToken(null);
                    setHasRole('')
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.log(error)
        }
        console.log("logged out");
    }

    if (hasRole){
        return(
            <div><button type="submit" onClick={logout}>Log out</button></div>
        );
    }
    else{
        return(
            <div>
                <input type="text" id="username" name="username" placeholder={'Käyttätunnus'} onChange={handleChange} />
                <input type="password" id="password" name="password" placeholder={'Salasana'} onChange={handleChange} />
                <button type="submit" onClick={login} >Kirjaudu</button>
            </div>
        );
    }
}

export default LoginForm;




