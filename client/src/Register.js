import { useEffect, useState } from "react"
import { useResource } from "react-request-hook"

export default function Register({ dispatch }){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false)
    const [message, setMessage] = useState("")

    //Hook for user resgistration request to express server
    const [user, register] = useResource((username, password, repeatPassword) => ({
        url: '/auth/register',
        method: 'post',
        data: {username, password, passwordConfirmation: repeatPassword}
    }))

    useEffect(() => {
        if(user && user.isLoading === false && user.data){
            // if user registration is successful updating the message
            setIsRegistrationSuccessful(true)
            setMessage("YAYY! Registration successful, you may now login.")
            //clearing local states
            setUsername("");
            setPassword("")
            setRepeatPassword("")
        } else if(user?.error) {
            setIsRegistrationSuccessful(false)
            setMessage("OOPS! Registration failed, please try again.")
        }
    }, [user])
    
    // Handling user's inputs
    const handleUsername = e => setUsername(e.target.value)
    const handlePassword = e => setPassword(e.target.value)
    const handleRepeatPassword = e => setRepeatPassword(e.target.value)
    return (
        // On Submission register() makes a request to express-server for registration
        <form 
            onSubmit={e => {
                e.preventDefault();
                register(username, password, repeatPassword);
                }
            }
        >   
            <p style={{color: isRegistrationSuccessful? "green" : 'red'}}>{message}</p>
            <label htmlFor="register-username">Username:</label>
            <input type="email" id="register-username" name="register-username" value={username} onChange={handleUsername} required/>
            <label htmlFor="register-password">Password:</label>
            <input type="password" id="register-password" name="register-password" value={password} onChange={handlePassword}/>
            <label htmlFor="register-repeat-password">Repeat Password:</label>
            <input type="password" id="register-repeat-password" name="register-repeat-password" value={repeatPassword} onChange={handleRepeatPassword}/>
            {/* Register button is disabled if username, password and repeatPassword are empty and also if password and repeatPassword are not matched*/}
            <input type="submit" value="Register" disabled={username === "" || password === "" || repeatPassword === "" || password !== repeatPassword}/>
        </form>
    )
}