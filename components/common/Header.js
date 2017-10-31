import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

class Header extends React.Component {

  render() {
    const { headerStyle, textStyle } = this.getStyles();
    return (
      <View style={headerStyle}>
        <Text style={textStyle}>{this.props.text}</Text>
      </View>
    );
  }

  getStyles() {
    return StyleSheet.create({
      headerStyle: {
        height: 60,
        backgroundColor: this.props.color,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
      },
      textStyle: {
        fontSize: 20
      }
    });
  }
}

Header.defaultProps = {
  color: '#F8F8F8'
};

export { Header }
