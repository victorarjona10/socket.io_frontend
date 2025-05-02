import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styles } from "../styles";
import { io, Socket } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import * as SecureStore from "expo-secure-store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/screenType";
import { useNavigation } from "expo-router";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Group">;
type ChatMessage = {
  room: string;
  author: string;
  message: string;
  time: string;
};

export const Group = () => {
  const navigation = useNavigation<NavigationProp>();

  // Estados para la interfaz de chat
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("sala1"); // Sala predeterminada
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);
  const [showChat, setShowChat] = useState(false);

  // Referencia al socket
  const socketRef = useRef<Socket | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Conectar al servidor de Socket.IO
  useEffect(() => {
    async function createSocket() {
      const secureStoreAvailable = await SecureStore.isAvailableAsync();
      const token = secureStoreAvailable ? 
          SecureStore.getItem("accessToken") :
          localStorage.getItem("accessToken");
          
      // Conectar al servidor en el puerto 3001
      socketRef.current = io("http://localhost:3001", { // Cambia por tu IP local
        auth: {
          token,
        },
      }); 

      // Escuchar mensajes entrantes con el evento receive_message
      socketRef.current.on("receive_message", (data: ChatMessage) => {
        console.log("Mensaje recibido:", data);
        setMessageList((list) => [...list, data]);
      });

      socketRef.current.on("status", (data) => {
        console.debug("Mensaje de estado recibido: ", data);
        switch (data.status) {
          case "unauthorized":
            navigation.navigate("Login");
            break;
        }
      });

    }
    createSocket();

    // Limpiar al desmontar
    return () => {
      if (socketRef.current) {
        socketRef.current.off("receive_message");
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Función para unirse a una sala
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      console.log(`Usuario ${username} uniéndose a sala: ${room}`);
      socketRef.current?.emit("join_room", room);
      setShowChat(true);
    }
  };

  // Función para enviar un mensaje
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData: ChatMessage = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };

      await socketRef.current?.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  // Scroll automático cuando llegan nuevos mensajes
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messageList]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={localStyles.container}>
        {!showChat ? (
          // Pantalla para unirse al chat
          <View style={localStyles.joinChatContainer}>
            <Text style={localStyles.headerText}>Unirse al Chat</Text>
            <TextInput
              style={localStyles.input}
              placeholder="Nombre de usuario..."
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={localStyles.input}
              placeholder="Sala..."
              value={room}
              onChangeText={setRoom}
            />
            <TouchableOpacity style={localStyles.button} onPress={joinRoom}>
              <Text style={localStyles.buttonText}>Unirse a la Sala</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Interfaz del chat
          <View style={localStyles.chatContainer}>
            <Text style={localStyles.roomHeader}>
              Chat en vivo - Sala: {room}
            </Text>
            <ScrollView
              ref={scrollViewRef}
              style={localStyles.chatBody}
              contentContainerStyle={localStyles.chatBodyContent}
            >
              {messageList.map((messageContent, index) => (
                <View
                  key={index}
                  style={[
                    localStyles.messageContainer,
                    messageContent.author === username
                      ? localStyles.ownMessage
                      : localStyles.otherMessage,
                  ]}
                >
                  <View style={localStyles.messageBubble}>
                    <Text style={localStyles.messageText}>
                      {messageContent.message}
                    </Text>
                    <View style={localStyles.messageFooter}>
                      <Text style={localStyles.messageAuthor}>
                        {messageContent.author}
                      </Text>
                      <Text style={localStyles.messageTime}>
                        {messageContent.time}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={localStyles.chatFooter}>
              <TextInput
                style={localStyles.messageInput}
                placeholder="Mensaje..."
                value={currentMessage}
                onChangeText={setCurrentMessage}
              />
              <TouchableOpacity
                style={localStyles.sendButton}
                onPress={sendMessage}
              >
                <Text style={localStyles.sendButtonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  joinChatContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#FFC463", // Color que coincide con tu estilo existente
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  chatContainer: {
    flex: 1,
  },
  roomHeader: {
    backgroundColor: "#FFC463",
    color: "black",
    padding: 15,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  chatBody: {
    flex: 1,
    padding: 10,
  },
  chatBodyContent: {
    paddingBottom: 10,
  },
  messageContainer: {
    marginBottom: 10,
    maxWidth: "80%",
  },
  ownMessage: {
    alignSelf: "flex-end",
  },
  otherMessage: {
    alignSelf: "flex-start",
  },
  messageBubble: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
  },
  messageFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  messageAuthor: {
    fontSize: 12,
    color: "#666",
  },
  messageTime: {
    fontSize: 10,
    color: "#999",
  },
  chatFooter: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "white",
  },
  messageInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    backgroundColor: "#FFC463",
    borderRadius: 20,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "black",
    fontWeight: "bold",
  },
});
