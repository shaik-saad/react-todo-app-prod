import { useEffect, useReducer} from "react";
import AuthenticationBar from "./AuthenticationBar";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import appReducer from "./reducers";
import { StateContext } from './contexts.js'
import { useResource } from "react-request-hook";

function App() {

  // useReducer used for maintaining username, access_token and todo list at global level
  // Empty user object and empty todos array are passed in a object as Initial State
  const [state, dispatch] = useReducer(appReducer, {
    user: {},
    todos: []
  })

  const {user} = state;

  //Hook to read todo list from mongoDB using express server
  const [todos, getTodos] = useResource(() => ({
    url: '/todo',
    method: 'get',
    headers: {"Authorization": user.access_token}
  }))

  //getTodos fires up whenever user state is updated 
  useEffect(() => {
    if(user.username) {
      getTodos()
    }
  }, [user])

  // updating todo list in global state 
  useEffect(() => {
    if(todos && todos.isLoading === false && todos.data){
      dispatch({type: "FETCH_TODOS", payload: todos.data.reverse()})
    }
  }, [todos])

  return (
    <>
      <StateContext.Provider value={{state, dispatch}}>
        <h1>React Todo App</h1>
        <AuthenticationBar/>
        {/* Conditional rendering, only if the user value is Truthy.*/}
        {user.username && <AddTodo/>}
        {user.username && <TodoList/>}
      </StateContext.Provider>
    </>
  );
}

export default App;
