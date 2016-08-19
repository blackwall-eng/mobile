'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  LayoutAnimation,
} from 'react-native';

import FilterListItem from './FilterListItem';

class Filter extends Component {

  render() {
    const { edges } = this.props.viewer.categories;

    const activeCategoryEdges = this.props.viewer.activeFilterCategories.edges;

    var backgroundColor = null;
    if (activeCategoryEdges[0]) {
      backgroundColor = activeCategoryEdges[0].node.color;
    }
    const containerStyle = [styles.container, {backgroundColor: backgroundColor}];

    const filterList = edges.map(category => {
      const active = activeCategoryEdges.find(n => n.node.id === category.node.id) !== undefined;
      return (<FilterListItem key={category.node.id} viewer={this.props.viewer} category={category.node} active={active} color={backgroundColor} />)
    });

    const goToHome = () => this.props.navigator.pop();

    // Only show done when at least one category is selected
    const doneButton = activeCategoryEdges.length > 0 ?
      (
       <TouchableOpacity onPress={goToHome}>
         <View style={styles.doneButton}>
           <Text>Done</Text>
         </View>
       </TouchableOpacity>
      ): null;

    LayoutAnimation.spring();

    return (
      <View style={containerStyle}>
        <Text style={styles.textHeader}>
            Don{"'"}t be shy{"\n"}choose a theme.
        </Text>
        <View style={styles.listing}>
          {filterList}
        </View>
        {doneButton}
      </View>
    );
  }
}

export default Relay.createContainer(Filter, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${FilterListItem.getFragment('viewer')},
        activeFilterCategories(first: 50) {
          edges {
            node {
              id
              color
            }
          }
        }
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
    justifyContent: 'center',
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
   doneButton: {
     alignItems: 'center',
     alignSelf: 'center',
     backgroundColor: 'white',
     padding: 10,
     borderRadius: 20
   }
});
