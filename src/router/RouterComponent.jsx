import React from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  View,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import Login from '../User/login';
import Register from '../User/register';
import Profil from '../User/profil';
import Home from '../Media/home';
import Favoris from '../Media/favoris';
import SearchBar from '../Media/searchBar';

const Tab = createBottomTabNavigator();

function RouterComponent() {
  const logged = useSelector((state) => state.userReducer.user.logged);

  function IconLogin({ route }) {
    let iconName;
    if (route.name === 'Login') {
      iconName = 'ios-log-in';
    } else if (route.name === 'Register') {
      iconName = 'ios-log-out';
    }
    return <Ionicons name={iconName} size={25} />;
  }

  IconLogin.propTypes = {
    route: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  };

  function IconApp({ route }) {
    let iconName;
    if (route.name === 'Home') {
      iconName = 'ios-home';
    } else if (route.name === 'Favoris') {
      iconName = 'ios-heart';
    } else if (route.name === 'Profil') {
      iconName = 'ios-person';
    } else if (route.name === 'Search') {
      iconName = 'ios-search';
    }
    return <Ionicons name={iconName} size={25} />;
  }

  IconApp.propTypes = {
    route: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  };

  const LoginNavigation = (() => (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => <IconLogin route={route} />,
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Register" component={Register} />
      </Tab.Navigator>
    </NavigationContainer>
  ));

  const AppNavigation = (() => (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => <IconApp route={route} />,
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favoris" component={Favoris} />
        <Tab.Screen name="Search" component={SearchBar} />
        <Tab.Screen name="Profil" component={Profil} />
      </Tab.Navigator>
    </NavigationContainer>
  ));

  const routerTabs = (() => {
    if (logged === false) {
      return LoginNavigation();
    }
    return AppNavigation();
  });

  return (
    <>
      <View style={{ flex: 1 }}>
        {routerTabs()}
        <FlashMessage position="top" />
      </View>
    </>
  );
}

export default RouterComponent;
