import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:2000'

export interface IUser {
  username: string;
  password: string;
}

export const getLoginStatus = () => {
  return axios.get('/login/status', { withCredentials: true })
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const postLogin = (user: IUser) => {
  return axios.post('/login', user, { withCredentials: true })
}

export const getLoggedOut = () => {
  return axios.get('/logout', { withCredentials: true })
    .catch(err => console.log(err))
}
