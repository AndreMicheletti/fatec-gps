import React from 'react';
import { View, ListView, Text, TouchableNativeFeedback } from 'react-native';
import { ContainerSection } from './common';

class Building extends React.Component {

  renderRooms() {
    return this.props.data.rooms.forEach((room) =>
      <Text key={room}>
        {room}
      </Text>
    );
  }

  renderContents() {
    const { expanded, data } = this.props;

    if (expanded == true) {
      return (
        <ContainerSection>
          {this.renderRooms()}
        </ContainerSection>
      );
    }
  }

  render() {
    const { touchableViewStyle, touchableTextStyle } = styles;
    return (
      <TouchableNativeFeedback onPress={this.props.onPress}>
        <View style={touchableViewStyle}>
          <ContainerSection>
            <Text style={touchableTextStyle}>
              {this.props.data.name}
            </Text>
          </ContainerSection>
          {this.renderContents()}
        </View>
      </TouchableNativeFeedback>
    );
  }
};

Building.defaultProps = {
  data: { id: -1, name: 'undefined' },
  expanded: false,
  onPress: (() => console.log('listview item pressed!'))
};

const styles = {
  touchableViewStyle: {
    backgroundColor: '#DDD',
    paddingTop: 10, paddingBottom: 10,
    paddingLeft: 10, paddingRight: 10,
    marginTop: 5
  },
  touchableTextStyle: {
    fontSize: 20,
    alignSelf: 'center'
  }
};

export default Building;
