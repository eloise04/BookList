import { combineReducers } from 'redux';
import book from './book.reducer';

const reducer = combineReducers({
  book,
});

export default reducer;
