import { useContext } from "react";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { StateContext } from './contexts.js'

export default function AuthenticationBar(){

    const {state, dispatch} = useContext(StateContext)
    const {user} = state

    // If user value is present, Logout Component is displayed. Else Login & Register Components are displayned.
    if (user.username) return <Logout user={user} dispatch={dispatch}/>
    else {
        return (
            <>
                <Login dispatch={dispatch}/>
                <Register dispatch={dispatch}/>
            </>
        )
    };
}