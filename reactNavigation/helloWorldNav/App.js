import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
      <Button 
      title='Go To Details' 
      onPress={() => {this.props.navigation.navigate('Details', { 
        itemId: 86, 
        otherParam: 'anything you want here',
      });
    }}
      />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
    title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    };
  };

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'No-ID');
    const otherParam = navigation.getParam('otherParam', 'Some default value');
    

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button title='Update the title' 
        onPress={() => this.props.navigation.setParams({otherParam: 'Updates!'})} 
        />
        <Button title='Go to Details... again' onPress={() => this.props.navigation.push('Details', {
          itemId: Math.floor(Math.random() * 100),
        })}
        />
        <Button title='Go to Home' onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button title='Go back' onPress={() => this.props.navigation.goBack()}
        />
       
      </View>
    
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />
    }   
}
