import axios from 'axios';

export default function authHeader() {
  const user = localStorage.getItem('user');
        axios.defaults.headers.common["x-auth-token"] = user;
}