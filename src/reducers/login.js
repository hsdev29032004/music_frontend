export const loginReducer = (state = {}, action) => {
    if(action.type === "CHECK_LOGIN"){
        return action
    }else{
        return state
    }
}