
// initial state
const initialState = {
    count: 0
}

// rootReducer function in charge of managing data within the store
function rootReducer(state = initialState, action) {
    // switch statement that executes state modifications based on action input
    // returns new object with modified state or default state if neither options were chosen
    switch (action.type) {
        case "INCREMENT":
            
            var newState = { ...state }
            newState.count++
            return newState

        case "DECREMENT":
            
            var newState = { ...state }
            newState.count--
            return newState


        default:
            
            return state;

    }
}

// store that holds the state & uses the rootReducer function
const store = Redux.createStore(rootReducer);



// jQuery for selecting html elements
$(document).ready(function () {
    $("#increment").on("click", function () {
        // on click that runs the dispatch with the INCREMENT action & sets the h1 content
        // to the current state
        store.dispatch({
            type: "INCREMENT"
        })
        let currentState = store.getState();
        $("#counter").text(currentState.count);
    })
})
$(document).ready(function () {
    $("#decrement").on("click", function () {
        // on click that runs the dispatch with the DECREMENT action & sets the h1 content
        // to the current state
        store.dispatch({type: "DECREMENT"});
        let currentState = store.getState();
        $("#counter").text(currentState.count);
    })
})