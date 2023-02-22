import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:2000'

export interface IUser {
  username: string;
  password: string;
}

export const getLoginStatus = () => {
  return axios.get('/login/status')
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const postLogin = (user: IUser) => {
  return axios.post('/login', user)
}

export const getLoggedOut = () => {
  return axios.get('/logout')
    .catch(err => console.log(err))
}
