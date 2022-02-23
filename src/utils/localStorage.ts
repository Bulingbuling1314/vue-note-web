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

/** 储存路由 */
export const SET_MENU = (menu: string): void => {
    localStorage.setItem("menu", menu);
}

export const GET_MENU = (): string | null => {
    return localStorage.getItem("menu");
}

export const REMOVE_MENU = () => {
    localStorage.removeItem("menu");
}