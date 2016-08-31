'use strict';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  Navigator
} from 'react-native';

import StarsImage from './stars.png';

export default class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      verficationCode: null,
    };
  }

  // TODO: Registration in eine Componente packen die per Navigator die jeweiligen Schritte anzeigt um um das Input Problem herum zu kommen

  render() {
    const { onSuccess } = this.props;

    const { name, email, verficationCode } = this.state;

    const sendVerify = () => {
      fetch('https://blackwall-cerebro.herokuapp.com/verify', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          verficationCode: verficationCode,
        })
      }).then(res => res.json()).then(res => {
        if (res.status === 'success') {
          onSuccess(res.user.token);
        } else {
          // TODO: Show error message
        }
      });
    };

    if (verficationCode && verficationCode.length === 4) {
      sendVerify();
    }

    const navigationToScene = (route, navigator) => {
        const getContentView = () => {
          switch (route.name) {
              case 'Name':
                return (
                  <View>
                    <Text style={styles.text}>Hey stranger,{'\n'} may I know your name?</Text>
                    <TextInput
                      style={styles.input}
                      blurOnSubmit={false}
                      onChangeText={(text) => this.setState({name: text})}
                      value={this.state.name}
                      placeholder={'Sure my name is ...'}
                      placeholderTextColor={'gray'}
                      returnKeyType={'next'}
                      autoFocus={true}
                      autoCorrect={false}
                      onSubmitEditing={() => this.navigator.push({name: 'Email'})}
                    />
                  </View>
                );
              case 'Email':
                return (
                  <View>
                    <Text style={styles.text}>Hi {name}, may I have your e-mail?</Text>
                    <TextInput
                      style={styles.input}
                      blurOnSubmit={false}
                      onChangeText={(text) => this.setState({email: text})}
                      value={this.state.email}
                      placeholder={'Sure it is ...'}
                      placeholderTextColor={'gray'}
                      returnKeyType={'next'}
                      keyboardType={'email-address'}
                      autoCapitalize={'none'}
                      autoFocus={true}
                      autoCorrect={false}
                      onSubmitEditing={() => this.navigator.push({name: 'Code'})}
                    />
                  </View>
                );
              case 'Code':
                return (
                  <View>
                    <Text style={styles.text}>Lastly, may I have the code you received via Email?</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => this.setState({verficationCode: text})}
                      value={this.state.verficationCode}
                      placeholder={'It is ...'}
                      placeholderTextColor={'gray'}
                      returnKeyType={'done'}
                      keyboardType={'numeric'}
                      autoFocus={true}
                      autoCorrect={false}
                    />
                  </View>
                );
          }
        }

        return (
          <Image source={StarsImage} style={styles.stars}>
            <View style={styles.contentContainer}>
              {getContentView()}
            </View>
          </Image>
        );
    }

    const navigationBarRouteMapper = {
      LeftButton: (route, navigator, index, navState) => {
        return null;
      },
      RightButton: (route, navigator, index, navState) =>
           { return null; },
      Title: (route, navigator, index, navState) =>
           { return null; },
    };

    return (
      <Navigator
        initialRoute={{name:  'Name', gestures: null}}
        renderScene={navigationToScene}
        configureScene={(route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.VerticalUpSwipeJump,
          gestures: route.gestures || null
        })}
        ref={(c) => this.navigator = c}
        navigationBar={null}
      />
    );
  }
}

const styles = StyleSheet.create({
  stars: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: 'rgb(37, 37, 37)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'column',
  },
  text: {
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    width: 250,
    height: 25,
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});
