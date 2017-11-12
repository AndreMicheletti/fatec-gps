import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

class TextLink extends React.Component {
  render() {
    return(
      <TouchableOpacity style={styles.wrapperStyle} onPress={this.props.onPress}>
        <Text style={styles.textStyle}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
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

export default TextLink;
