import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet } from 'react-native';
import AddFoods from './ClassEX/AddFoods';
import ListFoods from './ClassEX/ListFoods';


const Stack = createNativeStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator initialRouteName='AddFoods'>
      <Stack.Screen options={{ title: "Thêm Món Ăn", headerStyle: { backgroundColor: '#3d3f4c' }, headerTintColor: '#fff' }} name="AddFoods" component={AddFoods} />
      <Stack.Screen options={{ title: "Danh Sách Món Ăn", headerStyle: { backgroundColor: '#3d3f4c' }, headerTintColor: '#fff' }} name="ListFoods" component={ListFoods} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <MyStack></MyStack>
      </NavigationContainer>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:
  {
    flex: 1,
  }
});

