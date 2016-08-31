'use strict';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  Dimensions
} from 'react-native';

import StarsImage from './stars.png';

export default class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      verficationCode: null,
      currentStep: 0
    };
  }

  // TODO: Registration in eine Componente packen die per Navigator die jeweiligen Schritte anzeigt um um das Input Problem herum zu kommen

  render() {
    const { onSuccess } = this.props;

    const { currentStep, name, email, verficationCode } = this.state;

    const goToNextStep = () => {
      this.setState({
        currentStep: currentStep + 1
      });
    }

    if (verficationCode && verficationCode.length === 4) {
      onSuccess('1234');
    }

    var content = null;
    if (currentStep === 0) {
      content = (
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
            onSubmitEditing={goToNextStep}
          />
        </View>
      )
    } else if (currentStep === 1) {
      content = (
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
            onSubmitEditing={goToNextStep}
          />
        </View>
      );
    } else {
      content = (
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
            onSubmitEditing={goToNextStep}
          />
        </View>
      );
    }

    return (
      <Image source={StarsImage} style={styles.stars}>
        <View style={styles.contentContainer}>
          {content}
        </View>
      </Image>
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
