import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";

type User = {
    id: number;
    name: string;
    email: string;
};

export const Home = () => {
    const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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
    <View>
      <Text>Lista de usuarios:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};
