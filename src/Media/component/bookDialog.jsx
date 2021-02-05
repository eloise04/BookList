import React from 'react';
import {
  Button, ScrollView, StyleSheet, Text, View, Image, TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as Actions from '../store/actions';
import closeImg from '../../../public/icon/close.png';

const styles = StyleSheet.create({
  input: {
    width: 395,
    backgroundColor: 'white',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSubmit: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 35,
  },
  cardOpacity: {
    backgroundColor: 'rgba(255,255,255, 0.8);',
    width: '100%',
    height: '100%',
  },
  bookCard: {
  },
  close: {
    zIndex: 10,
    left: '90%',
  },
  viewText: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitre: {
    color: 'black',
    fontSize: 20,
  },
  viewImage: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBook: {
    zIndex: -1,
    width: 200,
    height: 300,
    bottom: 2,
    paddingBottom: 2,
  },
  viewOne: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDescription: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDescription: {
    fontSize: 20,
  },
  lineHr: {
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  },
});

function BookDialog(props) {
  const {
    data, onClose, display, idFavori,
  } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const addFavoris = (() => {
    dispatch(Actions.addFavoris(user.token, user.userInfo.user.id, data.id));
    onClose();
  });

  const deleteFavoris = (() => {
    dispatch(Actions.deleteFavoris(user.token, props.idFavori, user.userInfo.user.id));
    onClose();
  });
  if (data === null) {
    return null;
  }
  return (
    <Modal isVisible={display} onBackdropPress={() => { onClose(); }}>
      <ScrollView>

        <View style={styles.cardOpacity}>
          <View style={styles.bookCard}>
            <TouchableHighlight
              underlayColor=""
              onPress={() => { onClose(); }}
            >
              <Image source={closeImg} style={styles.close} />
            </TouchableHighlight>
            <View style={styles.viewText}>
              <Text style={styles.textTitre}>{data.title}</Text>
            </View>
            <View style={styles.viewImage}>
              <Image source={{ uri: data.img.url }} style={styles.imageBook} />
              {(!idFavori) ? <Button title="Ajouter Favoris" onPress={() => { addFavoris(); }} />
                : <Button title="Suprrimer Favoris " onPress={() => { deleteFavoris(); }} /> }
            </View>
            <View
              style={styles.lineHr}
            />
            <View style={styles.viewOne}>
              <View style={styles.viewDescription}>
                <Text style={styles.textDescription}>
                  {data.description}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}

BookDialog.propTypes = {
  display: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    img: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
  }).isRequired,
  idFavori: PropTypes.number,
};

BookDialog.defaultProps = {
  idFavori: null,
};

export default BookDialog;
