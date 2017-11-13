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
    const {
      value,
      placeholder,
      autoCorrect,
      onChangeText,
      secureTextEntry,
      textInputProps,
      autoFocus,
      focus,
      keyboardType,
      multiline,
      onSubmitEditing,
      returnKeyType,
      blurOnSubmit
    } = this.props;

    return(
      <View style={containerStyle}>
        {this.renderLabel()}
        <TextInput
          value={value}
          style={inputStyle}
          onChangeText={onChangeText}
          placeholder={placeholder}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          focus={focus}
          keyboardType={keyboardType}
          multiline={multiline}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          blurOnSubmit={blurOnSubmit}
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
  autoFocus: false,
  focus: false,
  keyboardType: 'default',
  multiline: false,
  returnKeyType: 'done',
  blurOnSubmit: false,
  onSubmitEditing: () => console.log('submit!')
}

export { InputText };
