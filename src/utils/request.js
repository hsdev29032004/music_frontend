const API = "http://localhost:3001/api"

export const _get = async (path) => {
    const response = await fetch(API + path)
    return response
}

export const _post = async (path, data) => {
    const response = await fetch(API + path, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return response
}

export const _patch = async (path, data) => {
    const response = await fetch(API + path, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return response
}

export const _delete = async (path) => {
    const response = await fetch(API + path, {
        method: "DELETE"
    })
    return response
}
