import React from 'react';
import { View, Text } from 'react-native';
import { ContainerSection } from './common';

class FloorItem extends React.Component {

  renderRooms(rooms) {
    return rooms.forEach((room) => (
      <Text key={room}>{room}</Text>
    ));
  }

  render() {
    const { name, rooms } = this.props.floor;

    return (
      <ContainerSection>
        <View key={name}>
          <Text style={{ flex: 1 }}>
            {name}
          </Text>
          {this.renderRooms(rooms)}
        </View>
      </ContainerSection>
    );
  }
}

export default FloorItem;
