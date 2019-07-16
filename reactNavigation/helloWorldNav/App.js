import React from 'react';
import { Button, Image, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../helloWorldNav/android/Images/economist2png.png')}
        style={{ width: 110, height: 30, alignItems: 'center', justifyContent: 'center' }}
      />
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
  
    return {
   
    headerTitle: <LogoTitle />,
    headerLeft: (
      <Button
      onPress={() => navigation.navigate('MyModal')}
      title='Info'
      color='#fff'
      />
    ),
    headerRight: (
      <Button onPress={params.increaseCount} title="+1" color='#fff' />
    ),
  };
};

componentWillMount() {
  this.props.navigation.setParams({ increaseCount: this._increaseCount });
}

state = {
  count: 0,
}

_increaseCount = () => {
  this.setState({ count: this.state.count + 1 });
};

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
      <Button 
      title='Go To Details' 
      onPress={() => {
        this.props.navigation.navigate('Details', { 
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
  static navigationOptions = ({ navigation, navigationOptions }) => {
    console.log(navigationOptions);

    return {
      title: navigation.getParam('otherParam', 'A Nested Details Screen'),
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
        headerTintColor: navigationOptions.headerStyle.backgroundColor,
      };
    };

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'No-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');
    

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button title='Go to Details... again' 
        onPress={() => this.props.navigation.push('Details', {
          itemId: Math.floor(Math.random() * 100),
        })}
        />
        <Button 
        title='Update the title' 
        onPress={() => this.props.navigation.setParams({ otherParam: 'Updated!'})} 
        />
        <Button 
        title='Go to Home' 
        onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button 
        title='Go back' 
        onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

  class ModalScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{ fontSize: 30 }}>This is a model!</Text>
          <Button 
          onPress={() => this.props.navigate.goBack()}
          title='Dismiss'
          />
          </View>
      )
    }
  }
  
  const MainStack = createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
      },
      Details: {
        screen: DetailsScreen,
      },
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    }
  );
  
  const RootStack = createStackNavigator(
    {
      Main: {
        screen: MainStack,
      },
      MyModal: {
        screen: ModalScreen,
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
  );
  
  const AppContainer = createAppContainer(RootStack);
  
  export default class App extends React.Component {
    render() {
      return <AppContainer />;
    }
  }