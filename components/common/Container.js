import React from 'react'
import { View, Text } from 'react-native'

class Container extends React.Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        {this.props.children}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#DDD',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

export { Container };
