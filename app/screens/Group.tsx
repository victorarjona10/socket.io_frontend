import { useRoute } from "@react-navigation/native";
import { View, Text, TextInput, Button } from "react-native";
import { styles } from "../styles";
import { io, Socket } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import * as SecureStore from "expo-secure-store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screenType";
import { useNavigation } from "expo-router";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Group">;

export const Group = () => {
    const navigation = useNavigation<NavigationProp>();

    const [message, setMessage] = useState(""); // Estado para el mensaje
    const [receivedMessages, setReceivedMessages] = useState<string[]>([]); // Estado para mensajes recibidos

    const socketRef = useRef<Socket | undefined>(undefined);
    // Escucha mensajes del servidor
    useEffect(() => {
        async function createSocket() {
            const secureStoreAvailable = await SecureStore.isAvailableAsync();
            const token = secureStoreAvailable ? 
                SecureStore.getItem("accessToken") : 
                localStorage.getItem("accessToken");
            
            // Cambia el puerto al correcto (9000 si el servidor está configurado así)
            socketRef.current = io("http://localhost:9001", {
                auth: {
                    token,
                },
            });
            console.log("websocket created");

            socketRef.current.on("receive message", (data) => {
                console.debug("Mensaje recibido del servidor: ", data);
                setReceivedMessages((prevMessages) => [...prevMessages, data.content]);
            });

            socketRef.current.on("status", (data) => {
                console.debug("Mensaje de estado recibido: ", data);
                switch (data.status) {
                    case "unauthorized":
                        navigation.navigate("Login");
                        break;
                }
                
            })
        }
        createSocket();
        return () => {
            if (!socketRef.current) return;
            socketRef.current.off("receive message"); // Limpia el listener al desmontar el componente
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== "") {
            if (!socketRef.current) return;
            console.log(socketRef);
            socketRef.current.emit("send message", { content: message }); // Envía el mensaje al servidor
            setMessage(""); // Limpia el input después de enviar
        }
    };

    return (
        <View style={styles.container_Profile}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Grupos</Text>
            {/* Input para que el usuario escriba */}
            <TextInput
                style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    marginBottom: 10,
                    paddingHorizontal: 8,
                    borderRadius: 5,
                }}
                placeholder="Escribe tu mensaje aquí"
                value={message}
                onChangeText={setMessage} // Actualiza el estado con el texto ingresado
            />
            {/* Botón para enviar el mensaje */}
            <Button title="Enviar" onPress={sendMessage} />

            {/* Mostrar mensajes recibidos */}
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Mensajes recibidos:</Text>
                {receivedMessages.map((msg, index) => (
                    <Text key={index} style={{ marginTop: 5 }}>
                        {msg}
                    </Text>
                ))}
            </View>
        </View>
    );
};