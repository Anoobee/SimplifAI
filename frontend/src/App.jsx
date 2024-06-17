import React from "react";
import { ChakraProvider, Box, Flex, VStack } from "@chakra-ui/react";
import Header from "./components/Header";
import UserCard from "./components/UserCard";
import ChatList from "./components/ChatList";
import ActionButtons from "./components/ActionButtons";
import FooterNav from "./components/FooterNav";
import { Global } from "@emotion/react";


const GlobalStyles = () => (
  <Global
    styles={`
      body, html, #root {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    `}
  />
);

const App = () => {
  const chatItems = [
    { title: "Diabities", time: "8:21-8:25 AM", user: "Anup Aryal" },
    { title: "Diabities", time: "8:21-8:25 AM", user: "Anup Aryal" },
  ];

  return (
    <ChakraProvider>
      <GlobalStyles />
      <Flex direction="column" minHeight="100vh" alignItems='center' justifyContent='center'>
        <VStack spacing={4} align="stretch" bg="white" p={4} zIndex="1000">
          <Box position="sticky" top={0} zIndex={2}>
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
            <ActionButtons />
          </Box>
          <Box position="sticky" bottom={0} zIndex={2}>
            <FooterNav/>
          </Box>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
