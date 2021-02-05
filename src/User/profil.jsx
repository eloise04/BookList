import React from 'react';
import {
  View, StyleSheet, Button, ImageBackground,
} from 'react-native';
import { Avatar, Accessory } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import ImagePicker from './component/imagePicker';
import imagebg from '../../public/mainWallpaper.jpg';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
  imageProfil: {
    paddingLeft: '30%',
    paddingTop: '20%',
  },
  inputProfilEmail: {
    width: 200,
    // paddingLeft: '30%',
    marginTop: 50,

  },
  inputProfilName: {
    width: 200,
    top: 10,
    bottom: 50,
  },
  inputProfilDeconnecter: {
    width: 200,
  },
  viewInput: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  viewButton: {
    marginBottom: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  lineHr: {
    borderBottomColor: 'rgba(255,255,255, 0.1)',
    borderBottomWidth: 30,
  },
});

function ProfilScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  let avatar = null;
  if (user.userInfo.user.avatar !== null) {
    avatar = user.userInfo.user.avatar.url;
  } else {
    avatar = null;
  }
  return (
    <>
      <View style={styles.lineHr} />
      <View style={[styles.container]}>
        <ImageBackground source={imagebg} style={styles.container}>
          <View style={[styles.imageProfil]}>
            <Avatar
              size="xlarge"
              source={{
                uri: avatar,
              }}
            >
              <Accessory />

            </Avatar>
            <ImagePicker />
          </View>
          <View style={styles.viewInput}>
            <TextInput
              style={[styles.inputProfilEmail]}
              label="Username"
              value={user.userInfo.user.email}
              editable={false}
            />
            <TextInput
              style={[styles.inputProfilName]}
              label="Email"
              value={user.userInfo.user.username}
              editable={false}
            />
            <View style={styles.viewButton}>
              <Button
                title="Se deconnecter "
                color="#ff5c5c"
                onPress={() => dispatch(Actions.logoutUser())}
                type="outline"
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

export default ProfilScreen;
