import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "../styles";
import { CustomButton } from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screenType";

type User = {
    _id: number;
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
        const response = await fetch('http://localhost:9000/api/users',{
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.HomeContainer}>
      <Text style={styles.title}>Lista de usuarios:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userCard} onPress={() => navigation.navigate("Profile", { user: item})}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.title}>Grupos para chatear:</Text>
      <TouchableOpacity style={styles.userCard} onPress={() => navigation.navigate("Group")}>
        <Text style={styles.userName}>Go to Group</Text>
      </TouchableOpacity>

    </SafeAreaView>

  );
};
