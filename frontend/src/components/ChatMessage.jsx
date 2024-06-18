import React from 'react';
import { Box, Text, Avatar, HStack, VStack } from '@chakra-ui/react';

const ChatMessage = ({ message, timestamp, sender, isUser }) => {
  return (
    <HStack
      alignSelf={isUser ? 'flex-end' : 'flex-start'}
      bg={isUser ? 'teal.100' : 'gray.100'}
      borderRadius="lg"
      p={3}
      spacing={3}
      m={2}
    >
      {!isUser && <Avatar name={sender} />}
      <VStack align={isUser ? 'flex-end' : 'flex-start'}>
        <Text fontSize="sm">{message}</Text>
        <Text fontSize="xs" color="gray.500">
          {timestamp}
        </Text>
      </VStack>
      {isUser && <Avatar name={sender} />}
    </HStack>
  );
};

export default ChatMessage;
