import * as Actions from '../actions';

const initialState = {
  books: null,
  favoris: null,
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_FAVORIS:
    {
      return {
        ...state,
      };
    }
    case Actions.DELETE_FAVORIS:
    {
      return {
        ...state,
      };
    }
    case Actions.GET_FAVORIS:
    {
      return {
        ...state,
        favoris: action.payload,
      };
    }
    case Actions.GET_BOOKS:
    {
      return {
        ...state,
        books: action.payload,
      };
    }
    default:
    {
      return state;
    }
  }
};

export default bookReducer;
