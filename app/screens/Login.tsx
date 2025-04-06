import { Text, View, Image, FlatList, SafeAreaView, Alert } from "react-native";
import { CustomInput } from "../components/CustomInput";
import  { CustomButton } from "../components/CustomButton";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, screenProps } from "../navigation/screenType";
import { useState, useCallback } from "react";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export const Login = () => {
    const navigation = useNavigation<NavigationProp>();
    const onPress = () => {
        console.log("Botón presionado 🚀");
        navigation.navigate("Home");
    }
    const [email, setEmail] = useState(""); //Posar: eve.holt@reqres.in
    const [password, setPassword] = useState(""); //Posar: cityslicka
  
    const onLogin = useCallback(async () =>{
      console.log("Intentant Login");
      Alert.alert("Intentant Login");
      if (!email || !password) {
        window.alert("Error. Por favor, completa todos los campos.");
        Alert.alert("Error", "Por favor, completa todos los campos.");
        return;
      }
  
      try {
        const response = await fetch("https://reqres.in/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        if (response.ok) {
          window.alert("Éxito en el inicio de sesión ✅");
          console.log("Éxito en el inicio de sesión ✅");
          Alert.alert("Éxito", "Inicio de sesión correcto ✅");
          navigation.navigate("Home");
        } else {
          window.alert("Error. Inicio de sesión fallido ❌");
          Alert.alert("Error", data.error || "Inicio de sesión fallido");
        }
      } catch (error) {
        console.error("Error de red:", error);
        Alert.alert("Error", "No se pudo conectar con el servidor.");
      }
    }, [email,password,navigation]);

  const formFields = [
    { key: "email", component: <CustomInput label="Email" value={email} onChangeText={setEmail} /> },
    { key: "password", component: <CustomInput label="Password" isPassword={true} value={password} onChangeText={setPassword} /> },
    { key: "button", component: <CustomButton label="SIGN IN" onPress={onLogin} /> },
  ];

    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          data={formFields}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => item.component}
          ListHeaderComponent={
            <View style={styles.imageContainer}>
              <Image source={require('../../assets/images/EA_GPTimage.png')} style={styles.imageStyle} />
              <Image resizeMode="contain" source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRCHgWgmGlhWcce4PkSCAcgpCaPvtQgfaAPA&s"}} style={styles.imageStyle}/>
            </View>
          }
          contentContainerStyle={{padding:20}}
        />
      </SafeAreaView>
    );
}