import React, { useState, useEffect } from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";
import Header from "../components/Header";
import UserCard from "../components/UserCard";
import ChatList from "../components/ChatList";
import ActionButtons from "../components/ActionButtons";
import FooterNav from "../components/FooterNav";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const chatItems = [
    { title: "Thyroid", time: "8:21-8:25 AM", user: "Aashish Karki" },
    { title: "Diabities", time: "8:21-8:25 AM", user: "Aashish Karki" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 60000); // 60000 milliseconds = 1 minute

    // Cleanup function to clear the timer if the component unmounts before the timer fires
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <Flex
        direction="column"
        minHeight="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4} align="stretch" bg="white" p={4} zIndex="1000">
          <Box position="sticky" top={0} zIndex={2} width="100%">
            <Header />
          </Box>
          <Box>
            <UserCard />
          </Box>
          <Box flex="1" overflowY="auto" p={4}>
            <ChatList title="Today" items={chatItems} />
            <ChatList title="Yesterday" items={chatItems} />
          </Box>
          <Box pb={10}>
            <ActionButtons setIsLoading={setIsLoading} />
          </Box>
          <Box position="sticky" bottom={0} zIndex={2} width="100%">
            <FooterNav isLoading={isLoading} />
          </Box>
        </VStack>
      </Flex>
    </div>
  );
};

export default HomePage;
