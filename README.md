# CSC 436: react-todo-app
This repository contains code for CSC-436 Web Applications Lab work. Throughout the labs a Todo App is built using MERN. 
## **Table of contents**

- [LAB-TWO](#lab-two)
- [LAB-THREE](#lab-three)
- [LAB-FOUR](#lab-four)
- [LAB-FIVE](#lab-five)
- [Technologies used](#technologies-used)
- [Issue Reporting](#issue-reporting)
- [Author](#author)


## **LAB-TWO** : 
**Requirements:**
Your application must contain the the following functionality:
1. Login, Registration, and Logout (you’re only building front-end components, so these do
not actually need to validate or persist credentials.)
2. A Todolist containing individual Todo items
3. A form to add new Todo to the Todolist.
4. An individual Todo item should consist of the following data/props:
    - a. title (this is a required field, form should not submit without it)
    - b. description (this is an optional field, it is not required to submit the - form)
    - c. author (this is the currently logged in user’s username)
    - d. dateCreated (this field is set dynamically when the form is submitted – research the JS lib method Date.now())
    - e. complete (a boolean initially set to false when a Todo is created)
    - f. dateCompleted (this field is set dynamically when the form is submitted)
5. When rendering a Todo a checkbox should be used to display the value of the “complete”
field. Checking/unchecking the checkbox should update the value of the “complete” field
appropriately. The dateCompeleted field should also be updated (again, dynamically
utilizing Date.now()).

## **LAB-THREE**:
**Goal:** Add interactivity to the React Todo App built in lab2 by making converting components containing input elements into controlled components and adding a user and post reducer to update application state.

**Requirements:**
Update the components you created in week 2 to use the useState and useReducer hooks
appropriately. Feel free to use the example we build in lecture 3 for guidance, but note that
you’re not obligated to implement functionality the same way I did in class.
1. Your user login related components should utilize the useState hook to manage form
state within the component and a userReducer for updating global user state.
2. Your component responsible for creating new Todos should utilize the useState hook
to manage form state within the component and a todoReducer for updating global
todo state.
3. Reducer actions your userReducer must implement:
    - LOGIN (“logs in a user“ and makes the createTodo component visibile)
    - REGISTER (“logs in a user” and makes the createTodo component visible)
    - LOGOUT (“logs out a user” and removes the createTodo component)
4. Reducer actions you may want consider implementing in your todoReducer:
    - CREATE_TODO (adds a new todo to your todolist)
    - TOGGLE_TODO (locates a specific todo in your todo list and toggles the complete
    field and sets the dateCompleted field)
    - DELETE_TODO (removes a specific todo from your todo list)


## **LAB-FOUR**:
**Goal:** 
Manage global state using React Context and add data persistence to the React Todo
App built in hw2 and hw3 by issuing REST calls (using Axios and the useResource hook) to a
mock API (powered by json-server).

**Requirements:**
Update the your components to stop passing state and dispatch methods via props and
instead create a StateContext, similar to the way demonstrated in class and then utilize then
consume the StateContext in components which require access to state, dispatch, or both.’
Perform steps 2-7 to utilize a mock API to persist application data.
1. Add StateContext
    - Create a StateContext in a contexts.js file.
    - In App.js, wrap your components in a `<StateContext.Provider>` passing values for
    state and dispatch from your appReducer
    - In App.js, remove state and dispatch props from your UserBar, CreateTodo, and
    TodoList components (your component names and structure may be different
    depending on how you implemented things thus far); instead, utilize the
    useContext hook within any component which may require access to state or
    dispatch.
2. Create a Mock API using json-server
Configure json-server and json-server-auth to run alongside your application using
the db.json, setupProxy.js, and package.json startup commands. Reference Week 5’s
lecture for configuring these items.
Please reference the lecture for detailed instruction on how to utilize the files and
commands to startup the mock API.
3. Configure an Axios instance and RequestProvider in index.js (See week 5 lecture)
4. Use the useResource hook in order to retrieve Todos from the mock API and
remove the hardcoded intialTodos list in app.js. 
5. Use the useResource hook in order to issue a `POST` request to the mock API in
order to persist your Todo to db.json. 
6. Use the useResource hook in order to `GET/POST` requests to the mock in order to perform Login and Register. 
7. Use the useResource hook in order to perform the appropriate HTTP request to
update a Todo existing in db.json for `TOGGLE_TODO` and `DELETE_TODO` actions

## **LAB-FIVE**:
**Goal:** 
Replace your json-server backend implementation with a Node.js backend implementation. 

**Requirements:**
1. Implement proper authentication using bCrypt to store credentials securely and
authorize user requests using jsonwebtoken.
    - a. When a user registers, passwords should be hashed using `bCrypt.hash()`
before inserting into the database.
    - b. When a user logs in, their plaintext password should be compared to the
stored hash using `bCrypt.compare()`, if comparison returns true, a body containing an access_token should be returned. The payload should be the user’s database ID.
2. Creating, toggling, or deleting a Todo require an Authorization token to be passed and a user should only be able to perform these operations on their own todos. Store the Authorization access_token in your React application and send it as a header when issuing these requests.
    - i. Update the POST route handler to deal with complete and dateCompleted property.
    - ii. Add a DELETE route handler + implement logic to delete a todo.
    - iii. Add a PUT or PATCH route handler for toggling a todo’s complete
property.


## **Technologies used**

- HTML5
- CSS3
- JS
- React.js
- Node.js
- Express.js
- MongoDB

## **Issue Reporting**

Encountered a bug or have a feature request ? Please do check the issues tab for existing and closed issue / request. If it does not exist, [please open a new issue](https://github.com/shaik-saad/CSC-436-react-todo-app/issues).

## **Author**

- **Twitter** - [shaiksaadullah](https://twitter.com/shaiksaadullah)
- **LinkedIn** - [shaik-saad](https://www.linkedin.com/in/shaik-saad)

