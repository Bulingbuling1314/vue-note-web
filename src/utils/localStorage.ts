export const SET_TOKEN = (token: string): void => {
    localStorage.setItem("Token", token);
}

export const GET_TOKEN = (): string | null => {
    return localStorage.getItem("Token");
}

export const REMOVE_TOKEN = () => {
    localStorage.removeItem("Token");
}

export const SET_USER_INFO = (user: string): void => {
    localStorage.setItem("user", user);
}

export const GET_USER_INFO = (): string | null => {
    return localStorage.getItem("user");
}

export const REMOVE_USER_INFO = () => {
    localStorage.removeItem("user");
}
