import React, { useEffect } from 'react';
import {
  Image, ScrollView, TouchableHighlight, View, StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import BookDialog from './component/bookDialog';
import * as Actions from './store/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  item: {
    width: '50%',
  },
  listBook: {
    top: 11,
  },
  imageHome: {
    flex: 2,
    justifyContent: 'space-between',
    width: 170,
    height: 190,
  },
  lineHr: {
    borderBottomColor: 'rgba(255,255,255, 0.1)',
    borderBottomWidth: 50,
  },
  alignImage: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
});

function SearchBarScreen() {
  const dispatch = useDispatch();
  const [modalbool, setModelbool] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const token = useSelector((state) => state.userReducer.user.token);
  const books = useSelector((state) => state.bookReducer.book.books);

  useEffect(() => {
    if (books === null) {
      dispatch(Actions.getBooks(token));
    }
  }, [token, books]);

  const onPressModal = (element) => {
    setData(element);
    setModelbool(true);
  };

  const onCloseModal = () => {
    setModelbool(false);
  };

  const updateSearch = (searchString) => {
    setSearch(searchString);
  };

  const displayBook = (() => {
    if (books !== null) {
      let keymap = 0;
      const booksDisplayer = books.map((element) => {
        if (typeof search === 'string' && search !== '') {
          if (!element.title.toLowerCase().includes(search.toLowerCase())) {
            return null;
          }
        }
        let imgUrl;
        keymap += 1;
        if (element.img.irl !== null) {
          imgUrl = { uri: element.img.url };
        } else {
          imgUrl = { uri: 'https://i.pinimg.com/originals/6f/11/c5/6f11c51b8efb2c82af6c605e9321e766.jpg' };
        }

        return (
          <View key={keymap} style={styles.item}>
            <TouchableHighlight style={styles.alignImage} onPress={() => onPressModal(element)}>
              <Image
                source={imgUrl}
                style={styles.imageHome}
              />
            </TouchableHighlight>
          </View>
        );
      });
      return booksDisplayer;
    }
    return null;
  });

  return (
    <>
      { (modalbool === true)
        ? <BookDialog display={modalbool} onClose={onCloseModal} data={data} /> : null }
      <View style={styles.lineHr} />
      <SearchBar
        placeholder="Ecrivez ici ..."
        onChangeText={updateSearch}
        value={search}
      />
      <ScrollView>
        <View>
          <View style={[styles.container]}>
            {displayBook()}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default SearchBarScreen;
