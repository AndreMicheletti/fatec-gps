import React from 'react'
import { Text, TouchableHighlight } from 'react-native'

class TextLink extends React.Component {
  render() {
    return(
      <TouchableHighlight style={styles.wrapperStyle} onPress={this.props.onPress}>
        <Text style={styles.textStyle}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = {
  wrapperStyle: {
    padding: 5
  },
  textStyle: {
    fontSize: 14,
    color: '#00F'
  }
}

export default TextLink;
