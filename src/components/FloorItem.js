import React from 'react';
import { View, Text } from 'react-native';
import { ContainerSection } from './common';

class FloorItem extends React.Component {

  renderRooms(rooms) {
    const { roomNameText } = styles;
    return rooms.map((room) => <Text key={room} style={roomNameText}>{room}</Text>);
  }

  render() {
    const { name, rooms } = this.props.floor;
    const { floorNameView, floorNameText, roomNameView } = styles;

    return (
      <ContainerSection>
        <View style={floorNameView}>
          <Text style={floorNameText}>
            {name}
          </Text>
        </View>
        <View style={roomNameView}>
          {this.renderRooms(rooms)}
        </View>
      </ContainerSection>
    );
  }
}

const styles = {
  floorNameView: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderRadius: 2,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    paddingLeft: 10,
    flex: 1
  },
  floorNameText: {
    fontSize: 20
  },
  roomNameView: {
    paddingLeft: 8,
    flex: 2
  },
  roomNameText: {
    fontSize: 18
  }
}

export default FloorItem;
