
// initial state
const initialState = {
    todos: [],
    id: 0
}

// rootReducer function in charge of managing data within the store
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TODO':
            // create a copy of state to keep FN pure
            var newState = { ...state }
            // increment the ID
            newState.id++;
            // return a new object which has everything previously inside of state
            // the array will hold objects that contain the task name and the ID of the task

            return {
                ...newState,
                todos: [...newState.todos,
                { task: action.task, id: newState.id }]
            }
        case 'REMOVE_TODO':
            // create a new array from state where the state ID does not match
            // the ID passed in from action => filter out one item
            let todos = state.todos.filter(val => val.id !== +action.id);
            return { ...state, todos }
        default:
            return state;
    }
}

// store that holds the state & uses the rootReducer function
const store = Redux.createStore(rootReducer);



// jQuery for handling dom events
$(document).ready(function () {


    // listen for on clicks on buttons within the UL
    $("ul").on("click", "button", function (event) {
        // dispatch an action with the ID corresponding to the button
        // that was clicked
        store.dispatch({
            type: "REMOVE_TODO",
            id: $(event.target).attr("id")
        })
        // remove the html element that was clicked
        $(event.target).parent().remove();
    })




    // on submit listener for the form
    $("form").on("submit", function (event) {
        // prevent the page from refreshing
        event.preventDefault();
        // variable that holds the value of the task input
        let newTask = $("#task").val();
        // dispatch the add todo action
        store.dispatch({
            type: 'ADD_TODO',
            task: newTask
        })

        // variable that holds the current state
        let currentState = store.getState();
        // jQuery create html w/ form input text
        let $newLi = $("<li>", {
            text: newTask
        })
        // button used for deleting todo items, id corresponds w/
        // the the state ID
        let newButton = $("<button>", {
            text: "X",
            id: currentState.id
        })
        // append to the LI the new button
        $newLi.append(newButton);
        // push to our UL the new html item
        $("#todos").append($newLi);


        // resets the form values
        $("form").trigger("reset");
    })
})
