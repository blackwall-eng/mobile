'use strict';

import Relay from 'react-relay';
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Navigator,
  InteractionManager,
  Dimensions
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';

import StarsImage from './stars.png';

import Events from './Events';

class Home extends Component {
  propTypes: {
    navigator: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      renderPlaceholderOnly: true
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  }

  render() {
    if (this.state.renderPlaceholderOnly) {
        return (<View></View>);
    }

    const { height, width } = Dimensions.get('window');
    const headerHeight = height * 0.75;

    const { navigator } = this.props;

    const goToFilter = () => navigator.push({name: 'Filter', sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump});

    return (
      <ParallaxScrollView
          style={{ flex: 1}}
          contentBackgroundColor={'transparent'}
          backgroundColor={'transparent'}
          renderForeground={() => <IWantToLarge goToFilter={goToFilter} />}
          renderStickyHeader={() => <IWantToSmall goToFilter={goToFilter} />}
          stickyHeaderHeight={100}
          parallaxHeaderHeight={ headerHeight }>
        <View style={styles.eventList}>
          <Events {...this.props} />
        </View>
      </ParallaxScrollView>
    );
  }
}

class IWantToLarge extends Component {
  render() {
    const { goToFilter } = this.props;

    return (
      <View style={styles.iWantContainer}>
        <Text style={styles.iWantTo}>I want to</Text>
        <TouchableOpacity onPress={goToFilter}>
          <View style={styles.surpriseMeContainer}>
            <Text style={styles.surpriseMe}>do something</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class IWantToSmall extends Component {
  render() {
    const { goToFilter } = this.props;

    return (
      <Image source={StarsImage} style={smallIWantToStyles.backgroundImage}>
        <View style={smallIWantToStyles.container}>
          <Text style={smallIWantToStyles.text}>I want to</Text>
          <TouchableOpacity onPress={goToFilter}>
            <View style={smallIWantToStyles.filterNameContainer}>
              <Text style={smallIWantToStyles.filterText}>do something</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Image>
    );
  }
}

const smallIWantToStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    backgroundColor: 'rgb(37, 37, 37)',
  },
  container: {
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 20,
    marginRight: 10
  },
  filterNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 26
  },
  filterText: {
    color: 'white',
 	  fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 20
  }
});

export default Relay.createContainer(Home, {
  fragments: {
    viewer: ({categories}) => Relay.QL`
      fragment on User {
        ${Events.getFragment('viewer')},
        activeFilterCategories(first: 10) {
          edges {
            node {
              name
            }
          }
        }
      }
    `,
  },
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iWantContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iWantTo: {
    color: 'white',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 25,
    marginBottom: 20,
  },
  surpriseMeContainer: {
  	flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 26
  },
  surpriseMe: {
 	  color: 'white',
 	  fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 25
  },
  eventList: {
    backgroundColor: 'black'
  }
});
