export default function Logout({ user, dispatch }){
    return (
        // Clearing state values upon logout
        <form 
            onSubmit={e => {
                e.preventDefault();
                dispatch({type: "LOGOUT", payload: {}})
                dispatch({type: "CLEAR_TODOS", payload: {}})
                }
            }
        >
            Logged in as: <b>{user.username}</b>
            <input type="submit" value="Logout"/>
        </form>
    )
}