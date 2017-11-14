import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

class Button extends React.Component {

  render() {
    const { buttonStyle, textStyle } = this.getStyles();
    const { children, onPress } = this.props;

    return (
      <TouchableOpacity style={buttonStyle} onPress={onPress}>
        <Text style={textStyle}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }

  getStyles() {
    const { backgroundColor, color, padding } = this.props;

    return {
      textStyle: {
        alignSelf: 'center',
        color: color,
        fontSize: 15,
        fontWeight: '600',
        paddingTop: padding,
        paddingBottom: padding
      },
      buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: backgroundColor,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: color,
        marginLeft: 5,
        marginRight: 5
      }
    };
  }
}

Button.defaultProps = {
  color: '#007aff',
  backgroundColor: '#f8f8f8',
  padding: 10,
  onPress: () => console.log('Button pressed!')
};

export { Button };
