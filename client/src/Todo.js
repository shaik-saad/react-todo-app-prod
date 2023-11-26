import { useEffect } from "react";
import { useResource } from "react-request-hook";

export default function Todo({ user, todo, dispatch }) {

  const {_id, title, description, dateCreated, isComplete, dateCompleted } = todo;

  //Hook for update todo request to express server
  const [updatedTodo, updateTodo] = useResource((_id, updatedTodo) => ({
    url: `/todo/${_id}`,
    method: 'put',
    headers: {"Authorization": user.access_token},
    data: updatedTodo
  }))
  
  //Hook for delete todo request to express server
  const [deletedTodo, deleteTodo] = useResource((_id) => ({
    url: `/todo/${_id}`,
    method: 'delete',
    headers: {"Authorization": user.access_token}
  }))

  const handleComplete = (e) => {
    // isCompleted value based on event target is passed and dynamic values are updated
    const updatedTodo = {...todo, isComplete: e.target.checked, dateCompleted: e.target.checked === true ? Date.now() : null}
    // update todo request to express-server
    updateTodo(_id, updatedTodo)
  };

  const handleDelete = () => {
    // delete todo request is express-server using it's _id
    deleteTodo(_id)
  }

  useEffect(() => {
    // if todo updation is successful then todo is also updated in the global state
    if(updatedTodo && updatedTodo.isLoading === false && updatedTodo.data) {
      dispatch({type: "TOGGLE_TODO", payload: updatedTodo.data})
    }
  }, [updatedTodo])
  
  useEffect(() => {
    // if todo deletion is successful then todo is also deleted from the global state
    if(deletedTodo && deletedTodo.isLoading === false && deletedTodo.data){
      dispatch({type: "DELETE_TODO", payload: {_id}})
    }
  }, [deletedTodo])
  
  return (
    <li>
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
          <input
            type="checkbox"
            id={`checkbox-id-${_id}`}
            name={`checkbox-id-${_id}`}
            checked={isComplete}
            onChange={handleComplete}
          />
          <label htmlFor={`checkbox-id-${_id}`}>
            {isComplete ? "Completed" : "Mark as Complete"}
          </label>
      </div>
      <button type="button" onClick={handleDelete}>DELETE</button>
      <footer>
        <div>
          Todo by: <b>{user.username}</b>
        </div>
        <div>Created on: {`${new Date(dateCreated).toLocaleDateString()} at ${new Date(dateCreated).toLocaleTimeString()}`}</div>
        <div>
          Completed on: {dateCompleted ? `${new Date(dateCompleted).toLocaleDateString()} at ${new Date(dateCompleted).toLocaleTimeString()}` : "Not yet completed!"}
        </div>
      </footer>
    </li>
  );
}
