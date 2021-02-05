import * as Actions from '../actions';

const initialState = {
  entities: null,
  logged: false,
  token: null,
  userInfo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.AUTH_USER:
    {
      return {
        ...state,
        logged: action.payload,
        token: action.token,
        userInfo: action.userInfo,
      };
    }
    case Actions.REGISTER_USER:
    {
      return {
        ...state,
        entities: action.payload,
      };
    }
    case Actions.LOGOUT_USER:
    {
      return {
        ...state,
        logged: action.payload,
        token: null,
        userInfo: null,
      };
    }
    case Actions.UPDATE_USER:
    {
      return {
        ...state,
        userInfo: { user: action.userInfo },
      };
    }
    case Actions.UPDATE_USER_ERROR:
    {
      return {
        ...state,
      };
    }
    default:
    {
      return state;
    }
  }
};

export default userReducer;
