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
    const buttonStyle = [styles.textButton, {color: backgroundColor}];

    const filterList = edges.map(category => {
      const active = activeCategoryEdges.find(n => n.node.id === category.node.id) !== undefined;
      return (<FilterListItem key={category.node.id} viewer={this.props.viewer} category={category.node} active={active} color={backgroundColor} />)
    });

    const goToHome = () => this.props.navigator.pop();

    // Only show done when at least one category is selected
    const okButton = activeCategoryEdges.length > 0 ?
      (
       <TouchableOpacity onPress={goToHome}>
         <View style={styles.okButton}>
           <Text style={buttonStyle}>Go</Text>
         </View>
       </TouchableOpacity>
      ): null;

    LayoutAnimation.spring();

    return (
      <View style={containerStyle}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>
              Don{"'"}t be shy{"\n"}choose a theme.
          </Text>
        </View>
        <View style={styles.listing}>
          {filterList}
        </View>
        <View style={styles.footer}>
          {okButton}
        </View>
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
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  textHeader: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 25,
    paddingTop: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  listing: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
   },
   footer: {
     flex: 1,
     justifyContent: 'center',
   },
   okButton: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     alignSelf: 'center',
     backgroundColor: 'rgba(255, 255, 255, 1)',
     height: 58,
     width: 58,
     borderRadius: 35,
     marginBottom: 30,
   },
   textButton: {
     fontFamily: 'Helvetica',
     fontWeight: '100',
     color: '#FFFFFF',
     fontSize: 23,
   },
});
