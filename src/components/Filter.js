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
    this.state = {backgroundColor: null};
  }

  render() {
    const { edges } = this.props.viewer.categories;

    const isItPressed = (isPressed, category) => {
      this.setState({backgroundColor: category.color});
    }

    const filterList = edges.map(category => {
      return (<FilterListItem key={category.node.id} category={category.node} onPress={isItPressed} />)
    });

    const containerStyle = [styles.container, {backgroundColor: this.state.backgroundColor}];

    const goToResults = () => this.props.navigator.push({name: 'Events'});
    const goToHome = () => this.props.navigator.pop();

    return (
      <View style={containerStyle}>
        <Text style={styles.textHeader}>
            Don{"'"}t be shy{"\n"}choose a theme.
        </Text>
        <View style={styles.listing}>
          {filterList}
        </View>
        <TouchableOpacity onPress={goToResults}>
          <Text>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToHome}>
          <Text>Cancel</Text>
        </TouchableOpacity>
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
  container: {
    flex: 1,
    justifyContent: 'center'
  },
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 15,
    paddingHorizontal: 15,
   },
});
