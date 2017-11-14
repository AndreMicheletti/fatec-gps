import React from 'react';
import { View, Text, Picker } from 'react-native';

class PickerInput extends React.Component {

  state = { selectedValue: 0 }

  getStyles() {
    return {
      containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      },
      textStyle: {
        fontSize: this.props.fontSize,
        paddingLeft: 5,
        flex: 1
      },
      inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 10,
        flex: 2,
        ...this.props.extraInputStyle
      },
      inputItemStyle: {
        fontSize: this.props.fontSize,
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

  renderItems() {
    let { itemList } = this.props;
    return itemList.map((item) => {
      return (
        <Picker.Item
          label={item.label}
          value={item.value}
          key={item.value}
        />
      );
    });
  }

  selfOnValueChange(itemValue, itemIndex) {
    this.setState({ selectedValue:  itemValue });

    // Callback passed on by props
    this.props.onValueChange(itemValue, itemIndex);
  }

  render() {
    const { containerStyle, textStyle, inputStyle, inputItemStyle } = this.getStyles();

    return (
      <View style={containerStyle}>
        {this.renderLabel()}
        <Picker
          style={inputStyle}
          itemStyle={inputItemStyle}
          selectedValue={this.state.selectedValue}
          {...this.props}
          onValueChange={this.selfOnValueChange.bind(this)}
        >
          {this.renderItems()}
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
  onValueChange: ((itemValue, itemIndex) => console.log('selected ' + itemValue))
};

export { PickerInput };
