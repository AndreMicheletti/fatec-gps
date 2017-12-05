import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { ContainerSection } from './common';
import * as actions from '../actions';

import FloorItem from './FloorItem';

class BuildingItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderFloors(floors) {
    return floors.forEach((floor) => {
      return (
        <FloorItem floor={floor} />
      );
    });
  }

  renderDescription() {
    const { building, expanded } = this.props;
    console.log(this.renderFloors(building.floors));
    if (expanded) {
      return (
        <ContainerSection>
          {this.renderFloors(building.floors)}
        </ContainerSection>
      );
    }
  }

  render() {
    const { titleStyle } = styles;
    const { id, name } = this.props.building;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectBuilding(id)}
      >
        <View>
          <ContainerSection>
            <Text style={titleStyle}>
              {name}
            </Text>
          </ContainerSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  descriptionStyle: {
    paddingLeft: 10,
    paddingRight: 10
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedBuildingId === ownProps.building.id;

  return { expanded };
};

export default connect(mapStateToProps, actions)(BuildingItem);
