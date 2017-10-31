import React from 'react'
import { View } from 'react-native'

class ContainerSection extends React.Component {
  render() {
    return (
      <View style={styles.sectionStyle}>
        {this.props.children}
      </View>
    );
  }
}

const styles = {
  sectionStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#DDD',
    position: 'relative'
  }
};

export { ContainerSection };
