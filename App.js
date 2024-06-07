import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import Test from './src/task-manager-project/Test';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <AppNavigation />
      {/* <Test /> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
