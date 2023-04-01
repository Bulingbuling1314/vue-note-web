export const GET_TOKEN = () => {
    return localStorage.getItem('token')
}

export const SET_TOKEN = (token: string) => {
    localStorage.setItem('token', token)
}

export const REMOVE_TOKEN = () => {
    localStorage.removeItem('token')
}


export const GET_MENU = () => {
    return localStorage.getItem("menu");
}

export const SET_MENU = (menu: string): void => {
    localStorage.setItem("menu", menu);
}

export const REMOVE_MENU = (): void => {
    localStorage.removeItem("menu");
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