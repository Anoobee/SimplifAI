import { Box, Flex, VStack } from "@chakra-ui/react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useState } from "react";

const ChatUI = (chatMode) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Summarize the Report",
      timestamp: "3 minutes ago",
      sender: "Anup Aryal",
      isUser: true,
    },
    {
      id: 2,
      text: "By following this structured approach, you can create a clear and concise summary of any health report...",
      timestamp: "3 minutes ago",
      sender: "SimplifAI",
      isUser: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          chatMode: chatMode,
          timestamp: "Just now",
          sender: "Anup Aryal",
          isUser: true,
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <Flex direction="column" height="100vh">
      <VStack flex="1" overflowY="auto" p={4} spacing={4}>
        {messages.map((msg) => (
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
