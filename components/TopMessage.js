import React from 'react'
import { View, Text } from 'react-native'

export default class TopMessage extends React.Component {
  render() {
    const { topViewStyle, messageViewStyle, messageTextStyle } = styles;

    return(
      <View style={topViewStyle}>
        <View style={messageViewStyle}>
          <Text style={messageTextStyle}>
            {this.props.text}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  topViewStyle: {
    height: 120,
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
  },
  messageViewStyle: {
    paddingTop: 15, paddingBottom: 15,
    paddingLeft: 10, paddingRight: 10,
    backgroundColor: 'white',
    borderRadius: 3,
  },
  messageTextStyle: {
    fontSize: 16,
    fontWeight: 500,
  }
}
