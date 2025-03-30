import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export const styles = StyleSheet.create({
    textStyle:
    {
        fontSize: 20,
        color: 'black',
        margin: 10,
    },
    inputStyle:
    {
        borderRadius: 20,
        backgroundColor: '#E0E8EF',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
 
    inputContainer: 
    {
        width: '80%',
        paddingLeft: 65,
        paddingRight: 35,
    },
    container: {
      
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingRight: 45,
        paddingLeft: 45,
      },
      button: {
        alignItems: 'center',
        backgroundColor: '#FFC463',
        padding: 10,
      },
      countContainer: {
        alignItems: 'center',
        padding: 10,
      },
      imageStyle:{
        width: 170,
        height: 130,
      },
      imageContainer:{
          justifyContent: 'center', 
          alignItems: 'center',
          paddingTop: '15%',
            paddingBottom: '5%',
        },
  });