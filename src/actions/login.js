export const checkUser = (user) => {
    return {
        type: "CHECK_LOGIN",
        value: user
    }
}