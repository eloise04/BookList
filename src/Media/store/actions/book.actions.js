import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

export const GET_BOOKS = '[BOOK] GET BOOKS';
export const GET_FAVORIS = '[FAVORIS] GET FAVORIS';
export const ADD_FAVORIS = '[FAVORIS] ADD FAVORIS';
export const DELETE_FAVORIS = '[FAVORIS] DELETE FAVORIS';

export const getFavoris = (payload, idUser) => {
  const config = {
    headers: {
      Authorization: `Bearer ${payload}`,
    },
  };
  const result = axios.get(`https://dark-nightmare-23481.herokuapp.com/users/me/books/${idUser}`, config);
  return (dispatch) => {
    result.then((response) => {
      dispatch({
        type: GET_FAVORIS,
        payload: response.data,
      });
    }).catch(() => {
      showMessage({
        message: 'Aucun Favoris trouvé',
        type: 'info',
      });
      dispatch({
        type: GET_FAVORIS,
        payload: null,
      });
    });
  };
};

export const deleteFavoris = (payload, idFavoris, idUser) => {
  const result = axios({
    method: 'DELETE',
    url: `https://dark-nightmare-23481.herokuapp.com/favorites/${idFavoris.toString()}`,
    headers: {
      Authorization: `Bearer ${payload}`,
    },
  });
  return (dispatch) => {
    result.then(() => {
      dispatch(getFavoris(payload, idUser));
      dispatch({
        type: DELETE_FAVORIS,
      });
      showMessage({
        message: 'Le favoris à bien été supprimé.',
        type: 'success',
      });
    }).catch(() => {
      showMessage({
        message: 'Echec de la suppression du favoris.',
        type: 'warning',
      });
      dispatch({
        type: DELETE_FAVORIS,
      });
    });
  };
};

export const addFavoris = (payload, idUser, idBook) => {
  const result = axios({
    method: 'POST',
    url: 'https://dark-nightmare-23481.herokuapp.com/favorites',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload}`,
    },
    data: {
      user: idUser,
      book: idBook,
      type: 'book',
    },
  });
  return (dispatch) => {
    result.then((response) => {
      dispatch(getFavoris(payload, idUser));
      dispatch({
        type: ADD_FAVORIS,
        payload: response.data,
      });
      showMessage({
        message: 'Le favoris à bien été ajouté.',
        type: 'success',
      });
    }).catch(() => {
      showMessage({
        message: "Le favoris n'a pas pu être ajouté ou existe déjà.",
        type: 'info',
      });
      dispatch({
        type: ADD_FAVORIS,
        payload: null,
      });
    });
  };
};

export const getBooks = (payload) => {
  const config = {
    headers: {
      Authorization: `Bearer ${payload}`,
    },
  };
  const result = axios.get('https://dark-nightmare-23481.herokuapp.com/books', config);

  return (dispatch) => {
    result.then((response) => {
      dispatch({
        type: GET_BOOKS,
        payload: response.data,
      });
    }).catch(() => {
      dispatch({
        type: GET_BOOKS,
        payload: null,
      });
    });
  };
};
