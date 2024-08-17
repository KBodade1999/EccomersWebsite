import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../../Home'

const Stack=createStackNavigator();

const screenOptionStyle={
    headerShown:true
}

const HomeStackNavigator=()=>{
    return(
        <Stack.Navigator>
         <Stack.Screen name="Home" component={Home}  options={{
      title: 'Shopping',
      headerStyle: {
        backgroundColor: '#0a4c76', 
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign:'center'

      },
      headerTitleAlign: 'center',
    }}
         />
       
        </Stack.Navigator>
    )
}
export default HomeStackNavigator;
