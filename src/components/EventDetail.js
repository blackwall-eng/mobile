'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import NoImage from './noimagefound.jpg';

import EventListItem from './EventListItem';
import CheckButton from './CheckButton';

class EventDetail extends Component {

  render() {
    const { navigator, event } = this.props;

    const goBack = () => navigator.pop();

    const image = event.image ? {uri: event.image} : NoImage;

    const categoryColor = event.categories.edges[0].node.color;


    var firstStepText = "";
    if (event.steps.edges.length > 0) {
      firstStepText = event.steps.edges[0].node.text;
    }

    return (
      <View style={styles.container}>
        <Image source={image} style={styles.image}>
          <LinearGradient colors={['transparent','transparent', 'white']} style={styles.imageForeground}>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Text style={styles.title}>{'<'}</Text>
            </TouchableOpacity>
            <View style={styles.eventListItemContainer}>
              <EventListItem {...this.props} />
            </View>
          </LinearGradient>
        </Image>
        <View style={styles.stepContainer}>
          <View style={styles.labelRow}>
            <Text style={styles.eventInfos}>Sun</Text>
            <Text style={styles.eventInfos}>Multi</Text>
            <Text style={styles.eventInfos}>Nice</Text>
          </View>
          <View style={styles.stepStatus}>
          </View>
          <View style={styles.stepAction}>
            <Text style={[styles.stepTitle, {color: categoryColor}]}>{firstStepText}</Text>
          </View>
          <View style={styles.stepStatic}>
            <CheckButton color={categoryColor} />
            <Text>{'•'}{'•'}{'•'}{'•'}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Relay.createContainer(EventDetail, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        name
      }
    `,
    event: () => Relay.QL`
      fragment on Event {
        title,
        subtitle,
        image,
        steps(first: 10) {
          edges {
            node {
              __typename,
              ... on TextStep {
                text
              }
            }
          }
        },
        categories(first: 1) {
          edges {
            node {
              color
            }
          }
        },
        ${EventListItem.getFragment('event')}
      }
    `,
  },
});

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    marginTop: 20,
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  title: {
    color: 'white',
    fontSize: 22,
  },
  image: {
    width: width,
    height: height / 1.75,
  },
  imageForeground: {
    width: width,
    height: height / 1.75,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  eventListItemContainer: {
    marginHorizontal: 20,
    marginBottom: 35,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    marginTop: -21,
  },
      eventInfos: {
        width: 28,
        height: 28,
        marginHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
      },
  stepStatus: {
    flex: 0,
    height: 35,
  },
  stepTitle: {
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    paddingHorizontal: 40,
    lineHeight: 30,
  },
  stepStatic: {
    flex: 2,
    marginTop: 12,
  },
});
