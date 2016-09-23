'use strict';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import BackButtonImage from './BackButton.png';

export default class BackButton extends Component {
  render() {
    const { style, onPress } = this.props;

    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <Image style={styles.image} source={BackButtonImage} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  }
});
