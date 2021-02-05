import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

export const AUTH_USER = '[USER] AUTH_USER';
export const REGISTER_USER = '[USER] REGISTER_USER';
export const LOGOUT_USER = '[USER] LOGOUT USER';
export const UPDATE_USER = '[USER] UPDATE USER';
export const UPDATE_USER_ERROR = '[USER] UPDATE USER ERROR';

export const authUser = (payload) => {
  const result = axios.post('https://dark-nightmare-23481.herokuapp.com/auth/local', payload);
  return (dispatch) => {
    result.then((response) => {
      dispatch({
        type: AUTH_USER,
        payload: true,
        token: response.data.jwt,
        userInfo: response.data,
      });
      showMessage({
        message: `Utilisateur ${response.data.user.username} connecté.`,
        type: 'success',
      });
    }).catch(() => {
      showMessage({
        message: "Echec de l'authentification.",
        type: 'warning',
      });
      dispatch({
        type: AUTH_USER,
        payload: false,
      });
    });
  };
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
    payload: false,
  });
  showMessage({
    message: 'Utilisateur déconnecté.',
    type: 'success',
  });
};

export const getUserInfo = (payload) => {
  const config = {
    headers: {
      Authorization: `Bearer ${payload}`,
    },
  };
  const result = axios.get('https://dark-nightmare-23481.herokuapp.com/users/me', config);
  return (dispatch) => {
    result.then((response) => {
      dispatch({
        type: UPDATE_USER,
        userInfo: response.data,
      });
    }).catch(() => {
      dispatch({
        type: UPDATE_USER_ERROR,
      });
    });
  };
};

export const registerUser = (payload) => {
  const result = axios.post('https://dark-nightmare-23481.herokuapp.com/auth/local/register', payload);
  return (dispatch) => {
    result.then((response) => {
      dispatch({
        type: AUTH_USER,
        payload: true,
        token: response.data.jwt,
        userInfo: response.data,
      });
      showMessage({
        message: `Utilisateur ${response.data.user.username} crée et connecté.`,
        type: 'success',
      });
    }).catch(() => {
      dispatch({
        type: AUTH_USER,
        payload: false,
      });
      showMessage({
        message: 'Echec de la creation du compte.',
        type: 'warning',
      });
    });
  };
};
