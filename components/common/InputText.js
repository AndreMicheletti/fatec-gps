import React from 'react'
import { TextInput, View, Text } from 'react-native'

class InputText extends React.Component {

  getStyles() {
    return {
      containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      },
      textStyle: {
        fontSize: 16,
        paddingLeft: 5,
        flex: 1
      },
      inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 10,
        fontSize: 16,
        flex: 2,
        ...this.props.extraInputStyle
      }
    };
  }

  renderLabel() {
    if (this.props.label !== null) {
      return (
        <Text style={textStyle}>{this.props.label}</Text>
      );
    } else {
      return null;
    }
  }

  render() {
    const { textStyle, inputStyle, containerStyle } = this.getStyles();

    return(
      <View style={containerStyle}>
        {this.renderLabel()}
        <TextInput
          {...this.props}
          style={inputStyle}
          underlineColorAndroid="rgba(255,255,255,0)"
        />
      </View>
    );
  }
}

InputText.defaultProps = {
  placeholder: "placeholder",
  label: null,
  autoCorrect: false,
  secureTextEntry: false,
  extraInputStyle: {},
}

export { InputText };
