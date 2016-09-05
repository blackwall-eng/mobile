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
      error: null,
    };
  }

  // TODO: Registration in eine Componente packen die per Navigator die jeweiligen Schritte anzeigt um um das Input Problem herum zu kommen

  render() {
    const { onSuccess } = this.props;

    const { name, email, verficationCode, error } = this.state;

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
          this.setState({error: 'Wrong Code, please type in the 4 digit code you received via E-Mail'});
        }
      });
    };

    const validateEmail = (e) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(e);
    }

    const createUser = () => {
      if (!validateEmail(email)) {
        this.setState({error: 'You must provide a valid Email Address'});
        return;
      }

      fetch('https://blackwall-cerebro.herokuapp.com/createuser', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: name,
        })
      }).then(res => {
        return res.json();
      }).then(res => {
        if (res.status === 'success') {
          this.setState({error: null});
          this.navigator.push({name: 'RegisterCode'});
        } else if (res.status === 'failure' && res.message === 'Email already exists') {
          // User already exists, the user received a new code via mail
          this.setState({error: null});
          this.navigator.push({name: 'LoginCode'});
        } else {
          this.setState({error: 'Something went wrong please try again later.'});
        }
      });
    }

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
                      placeholder={'Sure it is ...'}
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
                    <Text style={styles.text}>Hi {name},{'\n'} may I have your e-mail?</Text>
                    <TextInput
                      style={styles.input}
                      blurOnSubmit={false}
                      onChangeText={(text) => this.setState({email: text, error: null})}
                      value={this.state.email}
                      placeholder={'Sure it is ...'}
                      placeholderTextColor={'gray'}
                      returnKeyType={'next'}
                      keyboardType={'email-address'}
                      autoCapitalize={'none'}
                      autoFocus={true}
                      autoCorrect={false}
                      onSubmitEditing={createUser}
                    />
                  </View>
                );
              case 'RegisterCode':
                return (
                  <View>
                    <Text style={styles.text}>Lastly, may I have the code you received via Email?</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(text) => this.setState({verficationCode: text, error: null})}
                      value={this.state.verficationCode}
                      placeholder={'It is ...'}
                      placeholderTextColor={'gray'}
                      returnKeyType={'done'}
                      maxLength={4}
                      keyboardType={'numeric'}
                      autoFocus={true}
                      autoCorrect={false}
                    />
                  </View>
                );
                case 'LoginCode':
                  return (
                    <View>
                      <Text style={styles.text}>Checkpoint {name}!{'\n'}May I have the code?</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({verficationCode: text, error: null})}
                        value={this.state.verficationCode}
                        placeholder={'It is ...'}
                        placeholderTextColor={'gray'}
                        returnKeyType={'done'}
                        maxLength={4}
                        keyboardType={'numeric'}
                        autoFocus={true}
                        autoCorrect={false}
                      />
                    </View>
                  );
          }
        }

        const errorView = error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null;

        return (
          <Image source={StarsImage} style={styles.stars}>
            <View style={styles.contentContainer}>
              {errorView}
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
    marginBottom: Dimensions.get('window').height / 4,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 23,
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 35,

  },
  input: {
    width: 250,
    height: 50,
    fontSize: 23,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontWeight: '100',
  },
  errorContainer: {

  },
  errorText: {
    fontSize: 23,
    color: 'yellow',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    paddingHorizontal: 40,
  }
});
