import { configureStore } from "@reduxjs/toolkit"
import {createStore} from "redux"

const initialState = {
    theme: 'dark',
    counter: 0
}



const addReducer = (state = initialState, action: any) => { 
    console.log("actionObj",action)
    switch (action.type) {
        case "ADD": {
            return ({ ...state, counter: state.counter + 1})
        }
        case "RM": {
            return ({ ...state, counter: state.counter - 1})
        }
        default:
            return state;
    }
}

const store = configureStore({ reducer: addReducer })

export default store;