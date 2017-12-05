import React, { Component } from 'react';
import { Text, View, ScrollView, LayoutAnimation } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ContainerSection } from './common';
import * as actions from '../actions';

import FloorItem from './FloorItem';

class BuildingItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderFloors(floors) {
    return floors.map((floor) => {
      return (
        <FloorItem key={floor.name} floor={floor} />
      );
    });
  }

  renderDescription() {
    const { building, expanded } = this.props;

    if (expanded) {
      return (
        <ScrollView style={{ flexDirection: 'column' }}>
          {this.renderFloors(building.floors)}
        </ScrollView>
      );
    }
  }

  render() {
    const { titleStyle, touchableStyle } = styles;
    const { id, name } = this.props.building;

    return (
      <TouchableOpacity onPress={() => this.props.selectBuilding(id)}>
        <View>
          <ContainerSection style={touchableStyle}>
            <Text style={titleStyle}>
              {name}
            </Text>
          </ContainerSection>
          <View style={{ flex: 1 }}>
            {this.renderDescription()}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 22,
    paddingLeft: 15,
    color: '#007aff'
  },
  descriptionStyle: {
    paddingLeft: 10,
    paddingRight: 10
  },
  touchableStyle: {
    borderColor: '#007aff',
    backgroundColor: '#f8f8f8'
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedBuildingId === ownProps.building.id;

  return { expanded };
};

export default connect(mapStateToProps, actions)(BuildingItem);
