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
        <View style={styles.imageForeground}>
          <Image source={image} style={styles.image}>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Text style={styles.title}>{'<'}</Text>
            </TouchableOpacity>
            <View style={styles.eventListItemContainer}>
              <EventListItem {...this.props} />
            </View>
          </Image>
        </View>
        <View colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.stepContainer}>
          <View style={styles.labelRow}>
            <Text style={{marginHorizontal: 5}}>Sun</Text>
            <Text style={{marginHorizontal: 5}}>Multi</Text>
            <Text style={{marginHorizontal: 5}}>Nice</Text>
          </View>
          <Text style={{color: categoryColor, fontSize: 25, textAlign: 'center'}}>{firstStepText}</Text>
          <CheckButton color={categoryColor} />
          <Text>{'•'}{'•'}{'•'}{'•'}</Text>
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
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    width: width,
    height: height / 2,
  },
  imageForeground: {
    backgroundColor: 'green',
    width: width,
    height: height / 2,
  },
  eventListItemContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  labelRow: {
    flexDirection: 'row'
  }
});
