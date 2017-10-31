import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

class Button extends React.Component {

  render() {
    const { buttonStyle, textStyle } = this.getStyles();

    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={this.props.onPress}
      >
        <Text style={textStyle}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }

  getStyles() {
    return {
      textStyle: {
        alignSelf: 'center',
        color: this.props.color,
        fontSize: 15,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
      },
      buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: this.props.backgroundColor,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: this.props.color,
        marginLeft: 5,
        marginRight: 5
      }
    };
  }
}

export { Button };

Button.defaultProps = {
  color: '#007aff',
  backgroundColor: '#f8f8f8',
  onPress: () => console.log('Button pressed!')
};
