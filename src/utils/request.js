// const API = "https://b421-2402-800-6d3e-95b-fcab-aa23-a446-1558.ngrok-free.app/api"
const API = "https://meelow-backend.vercel.app/1/api"

export const _get = async (path) => {
    const response = await fetch(API + path, {
        method: 'GET',
        credentials: 'include'
    });
    return response;
}

export const _post = async (path, data) => {
    const isFormData = data instanceof FormData;
    const options = {
        method: "POST",
        credentials: 'include',
        body: data
    };

    if (!isFormData) {
        options.headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        options.body = JSON.stringify(data);
    }

    const response = await fetch(API + path, options);
    return response;
};

export const _patch = async (path, data) => {
    const isFormData = data instanceof FormData;
    const options = {
        method: "PATCH",
        credentials: 'include',
        body: data
    };

    if (!isFormData) {
        options.headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        options.body = JSON.stringify(data);
    }

    const response = await fetch(API + path, options);
    return response
};


export const _delete = async (path) => {
    const response = await fetch(API + path, {
        method: "DELETE",
        credentials: 'include'
    })
    return response
}
