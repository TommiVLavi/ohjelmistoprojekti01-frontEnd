import React, { useState } from "react";
import { SERVER_URL_h2, SERVER_URL_mariadb } from "../constants";

function LoginForm(){
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name] : event.target.value}
        );
    }

    const login = () => {
        fetch(SERVER_URL_h2 + 'login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'}, 
            body: JSON.stringify(user)
        })
        .then(response => {
            const jwToken = response.headers.get('Authorization');
            if(jwToken !== null){
                sessionStorage.setItem("jwt", jwToken);
                setIsAuthenticated(true);
            }
        })
        .catch(error => console.error(error))
    }

    const loginTest = () => {
        setIsAuthenticated(true);
        console.log("Logged in as " + user.username);
    }

    const logout = () => {
        setIsAuthenticated(false);
        console.log("logged out");
    }


    if (isAuthenticated){
        return(
            <div><button type="submit" onClick={logout}>Log out</button></div>
        );
    }
    else{
        return(
            <div>
                Login: <input type="text" id="username" name="username" placeholder={'Username'} onChange={handleChange} />
                <input type="password" id="password" name="password" placeholder={'Password'} onChange={handleChange} />
                <button type="submit" onClick={loginTest} >Log In</button>
            </div>
        );
    }
}

export default LoginForm;




