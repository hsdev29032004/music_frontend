export const savePlReducer = (state = {}, action) => {
    if(action.type === "SAVE_PLAYLIST"){
        return action.value
    }else{
        return state
    }
}