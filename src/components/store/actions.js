import { CHANGE_FAVORITE, SET_FAVORITE, SET_ITEMS } from "./types";

export function setItemsAction(payload) {
    return{
        type: SET_ITEMS, 
        payload: payload
    }
}
export function setFavorite(payload) {
    return{
        type: SET_FAVORITE, 
        payload: payload
    }
}
export function changeFavorite(payload) {
    return{
        type: CHANGE_FAVORITE, 
        payload: payload
    }
}