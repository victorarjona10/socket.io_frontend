import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "../styles";
import { SafeAreaView } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/ScreenType";

type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Cargando usuarios...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.HomeContainer}>
      <Text style={styles.title}>Lista de usuarios:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userCard} onPress={() => navigation.navigate("Profile", { user: item})}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
