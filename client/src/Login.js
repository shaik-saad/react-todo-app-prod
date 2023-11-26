import { useEffect, useState } from "react";
import { useResource } from "react-request-hook";

export default function Login({ dispatch }){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginFailed, setLoginFailed] = useState(false)

    //Hook for user login request to express server
    const [user, login] = useResource((username, password) => ({
        url: '/auth/login',
        method: 'post',
        data: { username, password }
    }))

    // Handling user's inputs
    const handleUsername = e => setUsername(e.target.value);
    const handlePassword = e => setPassword(e.target.value);

    useEffect(() => {
        if(user && user.data){
            // If user exists in db updating username and access_token in global state
            setLoginFailed(false)
            dispatch({type: "LOGIN", payload: {username: username, access_token: user.data.access_token}})
            setUsername("")
            setPassword("")
        }
        else if(user?.error){
            setLoginFailed(true)
        }
    }, [user])

    return (
        // On submission, user login request is sent.
        // If login is not successful an error message is shown. 
        <div>
        {loginFailed && <span style={{color: 'red'}}>Invalid username or password</span>}
        <form 
            onSubmit={e => {
                e.preventDefault();
                login(username, password)
                } 
            }
        >
            <label htmlFor="login-username">Username:</label>
            <input type="email" id="login-username" name="login-username" value={username} onChange={handleUsername} required/>
            <label htmlFor="login-password">Password:</label>
            <input type="password" id="login-password" name="login-password" value={password} onChange={handlePassword}/>
            {/* Login button is disabled if username and password are empty*/}
            <input type="submit" value="Login" disabled={username === "" && password === ""}/>
        </form>
        </div>
    );
}