import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { styles } from "../styles";

export const Profile = () => {
  const route = useRoute();
  const { user } = route.params as { user: { _id: number; name: string; email: string; phone: string; website: string } };

  return (
    <View style={styles.container_Profile}>
      <Text style={[styles.text_Profile, styles.title_Profile]}>Perfil del Usuario</Text>
      <Text style={styles.text_Profile}>ID: {user._id}</Text>
      <Text style={styles.text_Profile}>Nombre: {user.name}</Text>
      <Text style={styles.text_Profile}>Email: {user.email}</Text>
      <Text style={styles.text_Profile}>Teléfono: {user.phone}</Text>
      <Text style={styles.text_Profile}>Web: {user.website}</Text>
    </View>
  );
};