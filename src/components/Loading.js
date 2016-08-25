'use strict';

import React, { Component } from 'react';
import {
  Image,
  View,
  StyleSheet
} from 'react-native';

import LoadingImage from './loadingWhistle.gif';

export default class Loading extends Component {

  render() {

    const resizeImage = (event) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      this.refs.image.setNativeProps({
        style: {
          width: width,
          height: height,
          marginTop: height / 2,
        }
      });
    }

    return (
      <View style={styles.container} onLayout={resizeImage}>
        <Image ref='image' source={LoadingImage} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'contain',
    maxWidth: 250,
    maxHeight: 100,
  }
});
