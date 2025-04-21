import { useRoute } from "@react-navigation/native";
import { View, Text, TextInput, Button } from "react-native";
import { styles } from "../styles";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";

// Cambia el puerto al correcto (9000 si el servidor está configurado así)
const socket = io("http://localhost:9001");

export const Group = () => {
    const route = useRoute();

    const [message, setMessage] = useState(""); // Estado para el mensaje
    const [receivedMessages, setReceivedMessages] = useState<string[]>([]); // Estado para mensajes recibidos

    // Escucha mensajes del servidor
    useEffect(() => {
        socket.on("receive message", (data) => {
            console.log("Mensaje recibido del servidor:", data);
            setReceivedMessages((prevMessages) => [...prevMessages, data.content]);
        });

        return () => {
            socket.off("receive message"); // Limpia el listener al desmontar el componente
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== "") {
            socket.emit("send message", { content: message }); // Envía el mensaje al servidor
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