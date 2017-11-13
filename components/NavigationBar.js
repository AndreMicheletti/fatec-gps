import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import { InputText } from './common'

var { height, width } = Dimensions.get('window');

export default class NavigationBar extends React.Component {

  state = {
    fromInputFocus: true,
  }

  nextFocus() {
    console.log('yea!');
    this.setState({ fromInputFocus: false });
  }

  render() {
    const { floatView, boxView, inputStyle } = styles;
    return (
      <View style={floatView}>
        <View style={boxView}>
          <InputText
            placeholder="Onde você está?"
            extraInputStyle={inputStyle}
            focus={this.state.fromInputFocus}
          />
          <InputText
            placeholder="Para onde quer ir?"
            extraInputStyle={inputStyle}
            focus={!this.state.fromInputFocus}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  floatView: {
    position: 'absolute',
    marginTop: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },
  boxView: {
    backgroundColor: 'white',
    paddingLeft: 10, paddingRight: 10,
    paddingTop: 5, paddingBottom: 5,
    width: width,
  },
  inputStyle: {
    backgroundColor: "#EAEAEA",
  }
};
