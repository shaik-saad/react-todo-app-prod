import { useContext, useEffect, useState } from 'react'
import { StateContext } from './contexts'
import { useResource } from 'react-request-hook'


export default function AddTodo(){

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const {state, dispatch} = useContext(StateContext)
    const {user} = state

    //hook to add todo request to express server 
    const [todo, createTodo] = useResource((title, description) => ({
        url: '/todo',
        method: 'post',
        headers: {"Authorization": `${user.access_token}`},
        data: { title, description }
    }))

    // Title and description input handlers
    const handleTitle = e => setTitle(e.target.value)
    const handleDescription = e => setDescription(e.target.value)

    // Form submit handler
    const handleSubmit = () => {
        //on form submit creating todo
        createTodo(title, description)
    }

    useEffect(() => {
        //if todo is successfully added to mongoDB, updating global todo list with new todo
        if(todo && todo.isLoading === false && todo.data){
            dispatch({type: "CREATE_TODO", payload: todo.data})
            // cleaning inputs after todo list is updated with new todo succesfully  
            setTitle("")
            setDescription("")
        }
    }, [todo])

    return (
        <form 
            onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            }}>
            <h3>Add a Todo:</h3>
            <label htmlFor="title">Title: *</label>
            <input type="text" id="title" name="title" value={title} onChange={handleTitle}/>
            <label htmlFor="description">Description:</label>
            <textarea id="description" value={description} onChange={handleDescription}/>
            <input type="submit" value="ADD" disabled={title === ""}/>
        </form>
    );
}