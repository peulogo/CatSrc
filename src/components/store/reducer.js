import { CHANGE_FAVORITE, SET_FAVORITE, SET_ITEMS } from "./types";

let catsHomePage ={
    items :[],
    favorite:[],
    fetching: true
}


export function itemReducer(state = catsHomePage, action) {
    switch (action.type) {
        case SET_ITEMS:
            return {...state, items:[...state.items, ...action.payload]}
        case SET_FAVORITE:
            return {...state, favorite:[...state.favorite, action.payload]}
        case CHANGE_FAVORITE:
            return {...state, favorite:[...state.favorite.filter(item => item.id !== action.payload)]}
        default:
            return state;
    }
}
