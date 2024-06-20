import { Box, Flex, VStack } from "@chakra-ui/react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useState } from "react";
import useChats from "../../hooks/useChats";
import apiClient from "../../utils/api-client";

const ChatUI = (chatMode) => {
  // const [messages, setMessages] = useState([
  //   {
  //     id: 1,
  //     text: "Summarize the Report",
  //     timestamp: "3 minutes ago",
  //     sender: "Anup Aryal",
  //     isUser: true,
  //   },
  //   {
  //     id: 2,
  //     text: "By following this structured approach, you can create a clear and concise summary of any health report...",
  //     timestamp: "3 minutes ago",
  //     sender: "SimplifAI",
  //     isUser: false,
  //   },
  // ]);

  const { chats, error, isLoading, refetchChats } = useChats();
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState([]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const messageToSend = {
        id: Date.now(), // Using timestamp as a temporary ID
        text: newMessage,
        chatMode: chatMode,
        timestamp: "Just now",
        sender: "Anup Aryal",
        isUser: true,
      };

      // Optionally update local state immediately for better UX
      setLocalMessages([...localMessages, messageToSend]);

      // Post request to send the message to the backend
      apiClient.post("/chat_messages/", messageToSend)
        .then((response) => {
          // Here you can refetch chats or handle the response
          refetchChats(); // Assuming your useChats hook provides a way to refetch
          setNewMessage(""); // Clear input after successful send
        })
        .catch((error) => {
          console.error("Failed to send message:", error);
          // Optionally handle failed send, e.g., remove from localMessages
        });
    }
  };

  return (
    <Flex direction="column" height="100vh">
      <VStack flex="1" overflowY="auto" p={4} spacing={4}>
        {([...chats, ...localMessages]).map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.text}
            timestamp={msg.timestamp}
            sender={msg.sender}
            isUser={msg.isUser}
          />
        ))}
      </VStack>
      <Box position="sticky" bottom="60px">
        <ChatInput
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onSend={handleSend}
        />
      </Box>
    </Flex>
  );
};

export default ChatUI;
