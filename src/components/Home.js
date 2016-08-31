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
import Loading from './Loading';

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
        return (<Loading />);
    }

    const { navigator } = this.props;

    const { height, width } = Dimensions.get('window');
    const headerHeight = height * 0.75;

    const goToFilter = () => navigator.push({name: 'Filter', sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump});

    var filterText = 'do something';
    if (this.props.viewer.activeFilterCategories.edges.length > 0) {
      filterText = this.props.viewer.activeFilterCategories.edges.map(n => n.node.name).join(' & ');
    }

    return (
      <ParallaxScrollView
          style={{ flex: 1}}
          contentBackgroundColor={'transparent'}
          backgroundColor={'transparent'}
          renderForeground={() => <IWantToLarge goToFilter={goToFilter} filterText={filterText} />}
          renderStickyHeader={() => <IWantToSmall goToFilter={goToFilter} filterText={filterText} />}
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
    const { goToFilter, filterText } = this.props;

    return (
      <View style={styles.iWantContainer}>
        <Text style={styles.iWantTo}>I want to</Text>
        <TouchableOpacity onPress={goToFilter}>
          <View style={styles.surpriseMeContainer}>
            <Text style={styles.surpriseMe}>{filterText}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class IWantToSmall extends Component {
  render() {
    const { goToFilter, filterText } = this.props;


    const { width } = Dimensions.get('window');
    const filterTextStyle = [smallIWantToStyles.filterText, {maxWidth: width * 0.6}];


    return (
      <Image source={StarsImage} style={smallIWantToStyles.backgroundImage}>
        <View style={smallIWantToStyles.container}>
          <Text style={smallIWantToStyles.text}>I want to</Text>
          <TouchableOpacity onPress={goToFilter}>
            <View style={smallIWantToStyles.filterNameContainer}>
              <Text style={filterTextStyle} numberOfLines={1} ellipsizeMode={'tail'}>{filterText}</Text>
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
    flex: 1,
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
