'use strict';
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

export default class Home extends Component {
  propTypes: {
    navigator: PropTypes.func.isRequired
  }

  render() {
    const { navigator } = this.props;

    const goToEvents = () => navigator.push({name: 'Events'});

    return (
      <View style={styles.container}>
        <Text style={styles.text}>I want to</Text>
        <TouchableOpacity onPress={goToEvents}>
            <Text style={styles.button}>do something</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 25,
  },
  button: {
    flex: 1,
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 25,
    height: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 26,
  },
  surpriseMeContainer: {
  	flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 26
  },
  surpriseMe: {
 	  color: 'white',
 	  fontFamily: 'Helvetica',
    fontWeight: '100',
    height: 50,
    fontSize: 25
  },
});
