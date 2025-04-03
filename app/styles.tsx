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
        width: "80%", 
        alignSelf: "center",
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

      HomeContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",          padding: 20,
          backgroundColor: "#f5f5f5",
      },

      userName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
      },

      userEmail: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
      },

      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
      },

      userCard: {
        marginVertical: 10,
        borderRadius: 10,
        alignItems: "center",
      },

      container_Profile: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        borderColor: "#007BFF", 
      },
      
      text_Profile: {
        fontSize: 16,
        marginBottom: 10, 
      },
      title_Profile: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20, 
      },
  });