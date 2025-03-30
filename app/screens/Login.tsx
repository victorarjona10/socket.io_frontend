import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native";
import { CustomInput } from "../components/CustomInput";
import { CustomButton } from "../components/CustomButton";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { screenProps } from "../navigation/ScreenType"; 
import { RootStackParamList } from "../navigation/ScreenType";
import { useState } from "react";
import { Alert } from "react-native";


type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export const Login = () => {
    const navigation = useNavigation<NavigationProp>();
    const onPress = () => {
        console.log("Botón presionado 🚀");
        navigation.navigate("Home");
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const onLogin = async () => {
      if (!email || !password) {
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
          Alert.alert("Éxito", "Inicio de sesión correcto ✅");
          navigation.navigate("Home");
        } else {
          Alert.alert("Error", data.error || "Inicio de sesión fallido");
        }
      } catch (error) {
        Alert.alert("Error", "No se pudo conectar con el servidor.");
      }
    };
    return (
      <SafeAreaView>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/EA_GPTimage.png')} style={styles.imageStyle} />
        </View>
      <CustomInput label="Email" value={email} onChangeText={setEmail} />
      <CustomInput label="Password" isPassword={true} value={password} onChangeText={setPassword} />
      <CustomButton label="SIGN IN" onPress={onLogin} />
      </SafeAreaView>
    );
}