import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native";
import { CustomInput } from "./components/CustomInput";
import { CustomButton } from "./components/CustomButton";
import { styles } from "./styles";
import {Login} from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/Home";
import { Profile } from "./screens/Profile";
import { Group } from "./screens/Group";

const Stack = createNativeStackNavigator();

export default function Index() {
 return (
  
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Group" component={Group} />

      
    </Stack.Navigator>
   
 );
}
