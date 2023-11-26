const userReducer = (state, action) => {
    const {type, payload} = action;
    const {username, access_token} = payload;
    switch (type) {
        case "LOGIN":
            return {username, access_token};
        case "LOGOUT":
            return {};
        default:
            return state;
    }
}

const todoReducer = (state, action) => {
    const {type, payload} = action;
    const { _id } = payload;
    switch (type) {
        case "CREATE_TODO":
            return [payload, ...state];
        case "TOGGLE_TODO": 
            const updatedTodos = state.map((todo, index) =>  {
                return todo._id === _id ? state[index] = payload : todo
            })
            return updatedTodos
        case "DELETE_TODO":
            const reducedTodos = state.filter((todo) =>  todo._id !== _id)
            return reducedTodos
        case "FETCH_TODOS":
            return payload
        case "CLEAR_TODOS":
            return [];
        default:
            return state;
    }
}

export default function appReducer(state, action){
return {
    user: userReducer(state.user, action),
    todos: todoReducer(state.todos, action)
}
}