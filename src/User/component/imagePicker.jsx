import React, { useEffect } from 'react';
import {
  Button, View, Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import * as Actions from '../store/actions';

export default function ImagePickerComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const idUser = user.userInfo.user.id;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        await ImagePicker.requestCameraRollPermissionsAsync();
        await ImagePicker.requestCameraPermissionsAsync();
      }
    })();
  }, []);

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.cancelled === true) {
      return;
    }
    const formData = new FormData();
    const localUri = result.uri;
    const filename = localUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image';

    formData.append('files', { uri: result.uri, name: 'yoloss', type });
    formData.append('ref', 'user');
    formData.append('refId', idUser);
    formData.append('field', 'avatar');
    formData.append('source', 'users-permissions');
    axios
      .post('https://dark-nightmare-23481.herokuapp.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        dispatch(Actions.getUserInfo(user.token));
        showMessage({
          message: "L'image de profil à bien été changé.",
          type: 'success',
        });
      })
      .catch(() => {
        showMessage({
          message: "L'image de profil reste inchangé.",
          type: 'info',
        });
      });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.cancelled === true) {
      return;
    }
    const formData = new FormData();
    const localUri = result.uri;
    const filename = localUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image';

    formData.append('files', { uri: result.uri, name: 'yoloss', type });
    formData.append('ref', 'user');
    formData.append('refId', idUser);
    formData.append('field', 'avatar');
    formData.append('source', 'users-permissions');
    axios
      .post('https://dark-nightmare-23481.herokuapp.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        dispatch(Actions.getUserInfo(user.token));
        showMessage({
          message: "L'image de profil à bien été changé.",
          type: 'success',
        });
      })
      .catch(() => {
        showMessage({
          message: "L'image de profil reste inchangé.",
          type: 'info',
        });
      });
  };

  return (
    <View style={{ }}>
      <Button title="Modifier" onPress={pickImage} />
      <Button title="Prendre une Photo " onPress={takePhoto} />
    </View>
  );
}
