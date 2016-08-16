'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import FilterListItem from './FilterListItem';

class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {backgroundColor: 'green'};
  }

  render() {
    const { edges } = this.props.viewer.categories;

    const isItPressed = (isPressed, category) => {
      this.setState({backgroundColor: category.color});
    }

    const filterList = edges.map(category => {
      return (<FilterListItem key={category.node.id} category={category.node} onPress={isItPressed} />)
    });

    const containerBackgroundColor = {backgroundColor: this.state.backgroundColor};

    return (
      <View style={containerBackgroundColor}>
        <Text style={styles.textHeader}>
            Don{"'"}t be shy{"\n"}choose a theme.
        </Text>
        <View style={styles.listing}>
          {filterList}
        </View>
      </View>
    );
  }
}

export default Relay.createContainer(Filter, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        categories(first: 50) {
          edges {
            node {
              id,
              ${FilterListItem.getFragment('category')}
            }
          }
        }
      }
    `,
  },
});

const styles = StyleSheet.create({
  textHeader: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 25,
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    textAlign: 'center',
  },
  listing: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
   },
});
