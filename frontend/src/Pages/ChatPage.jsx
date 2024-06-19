import React from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";
import Header from "../components/Header";
import UserCard from "../components/UserCard";
import ChatList from "../components/ChatList";
import ActionButtons from "../components/ActionButtons";
import FooterNav from "../components/FooterNav";
import ChatUI from "../components/ChatUI";

const ChatPage = () => {
  return (
    <div>
      <Flex
        direction="column"
        minHeight="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4} align="stretch" bg="white" p={4} zIndex="1000">
          <Box position="sticky" top={0} zIndex={2}>
            <Header />
          </Box>
          <Box>
            <ChatUI />
          </Box>
          <Box position="sticky" bottom={0} zIndex={2}>
            <FooterNav />
          </Box>
        </VStack>
      </Flex>
    </div>
  );
};

export default ChatPage;
