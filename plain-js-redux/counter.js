// https://www.youtube.com/watch?v=6Zf29n9PL3k

// ******************************
// Reducers are pure functions and they are just simple Switch Statements
// Reducer takes 2 arguments: our current application State and the Action that gets dispatched
// Reducers specify exactly how the action is going to change our application State

function counter(currentState, action) {

    var nextState = { count: currentState.count };

    switch(action.type) {
        case 'ADD':
            nextState.count = currentState.count + 1;
            return nextState;
        case 'MINUS':
            nextState.count = currentState.count - 1;
            return nextState;
        case 'RESET':
            nextState.count = 0;
            return nextState;
        default:
            console.log('In Default/Blank action to get our initial State');
            return currentState;
    }
}

// ******************************
// Store is an object that brings Actions and Reducers together
// Store holds application State, allow us access to that State (single source of truth), allow our State to be updated and it has Listeners - which will listen for Actions for changes

var state = { count: 0 };
var store = Redux.createStore(counter, state)
var counterEl = document.getElementById('counter');

console.log(store);

function render() {
    console.log('In Render');
    console.log(store.getState());
    var state = store.getState();
    counterEl.textContent = state.count.toString();
}

store.subscribe(render); // Subscribe method takes a single argument - a listener, and this listener is a callback which is going to be invoked any time an Action gets dispatched

// ******************************
// An ACTION is a JavaScript Object that has a Type
// Actions are just payloads of information that send data from our application to our store
// Action is actualy get sent to the Store and from the Store it will get to the Reducer
// Actions describe when something is happening

document.getElementById('add') // Handler
    .addEventListener('click', function() {
        store.dispatch({ type: 'ADD' }) // { type: 'ADD' } -> is Action
    });

document.getElementById('minus')
    .addEventListener('click', function() {
        store.dispatch({ type: 'MINUS' });
    })

document.getElementById('reset')
    .addEventListener('click', function() {
        store.dispatch({ type: 'RESET' });
    })

// We have our UI (Buttons)
// We have our HANDLERS for the Click Events on our Buttons
// When we have a Click Event happen, we Dispatch an Action to our Store
// Our Store then passes it (Action) to our Reducer
// Withit our Reducer we have a Switch Statement that does something depending on the Type of Action we pass in
// In our Reducer we create a New State Object - because we don't want to mutate our Current State
// In our Case Statements we update that new object - New State - and return it
// We then Subscribe our Store to Render Function - and then it gets called everytime an Action gets dispatched
// And in our Render Function we get our State Object (single source of truth, that single JavaScript object) and we then extract the Count Value from that Object and set our header in a HTML to equal to that new count
