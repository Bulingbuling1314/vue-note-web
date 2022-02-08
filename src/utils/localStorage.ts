const SET_TOKEN = (token: string): void => {
  localStorage.setItem("Token", token);
}

const GET_TOKEN = () => {
  return localStorage.getItem("Token");
}




export {
  SET_TOKEN,
  GET_TOKEN
}