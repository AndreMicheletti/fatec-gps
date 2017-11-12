import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default class TextLink extends React.Component {
  render() {

    const { text, visible, onPress } = this.props;
    const { wrapperStyle, textStyle } = styles;
    
    if (visible === true) {
      return (
        <TouchableOpacity style={wrapperStyle} onPress={onPress}>
          <Text style={textStyle}>
            {text}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return <View />;
    }
  }
}

TextLink.defaultProps = {
  visible: true,
  text: "Header",
  onPress: () => null
}

const styles = {
  wrapperStyle: {
    paddingTop: 5
  },
  textStyle: {
    fontSize: 16,
    color: '#00F'
  }
}
