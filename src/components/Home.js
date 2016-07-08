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
        <TouchableOpacity onPress={goToEvents}>
          <Text style={styles.header}>Surprise Me!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 30,
    paddingTop: 200
  },
});
