import React from 'react';
import { View, Text, Picker } from 'react-native';

class PickerInput extends React.Component {

  getStyles() {
    const { fontSize, extraInputStyle } = this.props;
    return {
      containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      },
      textStyle: {
        fontSize: fontSize,
        paddingLeft: 5,
        flex: 1
      },
      inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 10,
        flex: 2,
        ...extraInputStyle
      },
      inputItemStyle: {
        fontSize: fontSize,
      }
    };
  }

  renderLabel() {
    const {  textStyle } = this.getStyles();

    if (this.props.label !== null) {
      return (
        <Text style={textStyle}>{this.props.label}</Text>
      );
    } else {
      return null;
    }
  }

  renderItems(style) {
    let { itemList } = this.props;
    return itemList.map((item) => {
      return (
        <Picker.Item
          style={style}
          label={item.label}
          value={item.value}
          key={item.value}
        />
      );
    });
  }

  render() {
    const { containerStyle, textStyle, inputStyle, inputItemStyle } = this.getStyles();

    return (
      <View style={containerStyle}>
        {this.renderLabel()}
        <Picker style={inputStyle} itemStyle={inputItemStyle} {...this.props}>
          {this.renderItems(inputItemStyle)}
        </Picker>
      </View>
    );
  }
}

const styles = {

};

PickerInput.defaultProps = {
  label: null,
  fontSize: 14,
  extraInputStyle: null,
  itemList: [
    { label: 'First', value: 'first' }, { label: 'Second', value: 'second' }
  ],
  onValueChange: ((itemValue, itemIndex) => console.log('selected ' + itemValue)),
  selectedValue: 0
};

export { PickerInput };
