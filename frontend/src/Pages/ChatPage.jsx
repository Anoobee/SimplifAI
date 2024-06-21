import React, { useEffect, useState, useRef } from "react";
import { Box, Flex, VStack, Button, ButtonGroup } from "@chakra-ui/react";
import Header from "../components/Header";
import ChatUI from "../components/ChatUI";
import FooterNav from "../components/FooterNav";

const ChatPage = () => {
  const [chatMode, setChatMode] = useState("Normal");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div>
      <Flex direction="column" minHeight="100vh" alignItems="center" justifyContent="center">
        <VStack spacing={4} align="stretch" bg="white" p={4} zIndex="1000" width="100%">
          <Box position="sticky" top={0} zIndex={2}>
            <Header />
          </Box>
          <ButtonGroup variant="outline" spacing="6" mb={4} alignSelf="center">
            <Button colorScheme={chatMode === "Layman" ? "teal" : "gray"} onClick={() => setChatMode("Layman")}>
              Layman
            </Button>
            <Button colorScheme={chatMode === "Normal" ? "teal" : "gray"} onClick={() => setChatMode("Normal")}>
              Normal
            </Button>
            <Button colorScheme={chatMode === "Doctor" ? "teal" : "gray"} onClick={() => setChatMode("Doctor")}>
              Doctor
            </Button>
          </ButtonGroup>
          <Box flex="1" width="100%">
            <ChatUI chatMode={chatMode} />
          </Box>
          <Box position="sticky" bottom={0} zIndex={2} width="100%">
            <FooterNav />
          </Box>
          <div ref={bottomRef} />
        </VStack>
      </Flex>
    </div>
  );
};

export default ChatPage;
