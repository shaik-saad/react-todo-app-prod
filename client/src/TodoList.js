import { useContext } from "react";
import Todo from "./Todo";
import { StateContext } from "./contexts";

export default function TodoList(){
    const {state, dispatch} = useContext(StateContext)
    const {user, todos} = state
    return (
        <ul>
            {/* todolist state array is mapped to display the list items */}
            {todos.map((todo) => <Todo user={user} todo={todo} dispatch={dispatch} key={todo._id}/>)}
        </ul>
    )
}